import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { GamificationStore } from '../../../application/gamification-store';
import { Badge } from '../../../domain/model/badge.entity';

@Component({
  selector: 'app-badge-form',
  templateUrl: './badge-form.html',
  styleUrls: ['./badge-form.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    TranslateModule,
  ],
})
export class BadgeForm implements OnInit {
  editMode = false;
  badgeId: string | null = null;
  model = new Badge({
    id: '',
    name: '',
    rarity: 'Comun',
    unlocked: false,
    description: '',
  });

  constructor(
    public store: GamificationStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.badgeId = params.get('id');
      this.editMode = Boolean(this.badgeId);
      if (this.editMode && this.badgeId) {
        const existing = this.store.getBadgeById(this.badgeId);
        if (existing) {
          this.model = new Badge(existing);
        }
      }
    });
  }

  save(): void {
    if (!this.model.id.trim()) {
      return;
    }

    if (this.editMode && this.badgeId) {
      this.store.updateBadge(this.model, this.badgeId);
    } else {
      this.store.addBadge(this.model);
    }
    this.router.navigate(['/app/gamification/admin/badges']);
  }
}
