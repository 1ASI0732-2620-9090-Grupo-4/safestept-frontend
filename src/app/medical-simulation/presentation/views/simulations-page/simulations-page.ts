import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { MedicalSimulationStore } from '../../../application/medical-simulation-store';

@Component({
  selector: 'app-simulations-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    TranslatePipe,
  ],
  templateUrl: './simulations-page.html',
  styleUrl: './simulations-page.css',
})
export class SimulationsPage {
  protected readonly medicalSimulationStore = inject(MedicalSimulationStore);

  protected readonly simulations = computed(() => this.medicalSimulationStore.simulations());
  protected readonly attempts = computed(() => this.medicalSimulationStore.attempts());

  protected readonly activeFilter = signal<string | null>(null);

  protected readonly emergencyTypes = computed(() => {
    const types = new Set(this.simulations().map((s) => s.emergencyType));
    return Array.from(types);
  });

  protected readonly filteredSimulations = computed(() => {
    const filter = this.activeFilter();
    if (!filter) return this.simulations();
    return this.simulations().filter((s) => s.emergencyType === filter);
  });

  protected readonly inProgressSim = computed(() => {
    return this.simulations().find((s) => this.simulationStatus(s) === 'En progreso');
  });

  protected readonly inProgressCount = computed(() => {
    return this.simulations().filter((s) => this.simulationStatus(s) === 'En progreso').length;
  });

  protected setFilter(type: string | null): void {
    this.activeFilter.set(type);
  }

  protected simulationCompletion(simulation: ReturnType<typeof this.simulations>[number]): number {
    return this.medicalSimulationStore.getUserCompletion(simulation, this.attempts());
  }

  protected simulationStatus(simulation: ReturnType<typeof this.simulations>[number]): string {
    return this.medicalSimulationStore.getUserStatus(simulation, this.attempts());
  }
}
