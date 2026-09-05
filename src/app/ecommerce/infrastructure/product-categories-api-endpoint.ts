import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ProductCategory } from '../domain/model/product-category.entity';
import { ProductCategoriesResponse, ProductCategoryResource } from './product-categories-response';
import { ProductCategoryAssembler } from './product-category.assembler';
import { environment } from '../../../environments/environment';

export class ProductCategoriesApiEndpoint extends BaseApiEndpoint<ProductCategory, ProductCategoryResource, ProductCategoriesResponse, ProductCategoryAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/categories`, new ProductCategoryAssembler());
  }
}
