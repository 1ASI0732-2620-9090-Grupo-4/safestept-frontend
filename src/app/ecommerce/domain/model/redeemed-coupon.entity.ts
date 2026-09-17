import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class RedeemedCoupon implements BaseEntity<string> {
  private _id: string;
  private _couponId: string;
  private _title: string;
  private _type: string;
  private _discountPercentage: number;
  private _minPurchaseAmount: number | null;
  private _redeemedAt: string;
  private _usedAt: string | null;
  private _status: string;

  constructor(value: {
    id: string;
    couponId: string;
    title: string;
    type: string;
    discountPercentage: number;
    minPurchaseAmount?: number | null;
    redeemedAt: string;
    usedAt?: string | null;
    status: string;
  }) {
    this._id = value.id;
    this._couponId = value.couponId;
    this._title = value.title;
    this._type = value.type;
    this._discountPercentage = value.discountPercentage;
    this._minPurchaseAmount = value.minPurchaseAmount ?? null;
    this._redeemedAt = value.redeemedAt;
    this._usedAt = value.usedAt ?? null;
    this._status = value.status;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get couponId(): string { return this._couponId; }
  get title(): string { return this._title; }
  get type(): string { return this._type; }
  get discountPercentage(): number { return this._discountPercentage; }
  get minPurchaseAmount(): number | null { return this._minPurchaseAmount; }
  get redeemedAt(): string { return this._redeemedAt; }
  get usedAt(): string | null { return this._usedAt; }
  get status(): string { return this._status; }

  get isAvailable(): boolean { return this._status === 'AVAILABLE'; }
  get isMinPurchase(): boolean { return this._type === 'PERCENTAGE_OFF_MIN_PURCHASE'; }
}
