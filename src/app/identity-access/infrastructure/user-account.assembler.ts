import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { UserAccount } from '../domain/model/user-account.entity';
import { UserAccountsResponse, UserAccountResource } from './user-accounts-response';

export class UserAccountAssembler implements BaseAssembler<UserAccount, UserAccountResource, UserAccountsResponse> {
  toEntitiesFromResponse(response: UserAccountsResponse): UserAccount[] { return response.users.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: UserAccountResource): UserAccount { return new UserAccount({ ...resource }); }
  toResourceFromEntity(entity: UserAccount): UserAccountResource { return { id: entity.id, username: entity.username, roles: entity.roles, enabled: entity.enabled }; }
}
