import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { UserAccount } from '../domain/model/user-account.entity';
import { UserAccountsResponse, UserAccountResource, UpdateUserRolesRequest } from './user-accounts-response';
import { UserAccountAssembler } from './user-account.assembler';
import { environment } from '../../../environments/environment';

export class UserAccountsApiEndpoint extends BaseApiEndpoint<UserAccount, UserAccountResource, UserAccountsResponse, UserAccountAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.identityAccessEndpointPath}/users`, new UserAccountAssembler());
  }

  updateRoles(userId: number, roles: string[]): Observable<UserAccount> {
    const payload: UpdateUserRolesRequest = { roles };
    return this.http.put<UserAccountResource>(`${this.endpointUrl}/${userId}/roles`, payload).pipe(
      map((updated) => this.assembler.toEntityFromResource(updated)),
    );
  }
}
