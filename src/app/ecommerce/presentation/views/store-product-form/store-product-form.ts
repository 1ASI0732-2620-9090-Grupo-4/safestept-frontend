import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { EcommerceStore } from '../../../application/ecommerce-store';
import { StoreProduct } from '../../../domain/model/store-product.entity';

@Component({
  selector: 'app-store-product-form',
  templateUrl: './store-product-form.html',
  styleUrls: ['./store-product-form.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    TranslateModule,
  ],
})
export class StoreProductForm implements OnInit {
  editMode = false;
  productId: string | null = null;
  model: StoreProduct = new StoreProduct({
    id: '',
    name: '',
    category: '',
    type: 'Producto',
    price: 0,
    rating: 0,
    stock: 0,
    imageUrl: '',
    tags: [],
    description: '',
    recommendedFor: [],
  });

  get tagsString(): string {
    return this.model.tags.join(', ');
  }

  set tagsString(value: string) {
    this.model.tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }

  constructor(
    public store: EcommerceStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.editMode = Boolean(this.productId);
      if (this.editMode && this.productId) {
        const existing = this.store.getProductById(this.productId);
        if (existing) {
          this.model = new StoreProduct(existing);
        }
      }
    });
  }

  save(): void {
    if (!this.model.id.trim()) {
      return;
    }

    if (this.editMode && this.productId) {
      this.store.updateProduct(this.model, this.productId);
    } else {
      this.store.addProduct(this.model);
    }
    this.router.navigate(['/app/store/admin/products']);
  }
}
