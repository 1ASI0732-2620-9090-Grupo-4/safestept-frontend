import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface PersonalizedRecommendationsResponse extends BaseResponse {
  personalizedRecommendations: PersonalizedRecommendationResource[];
}

export interface PersonalizedRecommendationResource extends BaseResource<string> {
  userId: string;
  productId: string;
  reason: string;
  relatedSimulationId: string;
  priority: string;
  isDismissed: boolean;
}
