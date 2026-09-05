import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { CartItem } from '../domain/model/cart-item.entity';
import { AddCartItemRequest, CartItemsResponse, CartItemResource, UpdateCartItemRequest } from './cart-items-response';
import { CartItemAssembler } from './cart-item.assembler';
import { environment } from '../../../environments/environment';

export class CartItemsApiEndpoint extends BaseApiEndpoint<CartItem, CartItemResource, CartItemsResponse, CartItemAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/cart/items`, new CartItemAssembler());
  }

  getMyCart(): Observable<CartItem[]> {
    return this.http.get<CartItemsResponse | CartItemResource[]>(`${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/cart/me`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((item) => this.assembler.toEntityFromResource(item));
        }
        if ('value' in response && Array.isArray(response.value)) {
          return response.value.map((item) => this.assembler.toEntityFromResource(item));
        }
        return this.assembler.toEntitiesFromResponse(response);
      }),
    );
  }

  addToCart(productId: string, quantity: number): Observable<CartItem> {
    const payload: AddCartItemRequest = { productId, quantity };
    return this.http.post<CartItemResource>(this.endpointUrl, payload).pipe(
      map((item) => this.assembler.toEntityFromResource(item)),
    );
  }

  updateQuantity(itemId: string, quantity: number): Observable<CartItem> {
    const payload: UpdateCartItemRequest = { quantity };
    return this.http.put<CartItemResource>(`${this.endpointUrl}/${itemId}`, payload).pipe(
      map((item) => this.assembler.toEntityFromResource(item)),
    );
  }
}
