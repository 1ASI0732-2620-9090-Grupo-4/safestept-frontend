import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CoinTransactionsResponse extends BaseResponse {
  coinTransactions: CoinTransactionResource[];
}

export interface CoinTransactionResource extends BaseResource<string> {
  userId: string;
  simulationId: string;
  simulationTitle: string;
  attemptNumber: number;
  successfulAttemptNumber: number;
  baseCoins: number;
  multiplier: number;
  accuracy: number;
  earnedCoins: number;
  successful: boolean;
  createdAt: string;
}
