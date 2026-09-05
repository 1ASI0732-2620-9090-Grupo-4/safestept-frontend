import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { StatisticsData } from '../domain/model/statistics-data.entity';
import { StatisticsDataResource, StatisticsDataResponse } from './statistics-data-response';
import { StatisticsDataAssembler } from './statistics-data.assembler';
import { environment } from '../../../environments/environment';

export class StatisticsDataApiEndpoint extends BaseApiEndpoint<StatisticsData, StatisticsDataResource, StatisticsDataResponse, StatisticsDataAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.statisticsEndpointPath}/summary/me`, new StatisticsDataAssembler());
  }

  getStatistics(): Observable<StatisticsData> {
    return this.getAll().pipe(map(data => data[0]));
  }

}
