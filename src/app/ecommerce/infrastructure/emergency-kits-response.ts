import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface EmergencyKitsResponse extends BaseResponse {
  emergencyKits: EmergencyKitResource[];
}

export interface EmergencyKitResource extends BaseResource<string> {
  name: string;
  description: string;
  level: string;
  individualPrice: number;
  kitPrice: number;
  savings: number;
  savingsPercentage: number;
  products: Array<{ productId: string; quantity: number }>;
  imageUrl: string;
  isPopular: boolean;
}
