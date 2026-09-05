import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ProductCategory } from '../domain/model/product-category.entity';
import { ProductCategoriesResponse, ProductCategoryResource } from './product-categories-response';

export class ProductCategoryAssembler implements BaseAssembler<ProductCategory, ProductCategoryResource, ProductCategoriesResponse> {
  toEntitiesFromResponse(response: ProductCategoriesResponse): ProductCategory[] { return response.categories.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: ProductCategoryResource): ProductCategory { return new ProductCategory({ ...resource, productCount: resource.productCount ?? 0 }); }
  toResourceFromEntity(entity: ProductCategory): ProductCategoryResource { return { id: entity.id, name: entity.name, productCount: entity.productCount }; }
}
