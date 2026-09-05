import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Badge } from '../domain/model/badge.entity';
import { BadgesResponse, BadgeResource } from './badges-response';
import { BadgeAssembler } from './badge.assembler';
import { environment } from '../../../environments/environment';

export class BadgesApiEndpoint extends BaseApiEndpoint<Badge, BadgeResource, BadgesResponse, BadgeAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.gamificationEndpointPath}/badges/me`, new BadgeAssembler());
  }
}
