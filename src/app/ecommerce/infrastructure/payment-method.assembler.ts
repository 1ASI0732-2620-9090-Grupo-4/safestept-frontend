import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { PaymentMethod } from '../domain/model/payment-method.entity';
import { PaymentMethodsResponse, PaymentMethodResource } from './payment-methods-response';

export class PaymentMethodAssembler implements BaseAssembler<PaymentMethod, PaymentMethodResource, PaymentMethodsResponse> {
  toEntitiesFromResponse(response: PaymentMethodsResponse): PaymentMethod[] { return response.paymentMethods.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: PaymentMethodResource): PaymentMethod { return new PaymentMethod({ ...resource }); }
  toResourceFromEntity(entity: PaymentMethod): PaymentMethodResource { return { id: entity.id, type: entity.type, label: entity.label, description: entity.description, processingFee: entity.processingFee, isAvailable: entity.isAvailable }; }
}
