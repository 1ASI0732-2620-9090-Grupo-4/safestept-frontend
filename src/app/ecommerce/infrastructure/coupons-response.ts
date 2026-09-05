import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CouponsResponse extends BaseResponse {
  coupons: CouponResource[];
}

export interface CouponResource extends BaseResource<string> {
  title: string;
  costCoins: number;
  discount: string;
}
