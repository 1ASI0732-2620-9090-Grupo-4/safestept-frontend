import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { LeaderboardEntry } from '../domain/model/leaderboard-entry.entity';
import { LeaderboardEntriesResponse, LeaderboardEntryResource } from './leaderboard-entries-response';
import { LeaderboardEntryAssembler } from './leaderboard-entry.assembler';
import { environment } from '../../../environments/environment';

export class LeaderboardEntriesApiEndpoint extends BaseApiEndpoint<LeaderboardEntry, LeaderboardEntryResource, LeaderboardEntriesResponse, LeaderboardEntryAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.gamificationEndpointPath}/leaderboard`, new LeaderboardEntryAssembler());
  }
}
