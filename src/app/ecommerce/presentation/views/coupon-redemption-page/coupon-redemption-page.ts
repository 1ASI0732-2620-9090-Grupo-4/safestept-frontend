import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { EcommerceStore } from '../../../application/ecommerce-store';
import { IdentityAccessStore } from '../../../../identity-access/application/identity-access-store';
import { Coupon } from '../../../domain/model/coupon.entity';

@Component({
  selector: 'app-coupon-redemption-page',
  templateUrl: './coupon-redemption-page.html',
  styleUrls: ['./coupon-redemption-page.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    TranslateModule,
  ],
})
export class CouponRedemptionPage {
  redeemingId = signal<string | null>(null);
  redeemError = signal<string | null>(null);

  constructor(
    public store: EcommerceStore,
    public identityStore: IdentityAccessStore,
  ) {}

  canAfford(coupon: Coupon): boolean {
    return this.identityStore.safeCoins() >= coupon.costCoins;
  }

  get availableRedeemedCoupons() {
    return this.store.redeemedCoupons().filter((coupon) => coupon.isAvailable);
  }

  get usedRedeemedCoupons() {
    return this.store.redeemedCoupons().filter((coupon) => !coupon.isAvailable);
  }

  redeem(coupon: Coupon): void {
    if (!this.canAfford(coupon) || this.redeemingId()) {
      return;
    }
    this.redeemingId.set(coupon.id);
    this.redeemError.set(null);
    this.store.redeemCoupon(coupon.id).subscribe({
      next: () => this.redeemingId.set(null),
      error: (err: unknown) => {
        this.redeemError.set(err instanceof Error ? err.message : 'No se pudo canjear el cupón');
        this.redeemingId.set(null);
      },
    });
  }
}
