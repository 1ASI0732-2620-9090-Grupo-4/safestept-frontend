import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ProgressVisualEntry } from '../domain/model/progress-visual-entry.entity';
import { ProgressVisualsResponse, ProgressVisualResource } from './progress-visuals-response';
import { ProgressVisualAssembler } from './progress-visual.assembler';
import { environment } from '../../../environments/environment';

export class ProgressVisualsApiEndpoint extends BaseApiEndpoint<ProgressVisualEntry, ProgressVisualResource, ProgressVisualsResponse, ProgressVisualAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.statisticsEndpointPath}/progress/me`, new ProgressVisualAssembler());
  }
}
