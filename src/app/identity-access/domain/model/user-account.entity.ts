import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class UserAccount implements BaseEntity<number> {
  private _id: number;
  private _username: string;
  private _roles: string[];
  private _enabled: boolean;

  constructor(userAccount: { id: number; username: string; roles: string[]; enabled: boolean }) {
    this._id = userAccount.id;
    this._username = userAccount.username;
    this._roles = userAccount.roles;
    this._enabled = userAccount.enabled;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  get username(): string { return this._username; }
  set username(value: string) { this._username = value; }
  get roles(): string[] { return this._roles; }
  set roles(value: string[]) { this._roles = value; }
  get enabled(): boolean { return this._enabled; }
  set enabled(value: boolean) { this._enabled = value; }
}
