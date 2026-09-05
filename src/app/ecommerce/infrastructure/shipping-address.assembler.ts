import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ShippingAddress } from '../domain/model/shipping-address.entity';
import { ShippingAddressesResponse, ShippingAddressResource } from './shipping-addresses-response';

export class ShippingAddressAssembler implements BaseAssembler<ShippingAddress, ShippingAddressResource, ShippingAddressesResponse> {
  toEntitiesFromResponse(response: ShippingAddressesResponse): ShippingAddress[] { return response.shippingAddresses.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: ShippingAddressResource): ShippingAddress { return new ShippingAddress({ ...resource }); }
  toResourceFromEntity(entity: ShippingAddress): ShippingAddressResource { return { id: entity.id, label: entity.label, recipientName: entity.recipientName, city: entity.city, district: entity.district, isDefault: entity.isDefault }; }
}
