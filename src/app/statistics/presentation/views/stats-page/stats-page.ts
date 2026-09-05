import { Component, inject, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MedicalSimulationStore } from '../../../../medical-simulation/application/medical-simulation-store';
import { GamificationStore } from '../../../../gamification/application/gamification-store';
import { StatisticsStore } from '../../../application/statistics-store';
import { MedicalSimulation } from '../../../../medical-simulation/domain/model/medical-simulation.entity';
import { Badge } from '../../../../gamification/domain/model/badge.entity';
import { Mission } from '../../../../gamification/domain/model/mission.entity';
import { IdentityAccessStore } from '../../../../identity-access/application/identity-access-store';

@Component({
  selector: 'app-stats-page',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatProgressBarModule, TranslatePipe],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.css',
})
export class StatsPage {
  private readonly medicalSimulationStore = inject(MedicalSimulationStore);
  private readonly gamificationStore = inject(GamificationStore);
  private readonly statisticsStore = inject(StatisticsStore);
  private readonly identityAccessStore = inject(IdentityAccessStore);

  protected readonly simulations = this.medicalSimulationStore.simulations;
  protected readonly attempts = this.medicalSimulationStore.attempts;
  protected readonly missions = this.gamificationStore.missions;
  protected readonly badges = this.gamificationStore.badges;
  protected readonly coinTransactions = this.gamificationStore.coinTransactions;
  protected readonly error = computed(() => this.medicalSimulationStore.error() || this.gamificationStore.error());
  protected readonly loading = computed(() => this.medicalSimulationStore.loading() || this.gamificationStore.loading());
  protected readonly currentUser = computed(() => this.identityAccessStore.getCurrentUser());

  protected readonly successfulTransactions = computed(() =>
    this.statisticsStore.getSuccessfulTransactions(this.coinTransactions()),
  );
  protected readonly completedSimulationIds = computed(
    () => this.statisticsStore.getCompletedSimulationIds(this.successfulTransactions()),
  );
  protected readonly totalAttempts = computed(() => this.userAttempts().length);
  protected readonly completedSimulations = computed(() => this.completedSimulationIds().length);
  protected readonly averageAccuracy = computed(() => this.statisticsStore.getAverageAttemptAccuracy(this.userAttempts()));
  protected readonly totalCoins = computed(() => this.statisticsStore.getTotalCoins(this.successfulTransactions()));
  protected readonly totalXp = computed(() =>
    this.currentUser()?.xp ?? this.statisticsStore.getTotalXp(this.successfulTransactions(), this.simulations()),
  );
  protected readonly trainedMinutes = computed(() => this.statisticsStore.getTrainedMinutesFromAttempts(this.userAttempts()));
  protected readonly performanceBySimulation = computed(() =>
    this.statisticsStore.getPerformanceBySimulation(this.simulations(), this.userAttempts(), this.successfulTransactions()),
  );
  protected readonly pendingSimulations = computed(() =>
    this.statisticsStore.getPendingSimulations(this.simulations(), this.completedSimulationIds()),
  );
  protected readonly weakSimulations = computed(() =>
    this.statisticsStore.getWeakSimulations(this.performanceBySimulation()),
  );
  protected readonly commonMistakes = computed(() =>
    this.statisticsStore.getCommonMistakes(this.userAttempts()).map((item) => ({
      ...item,
      recommendation: this.recommendationForMistake(item.topic),
    })),
  );
  protected readonly actionRecommendations = computed(() =>
    this.getActionRecommendations(
      this.weakSimulations(),
      this.pendingSimulations(),
      this.badges(),
      this.missions(),
    ),
  );
  protected readonly completedMissions = computed(
    () => this.statisticsStore.getCompletedMissionCount(this.missions()),
  );
  protected readonly unlockedBadges = computed(
    () => this.statisticsStore.getUnlockedBadgeCount(this.badges()),
  );
  private readonly translate = inject(TranslateService);

  constructor() {
    // Stores auto-load in their constructors.
  }

  protected formatDate(value: string): string {
    if (!value) {
      return this.translate.instant('stats.noAttempts');
    }
    return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short' }).format(new Date(value));
  }

  private userAttempts() {
    return this.statisticsStore.getUserAttempts(this.attempts());
  }

  private getActionRecommendations(
    weakSimulations: Array<{ simulation: MedicalSimulation; attempts: number; completions: number; bestScore: number; averageAccuracy: number; lastAttempt: string }>,
    pendingSimulations: MedicalSimulation[],
    badges: Badge[],
    missions: Mission[],
  ): Array<{ icon: string; title: string; detail: string }> {
    const weakest = weakSimulations[0];
    const pending = pendingSimulations[0];
    const lockedBadge = badges.find((badge) => !badge.unlocked);
    const mission = missions.find((item) => (item.status ?? 'Disponible') === 'Disponible');

    return [
      weakest
        ? {
            icon: 'replay',
            title: `Repite ${weakest.simulation.title}`,
            detail: `Tu precision promedio es ${weakest.averageAccuracy}%. Es el mejor candidato para reforzar.`,
          }
        : {
            icon: 'verified',
            title: 'Manten tu precision',
            detail: 'No hay simulaciones con precision baja en tus intentos actuales.',
          },
      pending
        ? {
            icon: 'play_circle',
            title: `Completa ${pending.title}`,
            detail: 'Aun no tiene recompensas registradas para tu usuario.',
          }
        : {
            icon: 'fact_check',
            title: 'Rutas principales completadas',
            detail: 'Tus simulaciones principales ya tienen al menos una finalizacion exitosa.',
          },
      lockedBadge
        ? {
            icon: 'workspace_premium',
            title: `Desbloquea ${lockedBadge.name}`,
            detail: lockedBadge.unlockRequirement ?? lockedBadge.description,
          }
        : {
            icon: 'emoji_events',
            title: 'Insignias al dia',
            detail: 'No hay insignias bloqueadas con los datos actuales.',
          },
      mission
        ? {
            icon: 'flag',
            title: `Acepta: ${mission.title}`,
            detail: mission.instructions ?? 'Completa esta mision para ganar XP y SafeCoins.',
          }
        : {
            icon: 'paid',
            title: 'Canjea tus SafeCoins',
            detail: 'Revisa la tienda y usa tus monedas acumuladas en cupones.',
          },
    ];
  }

  private recommendationForMistake(topic: string): string {
    const lower = topic.toLowerCase();

    if (lower.includes('compres')) {
      return 'Repite una simulacion de RCP y revisa la frecuencia de compresiones.';
    }

    if (lower.includes('gasa') || lower.includes('sang')) {
      return 'Practica control de hemorragias y evita retirar gasas colocadas.';
    }

    if (lower.includes('conciencia')) {
      return 'Refuerza evaluacion inicial antes de intervenir.';
    }

    return 'Repite la simulacion asociada y revisa el feedback del paso fallado.';
  }
}
