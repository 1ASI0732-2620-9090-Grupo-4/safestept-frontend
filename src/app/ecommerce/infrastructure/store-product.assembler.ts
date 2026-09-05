import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { StoreProduct } from '../domain/model/store-product.entity';
import { StoreProductsResponse, StoreProductResource } from './store-products-response';

export class StoreProductAssembler implements BaseAssembler<StoreProduct, StoreProductResource, StoreProductsResponse> {
  toEntitiesFromResponse(response: StoreProductsResponse): StoreProduct[] {
    return response.products.map((r) => this.toEntityFromResource(r));
  }
  toEntityFromResource(resource: StoreProductResource): StoreProduct {
    return new StoreProduct({
      id: resource.id,
      name: resource.name,
      category: resource.category,
      type: resource.type === 'KIT' || resource.type === 'Kit' ? 'Kit' : 'Producto',
      price: resource.price,
      oldPrice: resource.oldPrice,
      rating: resource.rating,
      stock: resource.stock,
      imageUrl: resource.imageUrl,
      tags: [...(resource.tags ?? [])],
      description: resource.description,
      recommendedFor: [...(resource.recommendedFor ?? [])],
      longDescription: resource.longDescription,
      images: resource.images ? [...resource.images] : undefined,
      specifications: resource.specifications ? { ...resource.specifications } : undefined,
      isPopular: resource.isPopular,
    });
  }
  toResourceFromEntity(entity: StoreProduct): StoreProductResource {
    return {
      id: entity.id,
      name: entity.name,
      category: entity.category,
      type: entity.type,
      price: entity.price,
      oldPrice: entity.oldPrice,
      rating: entity.rating,
      stock: entity.stock,
      imageUrl: entity.imageUrl,
      tags: [...entity.tags],
      description: entity.description,
      recommendedFor: [...entity.recommendedFor],
      longDescription: entity.longDescription,
      images: entity.images ? [...entity.images] : undefined,
      specifications: entity.specifications ? { ...entity.specifications } : undefined,
      isPopular: entity.isPopular,
    };
  }
}
