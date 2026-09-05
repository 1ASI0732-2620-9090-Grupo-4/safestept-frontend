import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { IdentityAccessStore } from '../../../../identity-access/application/identity-access-store';
import { MedicalSimulationStore } from '../../../../medical-simulation/application/medical-simulation-store';
import { GamificationStore } from '../../../../gamification/application/gamification-store';
import { EcommerceStore } from '../../../../ecommerce/application/ecommerce-store';
import { StatisticsStore } from '../../../../statistics/application/statistics-store';
import { MedicalSimulation } from '../../../../medical-simulation/domain/model/medical-simulation.entity';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    TranslatePipe,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private readonly identityAccessStore = inject(IdentityAccessStore);
  private readonly medicalSimulationStore = inject(MedicalSimulationStore);
  private readonly gamificationStore = inject(GamificationStore);
  private readonly statisticsStore = inject(StatisticsStore);
  private readonly ecommerceStore = inject(EcommerceStore);

  protected readonly user = computed(() => this.identityAccessStore.getCurrentUser());
  protected readonly simulations = this.medicalSimulationStore.simulations;
  protected readonly attempts = this.medicalSimulationStore.attempts;
  protected readonly missions = this.gamificationStore.missions;
  protected readonly coinTransactions = this.gamificationStore.coinTransactions;
  protected readonly badges = this.gamificationStore.badges;
  protected readonly stats = computed(() => {
    const transactions = this.statisticsStore.getSuccessfulTransactions(this.coinTransactions());
    const userAttempts = this.statisticsStore.getUserAttempts(this.attempts());
    const coins = this.user()?.safeCoins ?? this.statisticsStore.getTotalCoins(transactions);
    const xp = this.user()?.xp ?? this.statisticsStore.getTotalXp(transactions, this.simulations());
    const minutes = this.statisticsStore.getTrainedMinutesFromAttempts(userAttempts);
    const accuracy = this.statisticsStore.getAverageAttemptAccuracy(userAttempts);
    return [
      { label: 'SafeCoins', value: `${coins}`, trend: '+0% hoy' },
      { label: 'XP Total', value: `${xp}`, trend: '+0% hoy' },
      { label: 'Minutos', value: `${minutes}`, trend: '+0% hoy' },
      { label: 'Precisión', value: `${accuracy}%`, trend: '+0% hoy' },
    ];
  });
  protected readonly products = computed(() => this.ecommerceStore.getFeaturedProducts(this.ecommerceStore.products()));
  protected readonly nextSimulations = computed(() => {
    return this.simulations()
      .filter((simulation) => this.simulationStatus(simulation) !== 'Completado')
      .slice(0, 2);
  });

  protected readonly loading = computed(() =>
    this.identityAccessStore.loading() ||
    this.medicalSimulationStore.loading() ||
    this.gamificationStore.loading(),
  );

  protected readonly errors = computed(() => {
    const errs: string[] = [];
    const identityErr = this.identityAccessStore.error();
    if (identityErr) errs.push(identityErr);
    const simErr = this.medicalSimulationStore.error();
    if (simErr) errs.push(simErr);
    const gameErr = this.gamificationStore.error();
    if (gameErr) errs.push(gameErr);
    return errs;
  });

  protected readonly hasErrors = computed(() => this.errors().length > 0);

  protected retry(): void {
    // Stores auto-load in their constructors; no manual retry needed.
  }

  protected simulationCompletion(simulation: MedicalSimulation): number {
    return this.medicalSimulationStore.getUserCompletion(simulation, this.attempts());
  }

  protected simulationStatus(simulation: MedicalSimulation): string {
    return this.medicalSimulationStore.getUserStatus(simulation, this.attempts());
  }
}
