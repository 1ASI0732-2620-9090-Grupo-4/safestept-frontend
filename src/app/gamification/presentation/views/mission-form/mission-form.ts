import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { GamificationStore } from '../../../application/gamification-store';
import { Mission } from '../../../domain/model/mission.entity';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.html',
  styleUrls: ['./mission-form.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    TranslateModule,
  ],
})
export class MissionForm implements OnInit {
  editMode = false;
  missionId: string | null = null;
  model = new Mission({
    id: '',
    title: '',
    cadence: 'Diaria',
    progress: 0,
    goal: 1,
    rewardXp: 0,
    rewardCoins: 0,
    status: 'Disponible',
  });

  constructor(
    public store: GamificationStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.missionId = params.get('id');
      this.editMode = Boolean(this.missionId);
      if (this.editMode && this.missionId) {
        const existing = this.store.getMissionById(this.missionId);
        if (existing) {
          this.model = new Mission(existing);
        }
      }
    });
  }

  save(): void {
    if (!this.model.id.trim()) {
      return;
    }

    if (this.editMode && this.missionId) {
      this.store.updateMission(this.model, this.missionId);
    } else {
      this.store.addMission(this.model);
    }
    this.router.navigate(['/app/gamification/admin/missions']);
  }
}
