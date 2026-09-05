import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MedicalSimulationStore } from '../../../application/medical-simulation-store';
import { Difficulty, MedicalSimulation, SimulationStatus } from '../../../domain/model/medical-simulation.entity';

@Component({
  selector: 'app-medical-simulation-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, TranslatePipe],
  templateUrl: './medical-simulation-form.html',
  styleUrl: './medical-simulation-form.css',
})
export class MedicalSimulationForm {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(MedicalSimulationStore);
  readonly simulationId = this.route.snapshot.paramMap.get('id');
  readonly isEdit = !!this.simulationId;
  readonly form = this.fb.nonNullable.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    emergencyType: ['', Validators.required],
    difficulty: ['Basico' as Difficulty, Validators.required],
    durationMinutes: [0, [Validators.required, Validators.min(0)]],
    xpReward: [0, [Validators.required, Validators.min(0)]],
    coinReward: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', Validators.required],
    status: ['Disponible' as SimulationStatus, Validators.required],
    completion: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    description: ['', Validators.required],
    learningGoals: [''],
  });

  constructor() {
    const item = this.current();
    if (item) {
      this.form.patchValue({
        id: item.id,
        title: item.title,
        emergencyType: item.emergencyType,
        difficulty: item.difficulty,
        durationMinutes: item.durationMinutes,
        xpReward: item.xpReward,
        coinReward: item.coinReward,
        imageUrl: item.imageUrl,
        status: item.status,
        completion: item.completion,
        description: item.description,
        learningGoals: item.learningGoals.join(', '),
      });
      this.form.controls.id.disable();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const previous = this.current();
    const item = new MedicalSimulation({
      id: value.id.trim(),
      title: value.title.trim(),
      emergencyType: value.emergencyType.trim(),
      difficulty: value.difficulty,
      durationMinutes: value.durationMinutes,
      xpReward: value.xpReward,
      coinReward: value.coinReward,
      imageUrl: value.imageUrl.trim(),
      status: value.status,
      completion: value.completion,
      description: value.description.trim(),
      learningGoals: this.toList(value.learningGoals),
      steps: previous?.steps ?? [],
      productSuggestions: previous?.productSuggestions ?? [],
    });
    if (this.isEdit)
      this.store.updateSimulation(item);
    else
      this.store.addSimulation(item);
    this.cancel();
  }

  cancel(): void {
    void this.router.navigate(['/app/simulations/admin']);
  }

  private current(): MedicalSimulation | null {
    return this.store.getSimulationById(this.store.simulations(), this.simulationId);
  }

  private toList(value: string): string[] {
    return value.split(',').map(item => item.trim()).filter(item => !!item);
  }
}
