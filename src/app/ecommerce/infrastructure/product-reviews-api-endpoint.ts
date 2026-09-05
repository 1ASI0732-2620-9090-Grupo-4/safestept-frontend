import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ProductReview } from '../domain/model/product-review.entity';
import { ProductReviewsResponse, ProductReviewResource } from './product-reviews-response';
import { ProductReviewAssembler } from './product-review.assembler';
import { environment } from '../../../environments/environment';

export class ProductReviewsApiEndpoint extends BaseApiEndpoint<ProductReview, ProductReviewResource, ProductReviewsResponse, ProductReviewAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/reviews`, new ProductReviewAssembler());
  }
}
