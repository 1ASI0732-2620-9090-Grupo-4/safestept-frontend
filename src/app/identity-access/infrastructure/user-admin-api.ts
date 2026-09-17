import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { UserAccountsApiEndpoint } from './user-accounts-api-endpoint';
import { UserAccount } from '../domain/model/user-account.entity';

@Injectable({ providedIn: 'root' })
export class UserAdminApi extends BaseApi {
  private readonly usersEndpoint: UserAccountsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.usersEndpoint = new UserAccountsApiEndpoint(http);
  }

  getUsers(): Observable<UserAccount[]> { return this.usersEndpoint.getAll(); }
  getUserById(id: number): Observable<UserAccount> { return this.usersEndpoint.getById(id); }
  updateUserRoles(userId: number, roles: string[]): Observable<UserAccount> { return this.usersEndpoint.updateRoles(userId, roles); }
}
