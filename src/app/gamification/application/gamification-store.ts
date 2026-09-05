import { DestroyRef, Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Mission } from '../domain/model/mission.entity';
import { Badge } from '../domain/model/badge.entity';
import { CoinTransaction } from '../domain/model/coin-transaction.entity';
import { LeaderboardEntry } from '../domain/model/leaderboard-entry.entity';
import { GamificationApi } from '../infrastructure/gamification-api';

@Injectable({ providedIn: 'root' })
export class GamificationStore {
  private readonly missionsSignal = signal<Mission[]>([]);
  private readonly badgesSignal = signal<Badge[]>([]);
  private readonly coinTransactionsSignal = signal<CoinTransaction[]>([]);
  private readonly leaderboardSignal = signal<LeaderboardEntry[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly missions = this.missionsSignal.asReadonly();
  readonly badges = this.badgesSignal.asReadonly();
  readonly coinTransactions = this.coinTransactionsSignal.asReadonly();
  readonly leaderboard = this.leaderboardSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly missionCount = computed(() => this.missions().length);
  readonly badgeCount = computed(() => this.badges().length);
  readonly coinTransactionCount = computed(() => this.coinTransactions().length);

  constructor(
    private gamificationApi: GamificationApi,
    private destroyRef: DestroyRef,
  ) {
    this.loadMissions();
    this.loadBadges();
    this.loadCoinTransactions();
    this.loadLeaderboard();
  }

  addMission(mission: Mission): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.createMission(mission).pipe(retry(2)).subscribe({
      next: (created) => {
        this.missionsSignal.update((list) => [...list, created]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to create mission'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateMission(mission: Mission, id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.updateMission(mission, id).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.missionsSignal.update((list) => list.map((m) => (m.id === id ? updated : m)));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update mission'));
        this.loadingSignal.set(false);
      },
    });
  }

  deleteMission(id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.deleteMission(id).pipe(retry(2)).subscribe({
      next: () => {
        this.missionsSignal.update((list) => list.filter((m) => m.id !== id));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete mission'));
        this.loadingSignal.set(false);
      },
    });
  }

  addBadge(badge: Badge): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.createBadge(badge).pipe(retry(2)).subscribe({
      next: (created) => {
        this.badgesSignal.update((list) => [...list, created]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to create badge'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateBadge(badge: Badge, id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.updateBadge(badge, id).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.badgesSignal.update((list) => list.map((b) => (b.id === id ? updated : b)));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update badge'));
        this.loadingSignal.set(false);
      },
    });
  }

  deleteBadge(id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.deleteBadge(id).pipe(retry(2)).subscribe({
      next: () => {
        this.badgesSignal.update((list) => list.filter((b) => b.id !== id));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete badge'));
        this.loadingSignal.set(false);
      },
    });
  }

  addCoinTransaction(transaction: CoinTransaction): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.createCoinTransaction(transaction).pipe(retry(2)).subscribe({
      next: (created) => {
        this.coinTransactionsSignal.update((list) => [created, ...list]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to add coin transaction'));
        this.loadingSignal.set(false);
      },
    });
  }

  refresh(): void {
    this.loadMissions();
    this.loadBadges();
    this.loadCoinTransactions();
    this.loadLeaderboard();
  }

  getMissionById(id: string | null): Mission | undefined {
    return this.missions().find((mission) => mission.id === id);
  }

  getBadgeById(id: string | null): Badge | undefined {
    return this.badges().find((badge) => badge.id === id);
  }

  getRecentCoinTransactions(count: number): CoinTransaction[] {
    return this.coinTransactions().slice(0, count);
  }

  getMissionsByStatus(status: Mission['status']): Mission[] {
    return this.missions().filter((mission) => (mission.status ?? 'Disponible') === status);
  }

  getMissionPreview(count: number): Mission[] {
    return this.getMissionsByStatus('Activa').slice(0, count);
  }

  getTopRanking(count: number): LeaderboardEntry[] {
    return this.leaderboard().slice(0, count);
  }

  getBadgePreview(count: number): Badge[] {
    return this.badges().filter((badge) => badge.unlocked).slice(0, count);
  }

  getUnlockedBadges(): Badge[] {
    return this.badges().filter((badge) => badge.unlocked);
  }

  getLockedBadges(): Badge[] {
    return this.badges().filter((badge) => !badge.unlocked);
  }

  getMissionProgress(mission: Mission): number {
    return mission.progress >= mission.goal ? 100 : (mission.progress / mission.goal) * 100;
  }

  getBadgeRarityClass(badge: Badge): string {
    return `rarity-${badge.rarity.toLowerCase()}`;
  }

  private loadMissions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.getMissions().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (missions) => {
        this.missionsSignal.set(missions);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load missions'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadBadges(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.getBadges().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (badges) => {
        this.badgesSignal.set(badges);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load badges'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadCoinTransactions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.getCoinTransactions().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (transactions) => {
        this.coinTransactionsSignal.set(transactions);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load coin transactions'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadLeaderboard(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.gamificationApi.getLeaderboard().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (entries) => {
        this.leaderboardSignal.set(entries);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load leaderboard'));
        this.loadingSignal.set(false);
      },
    });
  }

  private formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}
