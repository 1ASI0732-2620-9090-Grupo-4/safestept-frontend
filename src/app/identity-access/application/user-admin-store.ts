import { DestroyRef, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { UserAccount } from '../domain/model/user-account.entity';
import { UserAdminApi } from '../infrastructure/user-admin-api';

@Injectable({ providedIn: 'root' })
export class UserAdminStore {
  private readonly usersSignal = signal<UserAccount[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly users = this.usersSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(
    private userAdminApi: UserAdminApi,
    private destroyRef: DestroyRef,
  ) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.userAdminApi.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (users) => {
        this.usersSignal.set(users);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load users'));
        this.loadingSignal.set(false);
      },
    });
  }

  getUserById(id: number): UserAccount | undefined {
    return this.users().find((user) => user.id === id);
  }

  updateUserRoles(userId: number, roles: string[]): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.userAdminApi.updateUserRoles(userId, roles).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.usersSignal.update((list) => list.map((item) => item.id === userId ? updated : item));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update user roles'));
        this.loadingSignal.set(false);
      },
    });
  }

  private formatError(error: unknown, fallback: string): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const backendError = (error as { error?: { message?: string; details?: string } }).error;
      if (backendError?.details || backendError?.message) {
        return backendError.details || backendError.message || fallback;
      }
    }
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
