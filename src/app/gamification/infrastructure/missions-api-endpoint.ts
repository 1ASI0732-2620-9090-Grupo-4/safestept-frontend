import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Mission } from '../domain/model/mission.entity';
import { MissionsResponse, MissionResource } from './missions-response';
import { MissionAssembler } from './mission.assembler';
import { environment } from '../../../environments/environment';

export class MissionsApiEndpoint extends BaseApiEndpoint<Mission, MissionResource, MissionsResponse, MissionAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.gamificationEndpointPath}/missions`, new MissionAssembler());
  }
}
