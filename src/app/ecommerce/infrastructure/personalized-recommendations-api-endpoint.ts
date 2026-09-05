import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { PersonalizedRecommendation } from '../domain/model/personalized-recommendation.entity';
import { PersonalizedRecommendationsResponse, PersonalizedRecommendationResource } from './personalized-recommendations-response';
import { PersonalizedRecommendationAssembler } from './personalized-recommendation.assembler';
import { environment } from '../../../environments/environment';

export class PersonalizedRecommendationsApiEndpoint extends BaseApiEndpoint<PersonalizedRecommendation, PersonalizedRecommendationResource, PersonalizedRecommendationsResponse, PersonalizedRecommendationAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/recommendations/me`, new PersonalizedRecommendationAssembler());
  }
}
