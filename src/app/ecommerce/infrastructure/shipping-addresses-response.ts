import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ShippingAddressesResponse extends BaseResponse {
  shippingAddresses: ShippingAddressResource[];
}

export interface ShippingAddressResource extends BaseResource<number> {
  label: string;
  recipientName: string;
  city: string;
  district: string;
  isDefault: boolean;
}
