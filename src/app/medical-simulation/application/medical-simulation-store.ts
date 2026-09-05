import { DestroyRef, Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, retry, tap } from 'rxjs';
import { MedicalSimulation } from '../domain/model/medical-simulation.entity';
import { SimulationAttempt } from '../domain/model/simulation-attempt.entity';
import { MedicalSimulationApi } from '../infrastructure/medical-simulation-api';
import { StoreProduct } from '../../ecommerce/domain/model/store-product.entity';
import { UserProfile } from '../../identity-access/domain/model/user-profile.entity';
import { CoinTransaction } from '../../gamification/domain/model/coin-transaction.entity';

type SimulationReward = {
  currentBalance: number;
  nextBalance: number;
  earnedCoins: number;
  multiplier: number;
  successfulAttemptNumber: number;
  transaction: CoinTransaction;
  attempt: SimulationAttempt;
  updatedProfile: UserProfile;
  updatedSimulation: MedicalSimulation;
};

const STATUS_COMPLETED = 'Completado';
const STATUS_IN_PROGRESS = 'En progreso';
const STATUS_AVAILABLE = 'Disponible';
const COMPLETION_THRESHOLD = 70;

@Injectable({ providedIn: 'root' })
export class MedicalSimulationStore {
  private readonly simulationsSignal = signal<MedicalSimulation[]>([]);
  private readonly attemptsSignal = signal<SimulationAttempt[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly simulations = this.simulationsSignal.asReadonly();
  readonly attempts = this.attemptsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly simulationCount = computed(() => this.simulations().length);
  readonly attemptCount = computed(() => this.attempts().length);

  constructor(
    private medicalSimulationApi: MedicalSimulationApi,
    private destroyRef: DestroyRef,
  ) {
    this.loadSimulations();
    this.loadAttempts();
  }

  addSimulation(simulation: MedicalSimulation): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.medicalSimulationApi.createSimulation(simulation).pipe(retry(2)).subscribe({
      next: (created) => {
        this.simulationsSignal.update((list) => [...list, created]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to create simulation'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateSimulation(simulation: MedicalSimulation): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.medicalSimulationApi.updateSimulation(simulation, simulation.id).pipe(retry(2)).subscribe({
      next: () => {
        this.simulationsSignal.update((list) => list.map((s) => (s.id === simulation.id ? simulation : s)));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update simulation'));
        this.loadingSignal.set(false);
      },
    });
  }

  deleteSimulation(id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.medicalSimulationApi.deleteSimulation(id).pipe(retry(2)).subscribe({
      next: () => {
        this.simulationsSignal.update((list) => list.filter((simulation) => simulation.id !== id));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete simulation'));
        this.loadingSignal.set(false);
      },
    });
  }

  addAttempt(attempt: SimulationAttempt): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.medicalSimulationApi.createAttempt(attempt).pipe(retry(2)).subscribe({
      next: (created) => {
        this.attemptsSignal.update((list) => [...list, created]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to add attempt'));
        this.loadingSignal.set(false);
      },
    });
  }

  completeAttempt(attempt: SimulationAttempt): Observable<SimulationAttempt> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    return this.medicalSimulationApi.createAttempt(attempt).pipe(
      tap({
        next: (created) => {
        this.attemptsSignal.update((list) => [created, ...list]);
        this.loadSimulations();
        this.loadingSignal.set(false);
      },
        error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to complete simulation attempt'));
        this.loadingSignal.set(false);
      },
      }),
    );
  }

  getSimulationById(simulations: MedicalSimulation[], id: string | null): MedicalSimulation | null {
    return simulations.find((simulation) => simulation.id === id) ?? null;
  }

  getNextSimulation(simulations: MedicalSimulation[]): MedicalSimulation | null {
    return simulations.find((simulation) => simulation.status !== STATUS_COMPLETED) ?? null;
  }

  getAttemptsForSimulation(simulationId: string, attempts: SimulationAttempt[]): SimulationAttempt[] {
    return attempts.filter((attempt) => attempt.scenarioSlug === simulationId || attempt.scenarioId?.toString() === simulationId);
  }

