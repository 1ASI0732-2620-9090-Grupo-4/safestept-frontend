import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface UserAccountsResponse extends BaseResponse {
  users: UserAccountResource[];
}

export interface UserAccountResource extends BaseResource<number> {
  username: string;
  roles: string[];
  enabled: boolean;
}

export interface UpdateUserRolesRequest {
  roles: string[];
}
