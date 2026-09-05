import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Badge } from '../domain/model/badge.entity';
import { BadgesResponse, BadgeResource } from './badges-response';

export class BadgeAssembler implements BaseAssembler<Badge, BadgeResource, BadgesResponse> {
  toEntitiesFromResponse(response: BadgesResponse): Badge[] {
    return response.badges.map((r) => this.toEntityFromResource(r));
  }
  toEntityFromResource(resource: BadgeResource): Badge { return new Badge({ ...resource }); }
  toResourceFromEntity(entity: Badge): BadgeResource {
    return {
      id: entity.id,
      name: entity.name,
      rarity: entity.rarity,
      unlocked: entity.unlocked,
      description: entity.description,
      unlockRequirement: entity.unlockRequirement,
    };
  }
}
