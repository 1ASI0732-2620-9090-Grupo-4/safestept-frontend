import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Coupon } from '../domain/model/coupon.entity';
import { CouponsResponse, CouponResource } from './coupons-response';
import { CouponAssembler } from './coupon.assembler';
import { environment } from '../../../environments/environment';

export class CouponsApiEndpoint extends BaseApiEndpoint<Coupon, CouponResource, CouponsResponse, CouponAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/coupons`, new CouponAssembler());
  }
}
