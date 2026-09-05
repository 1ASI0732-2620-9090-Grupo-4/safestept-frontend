import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { MissionsApiEndpoint } from './missions-api-endpoint';
import { BadgesApiEndpoint } from './badges-api-endpoint';
import { CoinTransactionsApiEndpoint } from './coin-transactions-api-endpoint';
import { LeaderboardEntriesApiEndpoint } from './leaderboard-entries-api-endpoint';
import { Mission } from '../domain/model/mission.entity';
import { Badge } from '../domain/model/badge.entity';
import { CoinTransaction } from '../domain/model/coin-transaction.entity';
import { LeaderboardEntry } from '../domain/model/leaderboard-entry.entity';
import { GamificationSummaryResource } from './gamification-summary.resource';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GamificationApi extends BaseApi {
  private readonly missionsEndpoint: MissionsApiEndpoint;
  private readonly badgesEndpoint: BadgesApiEndpoint;
  private readonly coinTransactionsEndpoint: CoinTransactionsApiEndpoint;
  private readonly leaderboardEndpoint: LeaderboardEntriesApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.missionsEndpoint = new MissionsApiEndpoint(http);
    this.badgesEndpoint = new BadgesApiEndpoint(http);
    this.coinTransactionsEndpoint = new CoinTransactionsApiEndpoint(http);
    this.leaderboardEndpoint = new LeaderboardEntriesApiEndpoint(http);
  }

  getMissions(): Observable<Mission[]> { return this.missionsEndpoint.getAll(); }
  getBadges(): Observable<Badge[]> { return this.badgesEndpoint.getAll(); }
  getCoinTransactions(): Observable<CoinTransaction[]> { return this.coinTransactionsEndpoint.getAll(); }
  getLeaderboard(): Observable<LeaderboardEntry[]> { return this.leaderboardEndpoint.getAll(); }
  getSummary(): Observable<GamificationSummaryResource> {
    return this.http.get<GamificationSummaryResource>(
      `${environment.platformProviderApiBaseUrl}${environment.gamificationEndpointPath}/summary/me`,
    );
  }
  createMission(mission: Mission): Observable<Mission> { return this.missionsEndpoint.create(mission); }
  updateMission(mission: Mission, id: string): Observable<Mission> { return this.missionsEndpoint.update(mission, id); }
  deleteMission(id: string): Observable<void> { return this.missionsEndpoint.delete(id); }
  createBadge(badge: Badge): Observable<Badge> { return this.badgesEndpoint.create(badge); }
  updateBadge(badge: Badge, id: string): Observable<Badge> { return this.badgesEndpoint.update(badge, id); }
  deleteBadge(id: string): Observable<void> { return this.badgesEndpoint.delete(id); }
  createCoinTransaction(transaction: CoinTransaction): Observable<CoinTransaction> { return this.coinTransactionsEndpoint.create(transaction); }
}
