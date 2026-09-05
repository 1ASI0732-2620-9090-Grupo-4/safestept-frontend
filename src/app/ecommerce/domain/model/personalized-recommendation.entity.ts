import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class PersonalizedRecommendation implements BaseEntity<string> {
  private _id: string;
  private _userId: string;
  private _productId: string;
  private _reason: string;
  private _relatedSimulationId: string;
  private _priority: string;
  private _isDismissed: boolean;

  constructor(personalizedRecommendation: { id: string; userId: string; productId: string; reason: string; relatedSimulationId: string; priority: string; isDismissed: boolean }) {
    this._id = personalizedRecommendation.id;
    this._userId = personalizedRecommendation.userId;
    this._productId = personalizedRecommendation.productId;
    this._reason = personalizedRecommendation.reason;
    this._relatedSimulationId = personalizedRecommendation.relatedSimulationId;
    this._priority = personalizedRecommendation.priority;
    this._isDismissed = personalizedRecommendation.isDismissed;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get userId(): string { return this._userId; }
  set userId(value: string) { this._userId = value; }
  get productId(): string { return this._productId; }
  set productId(value: string) { this._productId = value; }
  get reason(): string { return this._reason; }
  set reason(value: string) { this._reason = value; }
  get relatedSimulationId(): string { return this._relatedSimulationId; }
  set relatedSimulationId(value: string) { this._relatedSimulationId = value; }
  get priority(): string { return this._priority; }
  set priority(value: string) { this._priority = value; }
  get isDismissed(): boolean { return this._isDismissed; }
  set isDismissed(value: boolean) { this._isDismissed = value; }
}
