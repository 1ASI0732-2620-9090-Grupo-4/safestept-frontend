import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { StoreProduct } from '../domain/model/store-product.entity';
import { StoreProductsResponse, StoreProductResource } from './store-products-response';
import { StoreProductAssembler } from './store-product.assembler';
import { environment } from '../../../environments/environment';

export class StoreProductsApiEndpoint extends BaseApiEndpoint<StoreProduct, StoreProductResource, StoreProductsResponse, StoreProductAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/products`, new StoreProductAssembler());
  }
}
