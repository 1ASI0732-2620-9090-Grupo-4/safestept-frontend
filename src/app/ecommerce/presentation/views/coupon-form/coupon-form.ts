import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { EcommerceStore } from '../../../application/ecommerce-store';
import { Coupon } from '../../../domain/model/coupon.entity';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.html',
  styleUrls: ['./coupon-form.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    TranslateModule,
  ],
})
export class CouponForm implements OnInit {
  editMode = false;
  couponId: string | null = null;
  model = new Coupon({ id: '', title: '', costCoins: 0, discount: '' });

  constructor(
    public store: EcommerceStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.couponId = params.get('id');
      this.editMode = Boolean(this.couponId);
      if (this.editMode && this.couponId) {
        const existing = this.store.getCouponById(this.couponId);
        if (existing) {
          this.model = new Coupon(existing);
        }
      }
    });
  }

  save(): void {
    if (!this.model.id.trim()) {
      return;
    }

    if (this.editMode && this.couponId) {
      this.store.updateCoupon(this.model, this.couponId);
    } else {
      this.store.addCoupon(this.model);
    }
    this.router.navigate(['/app/store/admin/coupons']);
  }
}
