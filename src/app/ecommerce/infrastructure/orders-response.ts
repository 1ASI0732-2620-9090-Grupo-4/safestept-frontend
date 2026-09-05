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
}

export interface CreateOrderRequest {
  status: string;
}

export interface StripeCheckoutSessionResponse {
  sessionUrl: string;
  sessionId: string;
}
