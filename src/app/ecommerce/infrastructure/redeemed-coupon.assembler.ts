import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RedeemedCoupon } from '../domain/model/redeemed-coupon.entity';
import { RedeemedCouponsResponse, RedeemedCouponResource } from './redeemed-coupons-response';

export class RedeemedCouponAssembler implements BaseAssembler<RedeemedCoupon, RedeemedCouponResource, RedeemedCouponsResponse> {
  toEntitiesFromResponse(response: RedeemedCouponsResponse): RedeemedCoupon[] { return response.redeemedCoupons.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: RedeemedCouponResource): RedeemedCoupon { return new RedeemedCoupon({ ...resource }); }
  toResourceFromEntity(entity: RedeemedCoupon): RedeemedCouponResource {
    return {
      id: entity.id,
      couponId: entity.couponId,
      title: entity.title,
      type: entity.type,
      discountPercentage: entity.discountPercentage,
      minPurchaseAmount: entity.minPurchaseAmount,
      redeemedAt: entity.redeemedAt,
      usedAt: entity.usedAt,
      status: entity.status,
    };
  }
}
