import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ProductReview } from '../domain/model/product-review.entity';
import { ProductReviewsResponse, ProductReviewResource } from './product-reviews-response';

export class ProductReviewAssembler implements BaseAssembler<ProductReview, ProductReviewResource, ProductReviewsResponse> {
  toEntitiesFromResponse(response: ProductReviewsResponse): ProductReview[] { return response.reviews.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: ProductReviewResource): ProductReview { return new ProductReview({ ...resource }); }
  toResourceFromEntity(entity: ProductReview): ProductReviewResource { return { id: entity.id, productId: entity.productId, userName: entity.userName, rating: entity.rating, comment: entity.comment, createdAt: entity.createdAt }; }
}
