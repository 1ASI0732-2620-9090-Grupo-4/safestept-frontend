import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RecommendationsResponse extends BaseResponse {
  recommendations: RecommendationResource[];
}

export interface RecommendationResource extends BaseResource<string> {
  title: string;
  action: string;
  priority: string;
}
