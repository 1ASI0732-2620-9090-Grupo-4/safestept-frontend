import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Mission } from '../domain/model/mission.entity';
import { MissionsResponse, MissionResource } from './missions-response';

export class MissionAssembler implements BaseAssembler<Mission, MissionResource, MissionsResponse> {
  toEntitiesFromResponse(response: MissionsResponse): Mission[] {
    return response.missions.map((r) => this.toEntityFromResource(r));
  }
  toEntityFromResource(resource: MissionResource): Mission { return new Mission({ ...resource }); }
  toResourceFromEntity(entity: Mission): MissionResource {
    return {
      id: entity.id,
      title: entity.title,
      cadence: entity.cadence,
      progress: entity.progress,
      goal: entity.goal,
      rewardXp: entity.rewardXp,
      rewardCoins: entity.rewardCoins,
      status: entity.status,
      instructions: entity.instructions,
      unlockRequirement: entity.unlockRequirement,
    };
  }
}
