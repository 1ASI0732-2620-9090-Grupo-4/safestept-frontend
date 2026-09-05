import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { StoreProductsApiEndpoint } from './store-products-api-endpoint';
import { CouponsApiEndpoint } from './coupons-api-endpoint';
import { ProductCategoriesApiEndpoint } from './product-categories-api-endpoint';
import { ProductReviewsApiEndpoint } from './product-reviews-api-endpoint';
import { OrdersApiEndpoint } from './orders-api-endpoint';
import { CartItemsApiEndpoint } from './cart-items-api-endpoint';
import { ShippingAddressesApiEndpoint } from './shipping-addresses-api-endpoint';
import { PaymentMethodsApiEndpoint } from './payment-methods-api-endpoint';
import { PersonalizedRecommendationsApiEndpoint } from './personalized-recommendations-api-endpoint';
import { EmergencyKitsApiEndpoint } from './emergency-kits-api-endpoint';
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
import { StripeCheckoutSessionResponse } from './orders-response';

@Injectable({ providedIn: 'root' })
export class EcommerceApi extends BaseApi {
  private readonly storeProductsEndpoint: StoreProductsApiEndpoint;
  private readonly couponsEndpoint: CouponsApiEndpoint;
  private readonly productCategoriesEndpoint: ProductCategoriesApiEndpoint;
  private readonly productReviewsEndpoint: ProductReviewsApiEndpoint;
  private readonly ordersEndpoint: OrdersApiEndpoint;
  private readonly cartItemsEndpoint: CartItemsApiEndpoint;
  private readonly shippingAddressesEndpoint: ShippingAddressesApiEndpoint;
  private readonly paymentMethodsEndpoint: PaymentMethodsApiEndpoint;
  private readonly personalizedRecommendationsEndpoint: PersonalizedRecommendationsApiEndpoint;
  private readonly emergencyKitsEndpoint: EmergencyKitsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.storeProductsEndpoint = new StoreProductsApiEndpoint(http);
    this.couponsEndpoint = new CouponsApiEndpoint(http);
    this.productCategoriesEndpoint = new ProductCategoriesApiEndpoint(http);
    this.productReviewsEndpoint = new ProductReviewsApiEndpoint(http);
    this.ordersEndpoint = new OrdersApiEndpoint(http);
    this.cartItemsEndpoint = new CartItemsApiEndpoint(http);
    this.shippingAddressesEndpoint = new ShippingAddressesApiEndpoint(http);
    this.paymentMethodsEndpoint = new PaymentMethodsApiEndpoint(http);
    this.personalizedRecommendationsEndpoint = new PersonalizedRecommendationsApiEndpoint(http);
    this.emergencyKitsEndpoint = new EmergencyKitsApiEndpoint(http);
  }

  getProducts(): Observable<StoreProduct[]> { return this.storeProductsEndpoint.getAll(); }
  getCoupons(): Observable<Coupon[]> { return this.couponsEndpoint.getAll(); }
  getCategories(): Observable<ProductCategory[]> { return this.productCategoriesEndpoint.getAll(); }
  getReviews(): Observable<ProductReview[]> { return this.productReviewsEndpoint.getAll(); }
  getOrders(): Observable<Order[]> { return this.ordersEndpoint.getMyOrders(); }
  getCartItems(): Observable<CartItem[]> { return this.cartItemsEndpoint.getMyCart(); }
  getShippingAddresses(): Observable<ShippingAddress[]> { return this.shippingAddressesEndpoint.getAll(); }
  getPaymentMethods(): Observable<PaymentMethod[]> { return this.paymentMethodsEndpoint.getAll(); }
  getRecommendations(): Observable<PersonalizedRecommendation[]> { return this.personalizedRecommendationsEndpoint.getAll(); }
  getEmergencyKits(): Observable<EmergencyKit[]> { return this.emergencyKitsEndpoint.getAll(); }
  createProduct(product: StoreProduct): Observable<StoreProduct> { return this.storeProductsEndpoint.create(product); }
  updateProduct(product: StoreProduct, id: string): Observable<StoreProduct> { return this.storeProductsEndpoint.update(product, id); }
  deleteProduct(id: string): Observable<void> { return this.storeProductsEndpoint.delete(id); }
  createCoupon(coupon: Coupon): Observable<Coupon> { return this.couponsEndpoint.create(coupon); }
  updateCoupon(coupon: Coupon, id: string): Observable<Coupon> { return this.couponsEndpoint.update(coupon, id); }
  deleteCoupon(id: string): Observable<void> { return this.couponsEndpoint.delete(id); }
  createOrder(_order: Order): Observable<Order> { return this.ordersEndpoint.createPendingOrder(); }
  createPendingOrder(): Observable<Order> { return this.ordersEndpoint.createPendingOrder(); }
  createStripeCheckoutSession(orderId: string): Observable<StripeCheckoutSessionResponse> { return this.ordersEndpoint.createStripeCheckoutSession(orderId); }
  confirmStripePayment(orderId: string, sessionId: string): Observable<Order> { return this.ordersEndpoint.confirmStripePayment(orderId, sessionId); }
  cancelStripePayment(orderId: string, sessionId: string | null): Observable<Order> { return this.ordersEndpoint.cancelStripePayment(orderId, sessionId); }
  updateOrder(order: Order, id: string): Observable<Order> { return this.ordersEndpoint.update(order, id); }
  deleteOrder(id: string): Observable<void> { return this.ordersEndpoint.delete(id); }
  createCartItem(item: CartItem): Observable<CartItem> { return this.cartItemsEndpoint.addToCart(item.productId, item.quantity); }
  updateCartItem(item: CartItem, id: string): Observable<CartItem> { return this.cartItemsEndpoint.updateQuantity(id, item.quantity); }
  deleteCartItem(id: string): Observable<void> { return this.cartItemsEndpoint.delete(id); }
}
