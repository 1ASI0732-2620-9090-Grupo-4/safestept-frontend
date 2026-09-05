import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RecommendationEntry } from '../domain/model/recommendation-entry.entity';
import { RecommendationsResponse, RecommendationResource } from './recommendations-response';

export class RecommendationAssembler implements BaseAssembler<RecommendationEntry, RecommendationResource, RecommendationsResponse> {
  toEntitiesFromResponse(response: RecommendationsResponse): RecommendationEntry[] {
    return response.recommendations.map((r) => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: RecommendationResource): RecommendationEntry {
    return new RecommendationEntry({ ...resource });
  }

  toResourceFromEntity(entity: RecommendationEntry): RecommendationResource {
    return {
      id: entity.id,
      title: entity.title,
      action: entity.action,
      priority: entity.priority,
    };
  }
}
