import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { CoinTransaction } from '../domain/model/coin-transaction.entity';
import { CoinTransactionsResponse, CoinTransactionResource } from './coin-transactions-response';
import { CoinTransactionAssembler } from './coin-transaction.assembler';
import { environment } from '../../../environments/environment';

export class CoinTransactionsApiEndpoint extends BaseApiEndpoint<CoinTransaction, CoinTransactionResource, CoinTransactionsResponse, CoinTransactionAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.gamificationEndpointPath}/coin-transactions/me`, new CoinTransactionAssembler());
  }
}
