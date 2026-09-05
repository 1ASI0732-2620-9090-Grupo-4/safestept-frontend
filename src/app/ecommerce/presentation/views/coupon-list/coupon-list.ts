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
import { EcommerceStore } from '../../../application/ecommerce-store';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.html',
  styleUrls: ['./coupon-list.css'],
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
export class CouponList {
  displayedColumns = ['title', 'discount', 'costCoins', 'actions'];

  constructor(public store: EcommerceStore) {}
}
