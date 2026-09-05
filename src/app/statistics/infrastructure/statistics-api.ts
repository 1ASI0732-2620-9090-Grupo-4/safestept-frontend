import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { StatisticsDataApiEndpoint } from './statistics-data-api-endpoint';
import { RecommendationsApiEndpoint } from './recommendations-api-endpoint';
import { ProgressVisualsApiEndpoint } from './progress-visuals-api-endpoint';
import { CertificatesApiEndpoint } from './certificates-api-endpoint';
import { StatisticsData } from '../domain/model/statistics-data.entity';
import { RecommendationEntry } from '../domain/model/recommendation-entry.entity';
import { ProgressVisualEntry } from '../domain/model/progress-visual-entry.entity';
import { CertificateEntry } from '../domain/model/certificate-entry.entity';

@Injectable({ providedIn: 'root' })
export class StatisticsApi extends BaseApi {
  private readonly statisticsDataEndpoint: StatisticsDataApiEndpoint;
  private readonly recommendationsEndpoint: RecommendationsApiEndpoint;
  private readonly progressVisualsEndpoint: ProgressVisualsApiEndpoint;
  private readonly certificatesEndpoint: CertificatesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.statisticsDataEndpoint = new StatisticsDataApiEndpoint(http);
    this.recommendationsEndpoint = new RecommendationsApiEndpoint(http);
    this.progressVisualsEndpoint = new ProgressVisualsApiEndpoint(http);
    this.certificatesEndpoint = new CertificatesApiEndpoint(http);
  }

  getStatistics(): Observable<StatisticsData> { return this.statisticsDataEndpoint.getStatistics(); }

  getRecommendations(): Observable<RecommendationEntry[]> { return this.recommendationsEndpoint.getAll(); }
  getProgressVisuals(): Observable<ProgressVisualEntry[]> { return this.progressVisualsEndpoint.getAll(); }
  getCertificates(): Observable<CertificateEntry[]> { return this.certificatesEndpoint.getAll(); }
}
