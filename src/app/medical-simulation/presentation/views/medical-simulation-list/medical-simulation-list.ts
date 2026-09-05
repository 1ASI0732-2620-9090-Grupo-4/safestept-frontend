import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MedicalSimulationStore } from '../../../application/medical-simulation-store';

@Component({
  selector: 'app-medical-simulation-list',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, TranslatePipe],
  templateUrl: './medical-simulation-list.html',
  styleUrl: './medical-simulation-list.css',
})
export class MedicalSimulationList {
  readonly store = inject(MedicalSimulationStore);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  readonly displayedColumns = ['id', 'title', 'difficulty', 'duration', 'status', 'actions'];

  add(): void { void this.router.navigate(['/app/simulations/admin/new']); }
  edit(id: string): void { void this.router.navigate(['/app/simulations/admin/edit', id]); }
  delete(id: string): void { if (window.confirm(this.translate.instant('admin.confirmDeleteSimulation'))) this.store.deleteSimulation(id); }
  back(): void { void this.router.navigate(['/app/simulations']); }
}
