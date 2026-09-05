import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { CertificateEntry } from '../domain/model/certificate-entry.entity';
import { CertificatesResponse, CertificateResource } from './certificates-response';
import { CertificateAssembler } from './certificate.assembler';
import { environment } from '../../../environments/environment';

export class CertificatesApiEndpoint extends BaseApiEndpoint<CertificateEntry, CertificateResource, CertificatesResponse, CertificateAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.statisticsEndpointPath}/certificates/me`, new CertificateAssembler());
  }
}
