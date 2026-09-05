import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Coupon } from '../domain/model/coupon.entity';
import { CouponsResponse, CouponResource } from './coupons-response';

export class CouponAssembler implements BaseAssembler<Coupon, CouponResource, CouponsResponse> {
  toEntitiesFromResponse(response: CouponsResponse): Coupon[] { return response.coupons.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: CouponResource): Coupon { return new Coupon({ ...resource }); }
  toResourceFromEntity(entity: Coupon): CouponResource { return { id: entity.id, title: entity.title, costCoins: entity.costCoins, discount: entity.discount }; }
}
