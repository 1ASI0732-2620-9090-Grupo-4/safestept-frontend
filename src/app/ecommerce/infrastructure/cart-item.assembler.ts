import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { CartItem } from '../domain/model/cart-item.entity';
import { CartItemsResponse, CartItemResource } from './cart-items-response';

export class CartItemAssembler implements BaseAssembler<CartItem, CartItemResource, CartItemsResponse> {
  toEntitiesFromResponse(response: CartItemsResponse): CartItem[] { return response.cartItems.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: CartItemResource): CartItem { return new CartItem({ ...resource }); }
  toResourceFromEntity(entity: CartItem): CartItemResource { return { id: entity.id, userId: entity.userId, productId: entity.productId, quantity: entity.quantity, addedAt: entity.addedAt }; }
}
