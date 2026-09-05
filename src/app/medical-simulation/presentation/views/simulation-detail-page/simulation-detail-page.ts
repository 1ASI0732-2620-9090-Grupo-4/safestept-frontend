import { Component, inject, computed, signal } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { MedicalSimulationStore } from '../../../application/medical-simulation-store';
import { EcommerceStore } from '../../../../ecommerce/application/ecommerce-store';
import { IdentityAccessStore } from '../../../../identity-access/application/identity-access-store';
import { GamificationStore } from '../../../../gamification/application/gamification-store';

@Component({
  selector: 'app-simulation-detail-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    TranslatePipe,
    LowerCasePipe,
  ],
  templateUrl: './simulation-detail-page.html',
  styleUrl: './simulation-detail-page.css',
})
export class SimulationDetailPage {
  protected readonly Math = Math;

  private readonly route = inject(ActivatedRoute);
  protected readonly medicalSimulationStore = inject(MedicalSimulationStore);
  private readonly ecommerceStore = inject(EcommerceStore);
  private readonly identityAccessStore = inject(IdentityAccessStore);
  private readonly gamificationStore = inject(GamificationStore);

  private readonly simulationId = signal<string | null>(null);

  protected readonly simulation = computed(() => {
    return this.medicalSimulationStore.getSimulationById(
      this.medicalSimulationStore.simulations(),
      this.simulationId(),
    );
  });

  protected readonly products = computed(() => {
    return this.medicalSimulationStore.getSuggestedProducts(this.simulation(), this.ecommerceStore.products());
  });

  protected readonly savingReward = signal(false);
  protected readonly rewardError = signal<string | null>(null);
  protected readonly completed = signal(false);
  protected readonly previousBalance = signal(0);
  protected readonly earnedCoins = signal(0);
  protected readonly appliedMultiplier = signal(0);
  protected readonly successfulAttemptNumber = signal(0);

  protected readonly selectedOptions = signal<Record<string, string>>({});
  protected readonly score = computed(() => {
    return this.medicalSimulationStore.getScore(this.simulation(), this.selectedOptions());
  });
  protected readonly answeredCount = computed(() => Object.keys(this.selectedOptions()).length);
  protected readonly allAnswered = computed(() => {
    const current = this.simulation();
    return !!current && this.answeredCount() === current.steps.length;
  });
  protected readonly accuracy = computed(() => {
    return this.medicalSimulationStore.getAccuracy(this.simulation(), this.score());
  });
  protected readonly accuracyPercent = computed(() => Math.round(this.accuracy() * 100));
  protected readonly earnedXp = computed(() => {
    return this.medicalSimulationStore.getEarnedXp(this.simulation(), this.accuracy());
  });
  protected readonly newBalance = computed(() => this.previousBalance() + this.earnedCoins());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.simulationId.set(id);
  }

  protected selectOption(stepId: string, optionId: string): void {
    this.selectedOptions.update((current) => ({ ...current, [stepId]: optionId }));
  }

  protected finish(): void {
    if (this.completed() || this.savingReward()) return;
    this.saveReward();
  }

  protected optionClass(stepId: string, optionId: string, correctOptionId: string): string {
    return this.medicalSimulationStore.getOptionClass(this.selectedOptions(), stepId, optionId, correctOptionId);
  }

  private saveReward(): void {
    const current = this.simulation();
    const userProfile = this.identityAccessStore.getCurrentUser();
    const coinTransactions = this.gamificationStore.coinTransactions();
    const allSimulations = this.medicalSimulationStore.simulations();
    const allAttempts = this.medicalSimulationStore.attempts();
    const accuracy = this.accuracy();
    const accuracyPercent = this.accuracyPercent();
    const score = this.score();

    if (!current || !userProfile || !coinTransactions) return;

    this.savingReward.set(true);
    this.rewardError.set(null);

    const reward = this.medicalSimulationStore.buildReward({
      simulation: current,
      userProfile,
      coinTransactions,
      simulations: allSimulations,
      attempts: allAttempts,
      selectedOptions: this.selectedOptions(),
      accuracy,
      accuracyPercent,
      score,
    });

    this.previousBalance.set(reward.currentBalance);
    this.earnedCoins.set(reward.earnedCoins);
    this.appliedMultiplier.set(reward.multiplier);
    this.successfulAttemptNumber.set(reward.successfulAttemptNumber);
    this.identityAccessStore.updateSafeCoinsLocally(reward.nextBalance);
    this.medicalSimulationStore.completeAttempt(reward.attempt).subscribe({
      next: () => {
        this.completed.set(true);
        this.gamificationStore.refresh();
        this.identityAccessStore.refreshGamificationSummary().subscribe();
        this.savingReward.set(false);
      },
      error: (error: unknown) => {
        this.rewardError.set(error instanceof Error ? error.message : 'No se pudo guardar el intento');
        this.savingReward.set(false);
      },
    });
  }
}
