import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface PaymentMethodsResponse extends BaseResponse {
  paymentMethods: PaymentMethodResource[];
}

export interface PaymentMethodResource extends BaseResource<number> {
  type: string;
  label: string;
  description: string;
  processingFee: number;
  isAvailable: boolean;
}
