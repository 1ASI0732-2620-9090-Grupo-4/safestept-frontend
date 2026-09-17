import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MedicalSimulationStore } from '../../../../medical-simulation/application/medical-simulation-store';
import { GamificationStore } from '../../../../gamification/application/gamification-store';
import { EcommerceStore } from '../../../../ecommerce/application/ecommerce-store';
import { UserAdminStore } from '../../../../identity-access/application/user-admin-store';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, TranslatePipe],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.css',
})
export class AdminDashboardPage {
  private readonly medicalSimulationStore = inject(MedicalSimulationStore);
  private readonly gamificationStore = inject(GamificationStore);
  private readonly ecommerceStore = inject(EcommerceStore);
  private readonly userAdminStore = inject(UserAdminStore);

  protected readonly cards = [
    {
      icon: 'health_and_safety',
      labelKey: 'adminDashboard.simulations',
      path: '/app/simulations/admin',
      count: () => this.medicalSimulationStore.simulations().length,
    },
    {
      icon: 'shopping_bag',
      labelKey: 'adminDashboard.products',
      path: '/app/store/admin/products',
      count: () => this.ecommerceStore.products().length,
    },
    {
      icon: 'local_offer',
      labelKey: 'adminDashboard.coupons',
      path: '/app/store/admin/coupons',
      count: () => this.ecommerceStore.coupons().length,
    },
    {
      icon: 'flag',
      labelKey: 'adminDashboard.missions',
      path: '/app/gamification/admin/missions',
      count: () => this.gamificationStore.missions().length,
    },
    {
      icon: 'emoji_events',
      labelKey: 'adminDashboard.badges',
      path: '/app/gamification/admin/badges',
      count: () => this.gamificationStore.badges().length,
    },
    {
      icon: 'group',
      labelKey: 'adminDashboard.users',
      path: '/app/users',
      count: () => this.userAdminStore.users().length,
    },
  ];
}
