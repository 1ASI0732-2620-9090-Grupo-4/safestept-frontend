import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { GamificationStore } from '../../../application/gamification-store';
import { IdentityAccessStore } from '../../../../identity-access/application/identity-access-store';

@Component({
  selector: 'app-gamification-page',
  templateUrl: './gamification-page.html',
  styleUrls: ['./gamification-page.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    RouterLink,
    TranslateModule,
  ],
})
export class GamificationPage {
  protected readonly store = inject(GamificationStore);
  protected readonly identityStore = inject(IdentityAccessStore);

  protected readonly missionInventoryOpen = signal(false);
  protected readonly badgeInventoryOpen = signal(false);

  get currentUserFullName(): string {
    return this.identityStore.getCurrentUser()?.fullName ?? '';
  }

  get currentUserLevel(): number {
    return this.identityStore.getCurrentUser()?.level ?? 0;
  }

  get currentUserXp(): number {
    return this.identityStore.getCurrentUser()?.xp ?? 0;
  }

  get nextLevelXp(): number {
    return this.identityStore.getCurrentUser()?.nextLevelXp ?? 100;
  }

  get currentUserCoins(): number {
    return this.identityStore.getCurrentUser()?.safeCoins ?? 0;
  }

  get currentUserStreak(): number {
    return this.identityStore.getCurrentUser()?.streakDays ?? 0;
  }

  get currentUserRank(): number {
    const fullName = this.currentUserFullName;
    if (!fullName) return 0;
    const entry = this.store.leaderboard().find((e) => e.name === fullName);
    return entry?.rank ?? 0;
  }

  protected openMissionInventory(): void {
    this.missionInventoryOpen.set(true);
    this.badgeInventoryOpen.set(false);
  }

  protected closeMissionInventory(): void {
    this.missionInventoryOpen.set(false);
  }

  protected openBadgeInventory(): void {
    this.badgeInventoryOpen.set(true);
    this.missionInventoryOpen.set(false);
  }

  protected closeBadgeInventory(): void {
    this.badgeInventoryOpen.set(false);
  }
}
