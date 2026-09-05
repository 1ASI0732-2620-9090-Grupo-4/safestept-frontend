import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ShippingAddress } from '../domain/model/shipping-address.entity';
import { ShippingAddressesResponse, ShippingAddressResource } from './shipping-addresses-response';
import { ShippingAddressAssembler } from './shipping-address.assembler';
import { environment } from '../../../environments/environment';

export class ShippingAddressesApiEndpoint extends BaseApiEndpoint<ShippingAddress, ShippingAddressResource, ShippingAddressesResponse, ShippingAddressAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/shipping-addresses/me`, new ShippingAddressAssembler());
  }
}
