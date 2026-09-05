import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface LeaderboardEntriesResponse extends BaseResponse {
  leaderboard: LeaderboardEntryResource[];
}

export interface LeaderboardEntryResource extends BaseResource<string> {
  rank: number;
  name: string;
  xp: number;
  streak: number;
}
