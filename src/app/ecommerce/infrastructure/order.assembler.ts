import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Order } from '../domain/model/order.entity';
import { OrderItemResource, OrdersResponse, OrderResource } from './orders-response';

export class OrderAssembler implements BaseAssembler<Order, OrderResource, OrdersResponse> {
  toEntitiesFromResponse(response: OrdersResponse): Order[] { return response.orders.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: OrderResource): Order {
    return new Order({
      ...resource,
      items: this.toProductIds(resource.items),
      paymentProvider: resource.paymentProvider,
      paymentStatus: resource.paymentStatus,
      stripeCheckoutSessionId: resource.stripeCheckoutSessionId,
      stripePaymentIntentId: resource.stripePaymentIntentId,
    });
  }
  toResourceFromEntity(entity: Order): OrderResource { return { id: entity.id, userId: entity.userId, total: entity.total, status: entity.status, items: [...entity.items], createdAt: entity.createdAt }; }

  private toProductIds(items: string[] | OrderItemResource[]): string[] {
    if (items.length === 0) return [];
    if (typeof items[0] === 'string') return [...items] as string[];
    return (items as OrderItemResource[]).flatMap((item) => Array(item.quantity).fill(item.productId));
  }
}