  getUserCompletion(simulation: MedicalSimulation, attempts: SimulationAttempt[]): number {
    const simulationAttempts = this.getAttemptsForSimulation(simulation.id, attempts);
    if (!simulationAttempts.length) return 0;
    const bestScore = Math.max(...simulationAttempts.map((attempt) => attempt.score));
    return bestScore >= COMPLETION_THRESHOLD ? 100 : bestScore;
  }

  getUserStatus(simulation: MedicalSimulation, attempts: SimulationAttempt[]): string {
    const completion = this.getUserCompletion(simulation, attempts);
    if (completion >= 100) return STATUS_COMPLETED;
    if (completion > 0) return STATUS_IN_PROGRESS;
    return STATUS_AVAILABLE;
  }

  isUserCompleted(simulation: MedicalSimulation, attempts: SimulationAttempt[]): boolean {
    return this.getUserCompletion(simulation, attempts) >= 100;
  }

  getSuggestedProducts(simulation: MedicalSimulation | null, products: StoreProduct[]): StoreProduct[] {
    if (!simulation) return [];
    const suggestedIds = simulation.productSuggestions.map((suggestion) => suggestion.productId);
    return products.filter((product) => suggestedIds.includes(product.id));
  }

  getScore(simulation: MedicalSimulation | null, selectedOptions: Record<string, string>): number {
    if (!simulation) return 0;
    let score = 0;
    simulation.steps.forEach((step) => {
      if (selectedOptions[step.id] === step.correctOptionId) score++;
    });
    return score;
  }

  getAccuracy(simulation: MedicalSimulation | null, score: number): number {
    if (!simulation) return 0;
    return score / simulation.steps.length;
  }

  getEarnedXp(simulation: MedicalSimulation | null, accuracy: number): number {
    if (!simulation) return 0;
    return Math.floor(simulation.xpReward * accuracy);
  }

  getOptionClass(selectedOptions: Record<string, string>, stepId: string, optionId: string, correctOptionId: string): string {
    const selected = selectedOptions[stepId];
    if (!selected) return '';
    if (optionId === correctOptionId) return 'correct';
    return selected === optionId ? 'wrong' : '';
  }

  buildReward(params: {
    simulation: MedicalSimulation;
    userProfile: UserProfile;
    coinTransactions: CoinTransaction[];
    simulations: MedicalSimulation[];
    attempts: SimulationAttempt[];
    selectedOptions: Record<string, string>;
    accuracy: number;
    accuracyPercent: number;
    score: number;
  }): SimulationReward {
    const userTransactions = params.coinTransactions.filter((transaction) => {
      return transaction.userId === params.userProfile.id && transaction.simulationId === params.simulation.id;
    });
    const successfulAttempts = userTransactions.filter((transaction) => transaction.successful).length;
    const successful = params.accuracy >= 0.7;
    const multiplier = successful ? 1 / Math.pow(2, successfulAttempts) : 0;
    const earnedCoins = successful ? Math.floor(params.simulation.coinReward * params.accuracy * multiplier) : 0;
    const normalizedCoins = earnedCoins < 1 ? 0 : earnedCoins;
    const nextBalance = params.userProfile.safeCoins + normalizedCoins;

    const transaction = this.buildCoinTransaction(
      params.simulation,
      params.userProfile,
      userTransactions.length + 1,
      successful ? successfulAttempts + 1 : successfulAttempts,
      multiplier,
      params.accuracy,
      normalizedCoins,
      successful,
    );

    const attempt = this.buildAttempt(params);
    const updatedProfile = this.buildUpdatedProfile(params.userProfile, nextBalance);
    const updatedSimulation = this.buildUpdatedSimulation(params.simulation, successful, params.accuracyPercent);

    return {
      currentBalance: params.userProfile.safeCoins,
      nextBalance,
      earnedCoins: normalizedCoins,
      multiplier,
      successfulAttemptNumber: transaction.successfulAttemptNumber,
      transaction,
      attempt,
      updatedProfile,
      updatedSimulation,
    };
  }

