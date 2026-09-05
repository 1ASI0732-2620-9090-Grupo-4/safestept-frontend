import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Badge implements BaseEntity<string> {
  private _id: string;
  private _name: string;
  private _rarity: string;
  private _unlocked: boolean;
  private _description: string;
  private _unlockRequirement?: string;

  constructor(badge: {
    id: string;
    name: string;
    rarity: string;
    unlocked: boolean;
    description: string;
    unlockRequirement?: string;
  }) {
    this._id = badge.id;
    this._name = badge.name;
    this._rarity = badge.rarity;
    this._unlocked = badge.unlocked;
    this._description = badge.description;
    this._unlockRequirement = badge.unlockRequirement;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }
  get rarity(): string { return this._rarity; }
  set rarity(value: string) { this._rarity = value; }
  get unlocked(): boolean { return this._unlocked; }
  set unlocked(value: boolean) { this._unlocked = value; }
  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }
  get unlockRequirement(): string | undefined { return this._unlockRequirement; }
  set unlockRequirement(value: string | undefined) { this._unlockRequirement = value; }
}
