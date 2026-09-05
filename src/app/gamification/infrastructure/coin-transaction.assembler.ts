import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { CoinTransaction } from '../domain/model/coin-transaction.entity';
import { CoinTransactionsResponse, CoinTransactionResource } from './coin-transactions-response';

export class CoinTransactionAssembler implements BaseAssembler<CoinTransaction, CoinTransactionResource, CoinTransactionsResponse> {
  toEntitiesFromResponse(response: CoinTransactionsResponse): CoinTransaction[] {
    return response.coinTransactions.map((r) => this.toEntityFromResource(r));
  }
  toEntityFromResource(resource: CoinTransactionResource): CoinTransaction { return new CoinTransaction({ ...resource }); }
  toResourceFromEntity(entity: CoinTransaction): CoinTransactionResource {
    return {
      id: entity.id,
      userId: entity.userId,
      simulationId: entity.simulationId,
      simulationTitle: entity.simulationTitle,
      attemptNumber: entity.attemptNumber,
      successfulAttemptNumber: entity.successfulAttemptNumber,
      baseCoins: entity.baseCoins,
      multiplier: entity.multiplier,
      accuracy: entity.accuracy,
      earnedCoins: entity.earnedCoins,
      successful: entity.successful,
      createdAt: entity.createdAt,
    };
  }
}
