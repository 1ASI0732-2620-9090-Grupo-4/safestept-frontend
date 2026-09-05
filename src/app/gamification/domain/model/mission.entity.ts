import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type Cadence = 'Diaria' | 'Semanal';
export type MissionStatus = 'Activa' | 'Disponible' | 'Bloqueada';

export class Mission implements BaseEntity<string> {
  private _id: string;
  private _title: string;
  private _cadence: Cadence;
  private _progress: number;
  private _goal: number;
  private _rewardXp: number;
  private _rewardCoins: number;
  private _status?: MissionStatus;
  private _instructions?: string;
  private _unlockRequirement?: string;

  constructor(mission: {
    id: string;
    title: string;
    cadence: Cadence;
    progress: number;
    goal: number;
    rewardXp: number;
    rewardCoins: number;
    status?: MissionStatus;
    instructions?: string;
    unlockRequirement?: string;
  }) {
    this._id = mission.id;
    this._title = mission.title;
    this._cadence = mission.cadence;
    this._progress = mission.progress;
    this._goal = mission.goal;
    this._rewardXp = mission.rewardXp;
    this._rewardCoins = mission.rewardCoins;
    this._status = mission.status;
    this._instructions = mission.instructions;
    this._unlockRequirement = mission.unlockRequirement;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }
  get cadence(): Cadence { return this._cadence; }
  set cadence(value: Cadence) { this._cadence = value; }
  get progress(): number { return this._progress; }
  set progress(value: number) { this._progress = value; }
  get goal(): number { return this._goal; }
  set goal(value: number) { this._goal = value; }
  get rewardXp(): number { return this._rewardXp; }
  set rewardXp(value: number) { this._rewardXp = value; }
  get rewardCoins(): number { return this._rewardCoins; }
  set rewardCoins(value: number) { this._rewardCoins = value; }
  get status(): MissionStatus | undefined { return this._status; }
  set status(value: MissionStatus | undefined) { this._status = value; }
  get instructions(): string | undefined { return this._instructions; }
  set instructions(value: string | undefined) { this._instructions = value; }
  get unlockRequirement(): string | undefined { return this._unlockRequirement; }
  set unlockRequirement(value: string | undefined) { this._unlockRequirement = value; }
}
