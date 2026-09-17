import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RedeemedCouponsResponse extends BaseResponse {
  redeemedCoupons: RedeemedCouponResource[];
}

export interface RedeemedCouponResource extends BaseResource<string> {
  couponId: string;
  title: string;
  type: string;
  discountPercentage: number;
  minPurchaseAmount?: number | null;
  redeemedAt: string;
  usedAt?: string | null;
  status: string;
}
