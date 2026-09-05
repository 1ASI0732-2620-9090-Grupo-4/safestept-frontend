import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { EmergencyKit } from '../domain/model/emergency-kit.entity';
import { EmergencyKitsResponse, EmergencyKitResource } from './emergency-kits-response';
import { EmergencyKitAssembler } from './emergency-kit.assembler';
import { environment } from '../../../environments/environment';

export class EmergencyKitsApiEndpoint extends BaseApiEndpoint<EmergencyKit, EmergencyKitResource, EmergencyKitsResponse, EmergencyKitAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/kits`, new EmergencyKitAssembler());
  }
}
