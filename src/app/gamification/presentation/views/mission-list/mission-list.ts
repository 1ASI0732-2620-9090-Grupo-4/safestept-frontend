import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { GamificationStore } from '../../../application/gamification-store';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.html',
  styleUrls: ['./mission-list.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    RouterLink,
    TranslateModule,
  ],
})
export class MissionList {
  displayedColumns = ['title', 'cadence', 'status', 'progress', 'reward', 'actions'];

  constructor(public store: GamificationStore) {}
}
