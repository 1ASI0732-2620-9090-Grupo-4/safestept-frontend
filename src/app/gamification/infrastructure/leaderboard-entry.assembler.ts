import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { LeaderboardEntry } from '../domain/model/leaderboard-entry.entity';
import { LeaderboardEntriesResponse, LeaderboardEntryResource } from './leaderboard-entries-response';

export class LeaderboardEntryAssembler implements BaseAssembler<LeaderboardEntry, LeaderboardEntryResource, LeaderboardEntriesResponse> {
  toEntitiesFromResponse(response: LeaderboardEntriesResponse): LeaderboardEntry[] {
    return response.leaderboard.map((r) => this.toEntityFromResource(r));
  }
  toEntityFromResource(resource: LeaderboardEntryResource): LeaderboardEntry { return new LeaderboardEntry({ ...resource, id: resource.name }); }
  toResourceFromEntity(entity: LeaderboardEntry): LeaderboardEntryResource {
    return {
      id: entity.id,
      rank: entity.rank,
      name: entity.name,
      xp: entity.xp,
      streak: entity.streak,
    };
  }
}
