import { Component, inject, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { EcommerceStore } from '../../../../ecommerce/application/ecommerce-store';
import { IdentityAccessStore } from '../../../../identity-access/application/identity-access-store';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    TranslatePipe,
    LanguageSwitcher,
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  protected readonly identityAccessStore = inject(IdentityAccessStore);
  private readonly ecommerceStore = inject(EcommerceStore);
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly user = computed(() => this.identityAccessStore.getCurrentUser());
  protected readonly cartCount = computed(() => {
    const currentUser = this.identityAccessStore.authenticatedUser();
    const userId = currentUser?.username ?? this.identityAccessStore.getCurrentUser()?.id ?? '';
    const userCartItems = this.ecommerceStore.getCartItemsForUser(this.ecommerceStore.cartItems(), userId);

    return this.ecommerceStore.getCartItemCount(userCartItems);
  });
  protected readonly isMobile = signal(false);
  protected readonly navItems = [
    { label: 'nav.dashboard', path: '/app/dashboard', icon: 'dashboard' },
    { label: 'nav.simulations', path: '/app/simulations', icon: 'health_and_safety' },
    { label: 'nav.progress', path: '/app/statistics', icon: 'trending_up' },
    { label: 'nav.gamification', path: '/app/gamification', icon: 'emoji_events' },
    { label: 'nav.store', path: '/app/store', icon: 'shopping_bag' },
  ];

  constructor() {
    this.breakpointObserver
      .observe('(max-width: 1024px)')
      .pipe(takeUntilDestroyed())
      .subscribe((state) => this.isMobile.set(state.matches));
  }

  protected closeNavigation(drawer: MatSidenav): void {
    if (this.isMobile()) {
      void drawer.close();
    }
  }

  protected logout(): void {
    this.identityAccessStore.logout().subscribe({
      next: () => {
        window.location.assign('/auth');
      },
    });
  }
}
