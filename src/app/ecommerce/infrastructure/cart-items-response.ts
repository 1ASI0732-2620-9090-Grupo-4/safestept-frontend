import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CartItemsResponse extends BaseResponse {
  cartItems: CartItemResource[];
}

export interface CartItemResource extends BaseResource<string> {
  userId: string;
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface AddCartItemRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
