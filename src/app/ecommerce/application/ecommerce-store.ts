import { DestroyRef, Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, catchError, finalize, map, retry, switchMap, tap, throwError } from 'rxjs';
import { StoreProduct } from '../domain/model/store-product.entity';
import { Coupon } from '../domain/model/coupon.entity';
import { ProductCategory } from '../domain/model/product-category.entity';
import { ProductReview } from '../domain/model/product-review.entity';
import { Order } from '../domain/model/order.entity';
import { CartItem } from '../domain/model/cart-item.entity';
import { ShippingAddress } from '../domain/model/shipping-address.entity';
import { PaymentMethod } from '../domain/model/payment-method.entity';
import { PersonalizedRecommendation } from '../domain/model/personalized-recommendation.entity';
import { EmergencyKit } from '../domain/model/emergency-kit.entity';
import { EcommerceApi } from '../infrastructure/ecommerce-api';

type CartLine = {
  item: CartItem;
  product: StoreProduct;
  subtotal: number;
};

type OrderLine = {
  product: StoreProduct;
  quantity: number;
  subtotal: number;
};

@Injectable({ providedIn: 'root' })
export class EcommerceStore {
  private readonly productsSignal = signal<StoreProduct[]>([]);
  private readonly couponsSignal = signal<Coupon[]>([]);
  private readonly categoriesSignal = signal<ProductCategory[]>([]);
  private readonly reviewsSignal = signal<ProductReview[]>([]);
  private readonly ordersSignal = signal<Order[]>([]);
  private readonly cartItemsSignal = signal<CartItem[]>([]);
  private readonly shippingAddressesSignal = signal<ShippingAddress[]>([]);
  private readonly paymentMethodsSignal = signal<PaymentMethod[]>([]);
  private readonly recommendationsSignal = signal<PersonalizedRecommendation[]>([]);
  private readonly emergencyKitsSignal = signal<EmergencyKit[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly appliedCouponSignal = signal<Coupon | null>(null);

  readonly products = this.productsSignal.asReadonly();
  readonly coupons = this.couponsSignal.asReadonly();
  readonly categories = this.categoriesSignal.asReadonly();
  readonly reviews = this.reviewsSignal.asReadonly();
  readonly orders = this.ordersSignal.asReadonly();
  readonly cartItems = this.cartItemsSignal.asReadonly();
  readonly shippingAddresses = this.shippingAddressesSignal.asReadonly();
  readonly paymentMethods = this.paymentMethodsSignal.asReadonly();
  readonly recommendations = this.recommendationsSignal.asReadonly();
  readonly emergencyKits = this.emergencyKitsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly appliedCoupon = this.appliedCouponSignal.asReadonly();

  readonly productCount = computed(() => this.products().length);
  readonly orderCount = computed(() => this.orders().length);
  readonly cartItemCount = computed(() => this.cartItems().length);

  constructor(
    private ecommerceApi: EcommerceApi,
    private destroyRef: DestroyRef,
  ) {
    this.loadProducts();
    this.loadCoupons();
    this.loadCategories();
    this.loadReviews();
    this.loadOrders();
    this.loadCartItems();
    this.loadShippingAddresses();
    this.loadPaymentMethods();
    this.loadRecommendations();
    this.loadEmergencyKits();
  }

  addProduct(product: StoreProduct): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.createProduct(product).pipe(retry(2)).subscribe({
      next: (created) => {
        this.productsSignal.update((list) => [...list, created]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to create product'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateProduct(product: StoreProduct, id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.updateProduct(product, id).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.productsSignal.update((list) => list.map((p) => (p.id === id ? updated : p)));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update product'));
        this.loadingSignal.set(false);
      },
    });
  }

  deleteProduct(id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.deleteProduct(id).pipe(retry(2)).subscribe({
      next: () => {
        this.productsSignal.update((list) => list.filter((p) => p.id !== id));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete product'));
        this.loadingSignal.set(false);
      },
    });
  }

  addCoupon(coupon: Coupon): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.createCoupon(coupon).pipe(retry(2)).subscribe({
      next: (created) => {
        this.couponsSignal.update((list) => [...list, created]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to create coupon'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateCoupon(coupon: Coupon, id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.updateCoupon(coupon, id).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.couponsSignal.update((list) => list.map((item) => item.id === id ? updated : item));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update coupon'));
        this.loadingSignal.set(false);
      },
    });
  }

  deleteCoupon(id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.deleteCoupon(id).pipe(retry(2)).subscribe({
      next: () => {
        this.couponsSignal.update((list) => list.filter((item) => item.id !== id));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete coupon'));
        this.loadingSignal.set(false);
      },
    });
  }

  getProductById(id: string | null): StoreProduct | undefined {
    return this.products().find((product) => product.id === id);
  }

  getCouponById(id: string | null): Coupon | undefined {
    return this.coupons().find((coupon) => coupon.id === id);
  }

  getCouponByTitle(title: string): Coupon | undefined {
    return this.coupons().find((c) => c.title.toLowerCase() === title.toLowerCase());
  }

  applyCoupon(title: string): boolean {
    const coupon = this.getCouponByTitle(title);
    if (coupon) {
      this.appliedCouponSignal.set(coupon);
      return true;
    }
    return false;
  }

  clearCoupon(): void {
    this.appliedCouponSignal.set(null);
  }

  calculateDiscount(total: number): number {
    const coupon = this.appliedCouponSignal();
    if (!coupon) {
      return 0;
    }
    const discount = coupon.discount.trim();
    if (discount.includes('%')) {
      const pct = parseFloat(discount.replace('%', '').trim());
      return total * (pct / 100);
    }
    const fixed = parseFloat(discount.replace(/[^0-9.]/g, ''));
    return Math.min(fixed, total);
  }

  addOrder(order: Order): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.createOrder(order).subscribe({
      next: (created) => {
        this.ordersSignal.update((list) => [created, ...list]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to create order'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateOrder(order: Order, id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.updateOrder(order, id).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.ordersSignal.update((list) => list.map((o) => (o.id === id ? updated : o)));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update order'));
        this.loadingSignal.set(false);
      },
    });
  }

  deleteOrder(id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.deleteOrder(id).pipe(retry(2)).subscribe({
      next: () => {
        this.ordersSignal.update((list) => list.filter((o) => o.id !== id));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete order'));
        this.loadingSignal.set(false);
      },
    });
  }

  refreshOrders(): void {
    this.loadOrders();
  }

  addCartItem(item: CartItem): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.createCartItem(item).subscribe({
      next: (created) => {
        this.cartItemsSignal.update((list) => {
          const existing = list.find((cartItem) => cartItem.id === created.id);
          return existing ? list.map((cartItem) => cartItem.id === created.id ? created : cartItem) : [...list, created];
        });
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to add cart item'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateCartItem(item: CartItem, id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.updateCartItem(item, id).subscribe({
      next: (updated) => {
        this.cartItemsSignal.update((list) => list.map((c) => (c.id === id ? updated : c)));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to update cart item'));
        this.loadingSignal.set(false);
      },
    });
  }

  deleteCartItem(id: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.deleteCartItem(id).pipe(retry(2)).subscribe({
      next: () => {
        this.cartItemsSignal.update((list) => list.filter((c) => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete cart item'));
        this.loadingSignal.set(false);
      },
    });
  }

  checkoutWithStripe(): Observable<string> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    return this.ecommerceApi.createPendingOrder().pipe(
      tap((order) => this.ordersSignal.update((list) => [order, ...list.filter((item) => item.id !== order.id)])),
      switchMap((order) => this.ecommerceApi.createStripeCheckoutSession(order.id)),
      tap((session) => {
        window.location.href = session.sessionUrl;
      }),
      map((session) => session.sessionUrl),
      catchError((err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to start Stripe checkout'));
        return throwError(() => err);
      }),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  confirmStripePayment(orderId: string, sessionId: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.confirmStripePayment(orderId, sessionId).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.ordersSignal.update((list) => [updated, ...list.filter((order) => order.id !== updated.id)]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to confirm Stripe payment'));
        this.loadOrders();
      },
    });
  }

  cancelStripePayment(orderId: string, sessionId: string | null): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.cancelStripePayment(orderId, sessionId).pipe(retry(2)).subscribe({
      next: (updated) => {
        this.ordersSignal.update((list) => [updated, ...list.filter((order) => order.id !== updated.id)]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to cancel Stripe payment'));
        this.loadOrders();
      },
    });
  }

  getRelevantProducts(products: StoreProduct[], recommendations: PersonalizedRecommendation[]): StoreProduct[] {
    const recommendedIds = recommendations.map((recommendation) => recommendation.productId);
    const recommended = products.filter((product) => recommendedIds.includes(product.id));
    const popular = products.filter((product) => product.isPopular || product.tags.includes('Bestseller'));

    return this.mergeProducts(recommended, popular, products).slice(0, 8);
  }

  getFeaturedProducts(products: StoreProduct[]): StoreProduct[] {
    return products.slice(0, 3);
  }

  filterProducts(products: StoreProduct[], category: string, query: string): StoreProduct[] {
    const searchQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

      return matchesCategory && matchesQuery;
    });
  }

  filterEmergencyKits(kits: EmergencyKit[], category: string, query: string): EmergencyKit[] {
    if (category !== 'Kits') {
      return [];
    }

    const searchQuery = query.trim().toLowerCase();

    return kits.filter((kit) => {
      return (
        !searchQuery ||
        kit.name.toLowerCase().includes(searchQuery) ||
        kit.description.toLowerCase().includes(searchQuery) ||
        kit.level.toLowerCase().includes(searchQuery)
      );
    });
  }

  getCartItemsForUser(items: CartItem[], userId: string): CartItem[] {
    return items.filter((item) => item.userId === userId);
  }

  getCartItemForProduct(items: CartItem[], userId: string, productId: string): CartItem | undefined {
    return items.find((item) => item.userId === userId && item.productId === productId);
  }

  getCartItemCount(items: CartItem[]): number {
    let total = 0;

    items.forEach((item) => {
      total += item.quantity;
    });

    return total;
  }

  buildCartLines(items: CartItem[], products: StoreProduct[], kits: EmergencyKit[]): CartLine[] {
    return items
      .map((item) => {
        const product = this.findCatalogItem(item.productId, products, kits);
        return product ? { item, product, subtotal: product.price * item.quantity } : null;
      })
      .filter((line): line is CartLine => Boolean(line));
  }

  getCartTotal(lines: CartLine[]): number {
    let total = 0;

    lines.forEach((line) => {
      total += line.subtotal;
    });

    return total;
  }

  getProductImages(product: StoreProduct | null): string[] {
    if (!product) {
      return [];
    }

    return [product.imageUrl, ...(product.images ?? [])].filter(Boolean);
  }

  getProductReviews(product: StoreProduct | null, reviews: ProductReview[]): ProductReview[] {
    if (!product) {
      return [];
    }

    return reviews.filter((review) => review.productId === product.id);
  }

  getUserOrders(orders: Order[], userId: string): Order[] {
    return orders
      .filter((order) => order.userId === userId && this.isPaidOrder(order))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  private isPaidOrder(order: Order): boolean {
    const paymentStatus = (order.paymentStatus ?? '').trim().toUpperCase();
    const orderStatus = (order.status ?? '').trim().toUpperCase();

    return (
      paymentStatus === 'PAID' ||
      orderStatus === 'PAID' ||
      orderStatus === 'SHIPPED' ||
      orderStatus === 'DELIVERED' ||
      Boolean(order.stripePaymentIntentId)
    );
  }

  buildOrderLines(order: Order, products: StoreProduct[], kits: EmergencyKit[]): OrderLine[] {
    const quantities: Record<string, number> = {};

    order.items.forEach((productId) => {
      const currentQuantity = quantities[productId] ?? 0;
      quantities[productId] = currentQuantity + 1;
    });

    return Object.entries(quantities)
      .map(([productId, quantity]) => {
        const product = this.findCatalogItem(productId, products, kits);
        return product ? { product, quantity, subtotal: product.price * quantity } : null;
      })
      .filter((line): line is OrderLine => Boolean(line));
  }

  findCatalogItem(itemId: string, products: StoreProduct[], kits: EmergencyKit[]): StoreProduct | null {
    const product = products.find((candidate) => candidate.id === itemId);
    if (product) {
      return product;
    }

    const kit = kits.find((candidate) => candidate.id === itemId);
    if (!kit) {
      return null;
    }

    return this.toStoreProductFromKit(kit);
  }

  toStoreProductFromKit(kit: EmergencyKit): StoreProduct {
    return new StoreProduct({
      id: kit.id,
      name: kit.name,
      category: 'Kits',
      type: 'Kit',
      price: kit.kitPrice,
      oldPrice: kit.individualPrice,
      rating: 4.8,
      stock: 20,
      imageUrl: kit.imageUrl,
      tags: [kit.level, 'Kit'],
      description: kit.description,
      recommendedFor: ['Emergencias'],
      isPopular: kit.isPopular,
    });
  }

  private mergeProducts(...groups: StoreProduct[][]): StoreProduct[] {
    const merged: StoreProduct[] = [];

    groups.forEach((group) => {
      group.forEach((product) => {
        const alreadyAdded = merged.find((item) => item.id === product.id);
        if (!alreadyAdded) {
          merged.push(product);
        }
      });
    });

    return merged;
  }

  private loadProducts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (products) => {
        this.productsSignal.set(products);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load products'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadCoupons(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getCoupons().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (coupons) => {
        this.couponsSignal.set(coupons);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load coupons'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadCategories(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (categories) => {
        this.categoriesSignal.set(categories);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load categories'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadReviews(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getReviews().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (reviews) => {
        this.reviewsSignal.set(reviews);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.loadingSignal.set(false);
      },
    });
  }

  private loadOrders(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getOrders().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (orders) => {
        this.ordersSignal.set(orders);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load orders'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadCartItems(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getCartItems().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (items) => {
        this.cartItemsSignal.set(items);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load cart items'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadShippingAddresses(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getShippingAddresses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (addresses) => {
        this.shippingAddressesSignal.set(addresses);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load shipping addresses'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadPaymentMethods(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getPaymentMethods().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (methods) => {
        this.paymentMethodsSignal.set(methods);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.paymentMethodsSignal.set([]);
        this.loadingSignal.set(false);
      },
    });
  }

  private loadRecommendations(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getRecommendations().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (recommendations) => {
        this.recommendationsSignal.set(recommendations);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.loadingSignal.set(false);
      },
    });
  }

  private loadEmergencyKits(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.ecommerceApi.getEmergencyKits().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (kits) => {
        this.emergencyKitsSignal.set(kits);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(this.formatError(err, 'Failed to load emergency kits'));
        this.loadingSignal.set(false);
      },
    });
  }

  private formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}
