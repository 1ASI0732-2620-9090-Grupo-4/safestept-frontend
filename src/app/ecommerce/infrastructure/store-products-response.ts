import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface StoreProductsResponse extends BaseResponse {
  products: StoreProductResource[];
}

export interface StoreProductResource extends BaseResource<string> {
  name: string;
  category: string;
  type: 'Producto' | 'Kit' | 'PRODUCT' | 'KIT' | string;
  price: number;
  oldPrice?: number;
  rating: number;
  stock: number;
  imageUrl: string;
  tags: string[];
  description: string;
  recommendedFor?: string[];
  longDescription?: string;
  images?: string[];
  specifications?: Record<string, string>;
  isPopular?: boolean;
}
