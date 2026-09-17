import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { RedeemedCoupon } from '../domain/model/redeemed-coupon.entity';
import { RedeemedCouponsResponse, RedeemedCouponResource } from './redeemed-coupons-response';
import { RedeemedCouponAssembler } from './redeemed-coupon.assembler';
import { environment } from '../../../environments/environment';

export class RedeemedCouponsApiEndpoint extends BaseApiEndpoint<RedeemedCoupon, RedeemedCouponResource, RedeemedCouponsResponse, RedeemedCouponAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.ecommerceEndpointPath}/coupons`, new RedeemedCouponAssembler());
  }

  getMine(): Observable<RedeemedCoupon[]> {
    return this.http.get<RedeemedCouponsResponse | RedeemedCouponResource[]>(`${this.endpointUrl}/redeemed/me`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((item) => this.assembler.toEntityFromResource(item));
        }
        if ('value' in response && Array.isArray(response.value)) {
          return response.value.map((item) => this.assembler.toEntityFromResource(item));
        }
        return this.assembler.toEntitiesFromResponse(response);
      }),
    );
  }

  redeem(couponId: string): Observable<RedeemedCoupon> {
    return this.http.post<RedeemedCouponResource>(`${this.endpointUrl}/${couponId}/redeem`, {}).pipe(
      map((item) => this.assembler.toEntityFromResource(item)),
    );
  }
}
