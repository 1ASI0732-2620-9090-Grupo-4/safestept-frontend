import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { PersonalizedRecommendation } from '../domain/model/personalized-recommendation.entity';
import { PersonalizedRecommendationsResponse, PersonalizedRecommendationResource } from './personalized-recommendations-response';

export class PersonalizedRecommendationAssembler implements BaseAssembler<PersonalizedRecommendation, PersonalizedRecommendationResource, PersonalizedRecommendationsResponse> {
  toEntitiesFromResponse(response: PersonalizedRecommendationsResponse): PersonalizedRecommendation[] { return response.personalizedRecommendations.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: PersonalizedRecommendationResource): PersonalizedRecommendation { return new PersonalizedRecommendation({ ...resource }); }
  toResourceFromEntity(entity: PersonalizedRecommendation): PersonalizedRecommendationResource { return { id: entity.id, userId: entity.userId, productId: entity.productId, reason: entity.reason, relatedSimulationId: entity.relatedSimulationId, priority: entity.priority, isDismissed: entity.isDismissed }; }
}
