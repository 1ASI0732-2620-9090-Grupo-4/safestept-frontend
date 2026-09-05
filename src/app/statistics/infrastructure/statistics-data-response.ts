import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { RecommendationResource } from './recommendations-response';
import { ProgressVisualResource } from './progress-visuals-response';
import { CertificateResource } from './certificates-response';

export interface StatisticsDataResource extends BaseResource<number> {
  recommendations: RecommendationResource[];
  progressVisuals: ProgressVisualResource[];
  certificates: CertificateResource[];
}

export interface StatisticsDataResponse extends BaseResponse, StatisticsDataResource {}
