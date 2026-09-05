import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ProductCategoriesResponse extends BaseResponse {
  categories: ProductCategoryResource[];
}

export interface ProductCategoryResource extends BaseResource<string> {
  name: string;
  productCount?: number;
}
