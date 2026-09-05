import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of, switchMap, tap, throwError } from 'rxjs';
import { UserProfile } from '../domain/model/user-profile.entity';
import { IdentityAccessApi } from '../infrastructure/identity-access-api';
import { AuthSessionStorage } from '../infrastructure/auth-session-storage';
import { AuthenticatedUserResponse } from '../infrastructure/authentication.resources';
import { ProfileResource } from '../infrastructure/profile.resources';
import { GamificationApi } from '../../gamification/infrastructure/gamification-api';
import { GamificationSummaryResource } from '../../gamification/infrastructure/gamification-summary.resource';

@Injectable({ providedIn: 'root' })
export class IdentityAccessStore {
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly authenticatedUserSignal = signal<AuthenticatedUserResponse | null>(null);
  private readonly currentProfileSignal = signal<UserProfile | null>(null);

  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly currentUser = this.currentProfileSignal.asReadonly();
  readonly authenticatedUser = this.authenticatedUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.authenticatedUserSignal() && !!this.sessionStorage.getAccessToken());

  readonly safeCoins = computed(() => this.getCurrentUser()?.safeCoins ?? 0);

  constructor(
    private identityAccessApi: IdentityAccessApi,
    private sessionStorage: AuthSessionStorage,
    private gamificationApi: GamificationApi,
  ) {
    const user = this.sessionStorage.getUser();
    if (user && this.sessionStorage.getAccessToken()) {
      this.authenticatedUserSignal.set(user);
      this.currentProfileSignal.set(this.toFallbackProfile(user));
      this.loadMyProfile().pipe(switchMap(() => this.refreshGamificationSummary())).subscribe();
    }
  }

  login(username: string, password: string): Observable<AuthenticatedUserResponse> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    return this.identityAccessApi.signIn(username, password).pipe(
      tap((user) => this.setSession(user)),
      finalize(() => this.loadingSignal.set(false)),
      catchError((error) => this.handleAuthError(error, 'No se pudo iniciar sesion')),
    );
  }

  register(
    username: string,
    password: string,
    profile?: { firstName: string; lastName: string; email: string },
  ): Observable<AuthenticatedUserResponse> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    return this.identityAccessApi.signUp(username, password).pipe(
      switchMap(() => this.identityAccessApi.signIn(username, password)),
      tap((user) => this.setSession(user)),
      switchMap((user) => {
        if (!profile) return of(user);
        return this.identityAccessApi.updateMyProfile({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          street: 'SafeStep Street',
          number: '',
          city: 'SafeStep',
          postalCode: '00000',
          country: 'Peru',
        }).pipe(
          map((updatedProfile) => {
            const mappedProfile = this.toUserProfile(updatedProfile);
            this.currentProfileSignal.set(mappedProfile);
            return user;
          }),
        );
      }),
      finalize(() => this.loadingSignal.set(false)),
      catchError((error) => this.handleAuthError(error, 'No se pudo crear la cuenta')),
    );
  }

  registerAccount(
    username: string,
    password: string,
    profile: { firstName: string; lastName: string; email: string },
  ): Observable<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    return this.identityAccessApi.signUp(username, password).pipe(
      switchMap(() => this.identityAccessApi.signIn(username, password)),
      tap((user) => this.setSession(user)),
      switchMap((user) => this.identityAccessApi.updateMyProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        street: 'SafeStep Street',
        number: '',
        city: 'SafeStep',
        postalCode: '00000',
        country: 'Peru',
      }).pipe(
        switchMap(() => this.identityAccessApi.logout(user.refreshToken).pipe(catchError(() => of(null)))),
      )),
      tap(() => this.clearSession()),
      map(() => void 0),
      finalize(() => this.loadingSignal.set(false)),
      catchError((error) => this.handleAuthError(error, 'No se pudo crear la cuenta')),
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.sessionStorage.getRefreshToken();
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    if (!refreshToken) {
      this.clearSession();
      this.loadingSignal.set(false);
      return of(void 0);
    }

    return this.identityAccessApi.logout(refreshToken).pipe(
      tap(() => this.clearSession()),
      map(() => void 0),
      catchError(() => {
        this.clearSession();
        return of(void 0);
      }),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  clearSession(): void {
    this.sessionStorage.clear();
    this.authenticatedUserSignal.set(null);
    this.currentProfileSignal.set(null);
  }

  loadMyProfile(): Observable<UserProfile | null> {
    if (!this.sessionStorage.getAccessToken()) return of(null);
    return this.identityAccessApi.getMyProfile().pipe(
      map((profile) => this.toUserProfile(profile)),
      tap((profile) => this.currentProfileSignal.set(profile)),
      catchError(() => of(this.currentProfileSignal())),
    );
  }

  refreshGamificationSummary(): Observable<GamificationSummaryResource | null> {
    if (!this.sessionStorage.getAccessToken()) return of(null);
    return this.gamificationApi.getSummary().pipe(
      tap((summary) => this.applyGamificationSummary(summary)),
      catchError(() => of(null)),
    );
  }

  getCurrentUser(): UserProfile | null {
    return this.currentProfileSignal() ?? this.toFallbackProfile(this.authenticatedUserSignal());
  }

  updateSafeCoinsLocally(newBalance: number): void {
    const current = this.getCurrentUser();
    if (!current) return;
    const updated = new UserProfile({
      id: current.id,
      fullName: current.fullName,
      email: current.email,
      role: current.role,
      city: current.city,
      avatarUrl: current.avatarUrl,
      level: current.level,
      xp: current.xp,
      nextLevelXp: current.nextLevelXp,
      safeCoins: newBalance,
      streakDays: current.streakDays,
      completedSimulations: current.completedSimulations,
    });
    this.currentProfileSignal.set(updated);
  }

  applyGamificationSummary(summary: GamificationSummaryResource): void {
    const current = this.getCurrentUser() ?? this.toFallbackProfile(this.authenticatedUserSignal());
    if (!current) return;
    const nextLevelXp = Math.max(current.nextLevelXp, (summary.level + 1) * 1000);
    const updated = new UserProfile({
      id: current.id,
      fullName: current.fullName || summary.username,
      email: current.email || summary.username,
      role: current.role,
      city: current.city,
      avatarUrl: current.avatarUrl,
      level: summary.level,
      xp: summary.xp,
      nextLevelXp,
      safeCoins: summary.safeCoins,
      streakDays: summary.streak,
      completedSimulations: summary.completedSimulations,
    });
    this.currentProfileSignal.set(updated);
  }

  private setSession(user: AuthenticatedUserResponse): void {
    this.sessionStorage.save(user);
    this.authenticatedUserSignal.set(user);
    this.currentProfileSignal.set(this.toFallbackProfile(user));
    this.loadMyProfile().pipe(switchMap(() => this.refreshGamificationSummary())).subscribe();
  }

  private toUserProfile(profile: ProfileResource): UserProfile {
    const current = this.currentProfileSignal();
    return new UserProfile({
      id: profile.id.toString(),
      fullName: profile.fullName || this.authenticatedUserSignal()?.username || 'SafeStep User',
      email: profile.email || this.authenticatedUserSignal()?.username || '',
      role: 'ROLE_USER',
      city: this.cityFromStreetAddress(profile.streetAddress),
      avatarUrl: '',
      level: current?.level ?? 1,
      xp: current?.xp ?? 0,
      nextLevelXp: current?.nextLevelXp ?? 100,
      safeCoins: current?.safeCoins ?? 0,
      streakDays: current?.streakDays ?? 0,
      completedSimulations: current?.completedSimulations ?? 0,
    });
  }

  private toFallbackProfile(user: AuthenticatedUserResponse | null): UserProfile | null {
    if (!user) return null;
    return new UserProfile({
      id: user.id.toString(),
      fullName: user.username,
      email: user.username,
      role: 'ROLE_USER',
      city: 'SafeStep',
      avatarUrl: '',
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      safeCoins: 0,
      streakDays: 0,
      completedSimulations: 0,
    });
  }

  private cityFromStreetAddress(streetAddress: string): string {
    const parts = streetAddress.split(',').map((part) => part.trim()).filter(Boolean);
    return parts.length >= 3 ? parts[2] : 'SafeStep';
  }

  private handleAuthError(error: unknown, fallback: string): Observable<never> {
    const message = this.formatError(error, fallback);
    this.errorSignal.set(message);
    return throwError(() => new Error(message));
  }

  private formatError(error: unknown, fallback: string): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const backendError = error.error as { message?: string; details?: string };
      return backendError.details || backendError.message || fallback;
    }
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
