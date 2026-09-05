import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { RecommendationEntry } from '../domain/model/recommendation-entry.entity';
import { RecommendationsResponse, RecommendationResource } from './recommendations-response';
import { RecommendationAssembler } from './recommendation.assembler';
import { environment } from '../../../environments/environment';

export class RecommendationsApiEndpoint extends BaseApiEndpoint<RecommendationEntry, RecommendationResource, RecommendationsResponse, RecommendationAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}/commerce/recommendations/me`, new RecommendationAssembler());
  }
}