  private buildCoinTransaction(
    simulation: MedicalSimulation,
    userProfile: UserProfile,
    attemptNumber: number,
    successfulAttemptNumber: number,
    multiplier: number,
    accuracy: number,
    earnedCoins: number,
    successful: boolean,
  ): CoinTransaction {
    return new CoinTransaction({
      id: `coin-tx-${Date.now()}`,
      userId: userProfile.id,
      simulationId: simulation.id,
      simulationTitle: simulation.title,
      attemptNumber,
      successfulAttemptNumber,
      baseCoins: simulation.coinReward,
      multiplier,
      accuracy: Number(accuracy.toFixed(2)),
      earnedCoins,
      successful,
      createdAt: new Date().toISOString(),
    });
  }

  private buildAttempt(params: {
    simulation: MedicalSimulation;
    simulations: MedicalSimulation[];
    attempts: SimulationAttempt[];
    selectedOptions: Record<string, string>;
    accuracyPercent: number;
    score: number;
  }): SimulationAttempt {
    const now = new Date();
    const startedAt = new Date(now.getTime() - params.simulation.durationMinutes * 60_000).toISOString();
    const attemptErrors = params.simulation.steps
      .map((step, index) => ({ step, index }))
      .filter(({ step }) => params.selectedOptions[step.id] !== step.correctOptionId)
      .map(({ step, index }) => ({ stepNumber: index + 1, error: step.prompt, severity: 'warning' }));

    return new SimulationAttempt({
      id: Math.max(0, ...params.attempts.map((attempt) => attempt.id)) + 1,
      userId: 1,
      scenarioId: this.simulationIndex(params.simulation.id, params.simulations) + 1,
      scenarioSlug: params.simulation.id,
      mode: 'practice',
      startedAt,
      completedAt: now.toISOString(),
      score: params.accuracyPercent,
      totalSteps: params.simulation.steps.length,
      correctSteps: params.score,
      timeElapsed: params.simulation.durationMinutes * 60,
      errors: attemptErrors,
    });
  }

  private buildUpdatedProfile(userProfile: UserProfile, nextBalance: number): UserProfile {
    return new UserProfile({
      id: userProfile.id,
      fullName: userProfile.fullName,
      email: userProfile.email,
      role: userProfile.role,
      city: userProfile.city,
      avatarUrl: userProfile.avatarUrl,
      level: userProfile.level,
      xp: userProfile.xp,
      nextLevelXp: userProfile.nextLevelXp,
      safeCoins: nextBalance,
      streakDays: userProfile.streakDays,
      completedSimulations: userProfile.completedSimulations,
    });
  }

  private buildUpdatedSimulation(simulation: MedicalSimulation, successful: boolean, accuracyPercent: number): MedicalSimulation {
    return new MedicalSimulation({
      id: simulation.id,
      title: simulation.title,
      emergencyType: simulation.emergencyType,
      difficulty: simulation.difficulty,
      durationMinutes: simulation.durationMinutes,
      xpReward: simulation.xpReward,
      coinReward: simulation.coinReward,
      imageUrl: simulation.imageUrl,
      status: successful ? STATUS_COMPLETED : simulation.status,
      completion: successful ? 100 : Math.max(simulation.completion, accuracyPercent),
      description: simulation.description,
      learningGoals: simulation.learningGoals,
      steps: simulation.steps.map((step) => ({
        id: step.id,
        prompt: step.prompt,
        correctOptionId: step.correctOptionId,
        options: step.options.map((option) => ({ ...option })),
      })),
      productSuggestions: simulation.productSuggestions,
    });
  }

  private simulationIndex(simulationId: string, simulations: MedicalSimulation[]): number {
    return simulations.findIndex((simulation) => simulation.id === simulationId);
  }

  private loadSimulations(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.medicalSimulationApi.getSimulations().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (simulations) => {
        this.simulationsSignal.set(simulations);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load simulations'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadAttempts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.medicalSimulationApi.getAttempts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (attempts) => {
        this.attemptsSignal.set(attempts);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load attempts'));
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
