import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EcommerceStore } from '../../../application/ecommerce-store';
import { IdentityAccessStore } from '../../../../identity-access/application/identity-access-store';
import { CartItem } from '../../../domain/model/cart-item.entity';
import { Order } from '../../../domain/model/order.entity';
import { FormGroup } from '@angular/forms';
import { ShippingAddress } from '../../../domain/model/shipping-address.entity';
import { formatPrice } from '../../../../shared/infrastructure/format-price';

@Component({
  selector: 'app-store',
  templateUrl: './store-page.html',
  styleUrls: ['./store-page.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    RouterLink,
    TranslateModule,
  ],
})
export class StorePage implements OnInit {
  readonly Math = Math;
  selectedCategory = '';
  searchQuery = '';
  selectedProductId: string | null = null;
  currentStep = signal(0);
  purchaseComplete = false;
  showHistory = signal(false);
  cartOpen = signal(false);
  selectedAddressId: number | null = null;
  shippingForm: FormGroup;
  selectedPaymentMethodId: number | null = null;
  processingPayment = signal(false);
  couponCode = '';
  couponError = false;

  formatPrice = formatPrice;

  constructor(
    public store: EcommerceStore,
    public identityStore: IdentityAccessStore,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private fb: FormBuilder,
  ) {
    this.shippingForm = this.fb.group({
      recipientName: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      district: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      label: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedProductId = params.get('id');
    });
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('history') === 'true') {
        this.openHistory(false);
      }
    });
  }

  get currentUserId(): string {
    return this.identityStore.authenticatedUser()?.username ?? this.identityStore.getCurrentUser()?.id ?? '';
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
  }

  get filteredProducts() {
    return this.store.filterProducts(this.store.products(), this.selectedCategory, this.searchQuery);
  }

  get filteredKits() {
    return this.store.filterEmergencyKits(this.store.emergencyKits(), this.selectedCategory, this.searchQuery);
  }

  get selectedProduct() {
    const id = this.selectedProductId;
    if (!id) {
      return null;
    }
    return this.store.getProductById(id) ?? this.store.toStoreProductFromKit(this.store.emergencyKits().find((k) => k.id === id)!);
  }

  get productImages() {
    return this.store.getProductImages(this.selectedProduct);
  }

  get productReviews() {
    return this.store.getProductReviews(this.selectedProduct, this.store.reviews());
  }

  get cartLines() {
    const items = this.store.getCartItemsForUser(this.store.cartItems(), this.currentUserId);
    return this.store.buildCartLines(items, this.store.products(), this.store.emergencyKits());
  }

  get cartTotal() {
    return this.store.getCartTotal(this.cartLines);
  }

  get cartCount() {
    return this.store.getCartItemCount(this.store.getCartItemsForUser(this.store.cartItems(), this.currentUserId));
  }

  get userOrders() {
    return this.store.getUserOrders(this.store.orders(), this.currentUserId);
  }

  get orderLines() {
    if (this.userOrders.length === 0) {
      return [];
    }
    return this.store.buildOrderLines(this.userOrders[0], this.store.products(), this.store.emergencyKits());
  }

  get selectedPaymentMethod() {
    return this.store.paymentMethods().find((m) => m.id === this.selectedPaymentMethodId) ?? null;
  }

  get canContinuePayment(): boolean {
    return this.store.paymentMethods().length === 0 || !!this.selectedPaymentMethodId;
  }

  get discountAmount(): number {
    return this.store.calculateDiscount(this.cartTotal);
  }

  get finalTotal(): number {
    return Math.max(0, this.cartTotal - this.discountAmount);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/app/store/products', productId]);
  }

  goBackToStore(): void {
    this.router.navigate(['/app/store']);
  }

  addToCart(productId: string): void {
    const existing = this.store.getCartItemForProduct(this.store.cartItems(), this.currentUserId, productId);
    if (existing) {
      this.store.updateCartItem(new CartItem({ id: existing.id, userId: existing.userId, productId: existing.productId, quantity: existing.quantity + 1, addedAt: existing.addedAt }), existing.id);
    } else {
      this.store.addCartItem(new CartItem({
        id: '',
        userId: this.currentUserId,
        productId,
        quantity: 1,
        addedAt: new Date().toISOString(),
      }));
    }
  }

  removeFromCart(itemId: string): void {
    this.store.deleteCartItem(itemId);
  }

  updateQuantity(itemId: string, quantity: number): void {
    const item = this.store.cartItems().find((cartItem) => cartItem.id === itemId);
    if (item) {
      this.store.updateCartItem(new CartItem({ id: item.id, userId: item.userId, productId: item.productId, quantity, addedAt: item.addedAt }), itemId);
    }
  }

  selectAddress(addr: ShippingAddress): void {
    this.selectedAddressId = addr.id;
    this.shippingForm.patchValue({
      recipientName: addr.recipientName,
      city: addr.city,
      district: addr.district,
      label: addr.label,
    });
    this.shippingForm.markAllAsTouched();
  }

  clearAddressSelection(): void {
    this.selectedAddressId = null;
    this.shippingForm.reset();
  }

  applyCoupon(): void {
    this.couponError = false;
    if (!this.couponCode.trim()) {
      return;
    }
    const success = this.store.applyCoupon(this.couponCode.trim());
    if (!success) {
      this.couponError = true;
    }
  }

  removeCoupon(): void {
    this.store.clearCoupon();
    this.couponCode = '';
    this.couponError = false;
  }

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }

  checkout(): void {
    if (this.cartLines.length === 0) {
      return;
    }
    this.closeCart();
    this.currentStep.set(1);
    this.purchaseComplete = false;
  }

  nextStep(): void {
    if (this.currentStep() < 4) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1 && !this.purchaseComplete) {
      this.currentStep.update((s) => s - 1);
    }
  }

  viewHistory(): void {
    this.openHistory(true);
  }

  private openHistory(updateUrl: boolean): void {
    this.currentStep.set(0);
    this.showHistory.set(true);
    this.purchaseComplete = false;
    this.store.refreshOrders();
    if (updateUrl) {
      this.router.navigate(['/app/store'], { queryParams: { history: true } });
    }
  }

  closeCheckout(): void {
    this.currentStep.set(0);
    this.purchaseComplete = false;
    this.showHistory.set(false);
    if (this.route.snapshot.queryParamMap.has('history')) {
      this.router.navigate(['/app/store'], { replaceUrl: true });
    }
  }

  getOrderLines(order: Order) {
    return this.store.buildOrderLines(order, this.store.products(), this.store.emergencyKits());
  }

  confirmOrder(): void {
    if (this.cartLines.length === 0) {
      return;
    }
    this.processingPayment.set(true);
    this.store.checkoutWithStripe().subscribe({
      error: () => this.processingPayment.set(false),
    });
  }
}
