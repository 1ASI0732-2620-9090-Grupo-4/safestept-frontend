import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { PaymentMethod } from '../domain/model/payment-method.entity';
import { PaymentMethodsResponse, PaymentMethodResource } from './payment-methods-response';
import { PaymentMethodAssembler } from './payment-method.assembler';
import { environment } from '../../../environments/environment';

export class PaymentMethodsApiEndpoint extends BaseApiEndpoint<PaymentMethod, PaymentMethodResource, PaymentMethodsResponse, PaymentMethodAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/payment-methods`, new PaymentMethodAssembler());
  }
}
