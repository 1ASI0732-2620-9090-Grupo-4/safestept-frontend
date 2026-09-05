import { DestroyRef, Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticsData } from '../domain/model/statistics-data.entity';
import { RecommendationEntry } from '../domain/model/recommendation-entry.entity';
import { ProgressVisualEntry } from '../domain/model/progress-visual-entry.entity';
import { CertificateEntry } from '../domain/model/certificate-entry.entity';
import { StatisticsApi } from '../infrastructure/statistics-api';
import { MedicalSimulation } from '../../medical-simulation/domain/model/medical-simulation.entity';
import { SimulationAttempt } from '../../medical-simulation/domain/model/simulation-attempt.entity';
import { Badge } from '../../gamification/domain/model/badge.entity';
import { CoinTransaction } from '../../gamification/domain/model/coin-transaction.entity';
import { Mission } from '../../gamification/domain/model/mission.entity';

type SimulationPerformance = {
  simulation: MedicalSimulation;
  attempts: number;
  completions: number;
  bestScore: number;
  averageAccuracy: number;
  lastAttempt: string;
};

@Injectable({ providedIn: 'root' })
export class StatisticsStore {
  private readonly recommendationsSignal = signal<RecommendationEntry[]>([]);
  private readonly progressVisualsSignal = signal<ProgressVisualEntry[]>([]);
  private readonly certificatesSignal = signal<CertificateEntry[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly recommendations = this.recommendationsSignal.asReadonly();
  readonly progressVisuals = this.progressVisualsSignal.asReadonly();
  readonly certificates = this.certificatesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly allData = computed<StatisticsData>(() => new StatisticsData({
    id: 0,
    recommendations: this.recommendationsSignal(),
    progressVisuals: this.progressVisualsSignal(),
    certificates: this.certificatesSignal(),
  }));

  constructor(
    private statisticsApi: StatisticsApi,
    private destroyRef: DestroyRef,
  ) {
    this.loadStatistics();
  }

  getSuccessfulTransactions(transactions: CoinTransaction[], userId?: string): CoinTransaction[] {
    return transactions.filter((transaction) => {
      const belongsToUser = userId ? transaction.userId === userId : true;
      return belongsToUser && transaction.successful;
    });
  }

  getCompletedSimulationIds(transactions: CoinTransaction[]): string[] {
    return transactions.map((transaction) => transaction.simulationId);
  }

  getUserAttempts(attempts: SimulationAttempt[], userId?: number): SimulationAttempt[] {
    return userId ? attempts.filter((attempt) => attempt.userId === userId) : attempts;
  }

  getAverageAttemptAccuracy(attempts: SimulationAttempt[]): number {
    if (!attempts.length) {
      return 0;
    }

    let total = 0;

    attempts.forEach((attempt) => {
      total += (attempt.correctSteps / attempt.totalSteps) * 100;
    });

    return Math.round(total / attempts.length);
  }

  getTotalCoins(transactions: CoinTransaction[]): number {
    let total = 0;

    transactions.forEach((transaction) => {
      total += transaction.earnedCoins;
    });

    return total;
  }

  getTotalXp(transactions: CoinTransaction[], simulations: MedicalSimulation[]): number {
    let total = 0;

    transactions.forEach((transaction) => {
      const simulation = this.getSimulationById(simulations, transaction.simulationId);
      total += Math.floor((simulation?.xpReward ?? 0) * transaction.accuracy);
    });

    return total;
  }

  getTrainedMinutes(transactions: CoinTransaction[], simulations: MedicalSimulation[]): number {
    let total = 0;

    transactions.forEach((transaction) => {
      const simulation = this.getSimulationById(simulations, transaction.simulationId);
      total += simulation?.durationMinutes ?? 0;
    });

    return total;
  }

  getTrainedMinutesFromAttempts(attempts: SimulationAttempt[]): number {
    const seconds = attempts.reduce((total, attempt) => total + Math.max(0, attempt.timeElapsed), 0);
    return Math.round(seconds / 60);
  }

  getPerformanceBySimulation(
    simulations: MedicalSimulation[],
    attempts: SimulationAttempt[],
    transactions: CoinTransaction[],
  ): SimulationPerformance[] {
    return simulations.map((simulation) => this.buildSimulationPerformance(simulation, attempts, transactions));
  }

  getPendingSimulations(simulations: MedicalSimulation[], completedIds: string[]): MedicalSimulation[] {
    return simulations.filter((simulation) => !completedIds.includes(simulation.id));
  }

  getWeakSimulations(performance: SimulationPerformance[]): SimulationPerformance[] {
    return performance
      .filter((item) => item.attempts > 0 && item.averageAccuracy < 80)
      .sort((a, b) => a.averageAccuracy - b.averageAccuracy)
      .slice(0, 4);
  }

  getCommonMistakes(attempts: SimulationAttempt[]): Array<{ topic: string; count: number; recommendation: string }> {
    const errors: Array<{ topic: string; count: number }> = [];

    for (const attempt of attempts) {
      for (const error of attempt.errors) {
        const existing = errors.find((item) => item.topic === error.error);
        if (existing) {
          existing.count++;
        } else {
          errors.push({ topic: error.error, count: 1 });
        }
      }
    }

    return errors
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((item) => ({
        topic: item.topic,
        count: item.count,
        recommendation: '',
      }));
  }

  getCompletedMissionCount(missions: Mission[]): number {
    return missions.filter((mission) => mission.progress >= mission.goal).length;
  }

  getUnlockedBadgeCount(badges: Badge[]): number {
    return badges.filter((badge) => badge.unlocked).length;
  }

  private getSimulationById(simulations: MedicalSimulation[], id: string): MedicalSimulation | undefined {
    return simulations.find((simulation) => simulation.id === id);
  }

  private getAttemptsForSimulation(attempts: SimulationAttempt[], simulationId: string): SimulationAttempt[] {
    return attempts.filter((attempt) => attempt.scenarioSlug === simulationId);
  }

  private getCompletionsForSimulation(transactions: CoinTransaction[], simulationId: string): CoinTransaction[] {
    return transactions.filter((transaction) => transaction.simulationId === simulationId);
  }

  private buildSimulationPerformance(
    simulation: MedicalSimulation,
    attempts: SimulationAttempt[],
    transactions: CoinTransaction[],
  ): SimulationPerformance {
    const simulationAttempts = this.getAttemptsForSimulation(attempts, simulation.id);
    const completions = this.getCompletionsForSimulation(transactions, simulation.id);

    return {
      simulation,
      attempts: simulationAttempts.length,
      completions: completions.length,
      bestScore: simulationAttempts.length ? Math.max(...simulationAttempts.map((attempt) => attempt.score)) : 0,
      averageAccuracy: this.getAverageAttemptAccuracy(simulationAttempts),
      lastAttempt: simulationAttempts.at(-1)?.completedAt ?? completions[0]?.createdAt ?? '',
    };
  }

  private loadStatistics(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.statisticsApi.getStatistics().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.populateSignals(data);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load statistics data'));
        this.loadingSignal.set(false);
      },
    });
  }

  private populateSignals(data: StatisticsData): void {
    this.recommendationsSignal.set(data.recommendations ?? []);
    this.progressVisualsSignal.set(data.progressVisuals ?? []);
    this.certificatesSignal.set(data.certificates ?? []);
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
