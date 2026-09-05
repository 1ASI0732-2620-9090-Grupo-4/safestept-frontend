import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ProductReviewsResponse extends BaseResponse {
  reviews: ProductReviewResource[];
}

export interface ProductReviewResource extends BaseResource<string> {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
