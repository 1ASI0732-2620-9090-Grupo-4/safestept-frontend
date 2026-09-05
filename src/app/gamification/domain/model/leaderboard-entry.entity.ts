import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class LeaderboardEntry implements BaseEntity<string> {
  private _id: string;
  private _rank: number;
  private _name: string;
  private _xp: number;
  private _streak: number;

  constructor(entry: {
    id: string;
    rank: number;
    name: string;
    xp: number;
    streak: number;
  }) {
    this._id = entry.id;
    this._rank = entry.rank;
    this._name = entry.name;
    this._xp = entry.xp;
    this._streak = entry.streak;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get rank(): number { return this._rank; }
  set rank(value: number) { this._rank = value; }
  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }
  get xp(): number { return this._xp; }
  set xp(value: number) { this._xp = value; }
  get streak(): number { return this._streak; }
  set streak(value: number) { this._streak = value; }
}
