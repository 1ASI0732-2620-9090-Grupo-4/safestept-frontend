import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class UserProfile implements BaseEntity<string> {
  private _id: string;
  private _fullName: string;
  private _email: string;
  private _role: string;
  private _city: string;
  private _avatarUrl: string;
  private _level: number;
  private _xp: number;
  private _nextLevelXp: number;
  private _safeCoins: number;
  private _streakDays: number;
  private _completedSimulations: number;

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get fullName(): string { return this._fullName; }
  set fullName(value: string) { this._fullName = value; }
  get email(): string { return this._email; }
  set email(value: string) { this._email = value; }
  get role(): string { return this._role; }
  set role(value: string) { this._role = value; }
  get city(): string { return this._city; }
  set city(value: string) { this._city = value; }
  get avatarUrl(): string { return this._avatarUrl; }
  set avatarUrl(value: string) { this._avatarUrl = value; }
  get level(): number { return this._level; }
  set level(value: number) { this._level = value; }
  get xp(): number { return this._xp; }
  set xp(value: number) { this._xp = value; }
  get nextLevelXp(): number { return this._nextLevelXp; }
  set nextLevelXp(value: number) { this._nextLevelXp = value; }
  get safeCoins(): number { return this._safeCoins; }
  set safeCoins(value: number) { this._safeCoins = value; }
  get streakDays(): number { return this._streakDays; }
  set streakDays(value: number) { this._streakDays = value; }
  get completedSimulations(): number { return this._completedSimulations; }
  set completedSimulations(value: number) { this._completedSimulations = value; }

  constructor(userProfile: { id: string; fullName: string; email: string; role: string; city: string; avatarUrl: string; level: number; xp: number; nextLevelXp: number; safeCoins: number; streakDays: number; completedSimulations: number }) {
    this._id = userProfile.id;
    this._fullName = userProfile.fullName;
    this._email = userProfile.email;
    this._role = userProfile.role;
    this._city = userProfile.city;
    this._avatarUrl = userProfile.avatarUrl;
    this._level = userProfile.level;
    this._xp = userProfile.xp;
    this._nextLevelXp = userProfile.nextLevelXp;
    this._safeCoins = userProfile.safeCoins;
    this._streakDays = userProfile.streakDays;
    this._completedSimulations = userProfile.completedSimulations;
  }
}
