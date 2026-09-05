import { Component, inject, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslatePipe } from '@ngx-translate/core';
import { IdentityAccessStore } from '../../../application/identity-access-store';

@Component({
  selector: 'app-profile-page',
  imports: [MatCardModule, MatCheckboxModule, TranslatePipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  protected readonly store = inject(IdentityAccessStore);
  protected readonly user = computed(() => this.store.getCurrentUser());

  constructor() {
    // Store auto-loads in its constructor.
  }
}
