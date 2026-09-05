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
import { formatPrice } from '../../../../shared/infrastructure/format-price';

@Component({
  selector: 'app-store-product-list',
  templateUrl: './store-product-list.html',
  styleUrls: ['./store-product-list.css'],
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
export class StoreProductList {
  formatPrice = formatPrice;
  displayedColumns = ['image', 'name', 'category', 'price', 'stock', 'rating', 'actions'];

  constructor(public store: EcommerceStore) {}
}
