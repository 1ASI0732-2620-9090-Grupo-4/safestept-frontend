import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class RecommendationEntry implements BaseEntity<string> {
  private _id: string;
  private _title: string;
  private _action: string;
  private _priority: string;

  constructor(data: { id: string; title: string; action: string; priority: string }) {
    this._id = data.id;
    this._title = data.title;
    this._action = data.action;
    this._priority = data.priority;
  }

  get id(): string { return this._id; }
  get title(): string { return this._title; }
  get action(): string { return this._action; }
  get priority(): string { return this._priority; }
}
