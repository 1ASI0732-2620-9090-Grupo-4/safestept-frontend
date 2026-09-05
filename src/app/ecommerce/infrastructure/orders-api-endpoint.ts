import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Order } from '../domain/model/order.entity';
import { CreateOrderRequest, OrdersResponse, OrderResource, StripeCheckoutSessionResponse } from './orders-response';
import { OrderAssembler } from './order.assembler';
import { environment } from '../../../environments/environment';

export class OrdersApiEndpoint extends BaseApiEndpoint<Order, OrderResource, OrdersResponse, OrderAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/orders`, new OrderAssembler());
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<OrdersResponse | OrderResource[]>(`${this.endpointUrl}/me`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((order) => this.assembler.toEntityFromResource(order));
        }
        if ('value' in response && Array.isArray(response.value)) {
          return response.value.map((order) => this.assembler.toEntityFromResource(order));
        }
        return this.assembler.toEntitiesFromResponse(response);
      }),
    );
  }

  createPendingOrder(): Observable<Order> {
    const payload: CreateOrderRequest = { status: 'PENDING' };
    return this.http.post<OrderResource>(this.endpointUrl, payload).pipe(
      map((order) => this.assembler.toEntityFromResource(order)),
    );
  }

  createStripeCheckoutSession(orderId: string): Observable<StripeCheckoutSessionResponse> {
    return this.http.post<StripeCheckoutSessionResponse>(`${this.endpointUrl}/${orderId}/payments/stripe-checkout`, {});
  }

  confirmStripePayment(orderId: string, sessionId: string): Observable<Order> {
    return this.http.post<OrderResource>(
      `${this.endpointUrl}/${orderId}/payments/stripe-confirm`,
      {},
      { params: { sessionId } },
    ).pipe(
      map((order) => this.assembler.toEntityFromResource(order)),
    );
  }

  cancelStripePayment(orderId: string, sessionId: string | null): Observable<Order> {
    const options = sessionId ? { params: { sessionId } } : {};
    return this.http.post<OrderResource>(`${this.endpointUrl}/${orderId}/payments/stripe-cancel`, {}, options).pipe(
      map((order) => this.assembler.toEntityFromResource(order)),
    );
  }
}
