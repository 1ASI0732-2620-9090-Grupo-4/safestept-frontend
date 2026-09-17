import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface OrdersResponse extends BaseResponse {
  orders: OrderResource[];
}

export interface OrderItemResource {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderResource extends BaseResource<string> {
  userId: string;
  total: number;
  status: string;
  paymentProvider?: string | null;
  paymentStatus?: string | null;
  stripeCheckoutSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  items: string[] | OrderItemResource[];
  createdAt: string;
  finalTotal?: number | null;
  appliedDiscountPercentage?: number | null;
  redeemedCouponExternalId?: string | null;
}

export interface CreateOrderRequest {
  status: string;
  redeemedCouponExternalId?: string | null;
}

export interface StripeCheckoutSessionResponse {
  sessionUrl: string;
  sessionId: string;
}
