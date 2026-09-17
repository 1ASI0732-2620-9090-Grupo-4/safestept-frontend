import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Coupon implements BaseEntity<string> {
  private _id: string;
  private _title: string;
  private _costCoins: number;
  private _type: string;
  private _discountPercentage: number;
  private _minPurchaseAmount: number | null;

  constructor(coupon: { id: string; title: string; costCoins: number; type: string; discountPercentage: number; minPurchaseAmount?: number | null }) {
    this._id = coupon.id;
    this._title = coupon.title;
    this._costCoins = coupon.costCoins;
    this._type = coupon.type;
    this._discountPercentage = coupon.discountPercentage;
    this._minPurchaseAmount = coupon.minPurchaseAmount ?? null;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }
  get costCoins(): number { return this._costCoins; }
  set costCoins(value: number) { this._costCoins = value; }
  get type(): string { return this._type; }
  set type(value: string) { this._type = value; }
  get discountPercentage(): number { return this._discountPercentage; }
  set discountPercentage(value: number) { this._discountPercentage = value; }
  get minPurchaseAmount(): number | null { return this._minPurchaseAmount; }
  set minPurchaseAmount(value: number | null) { this._minPurchaseAmount = value; }

  get isMinPurchase(): boolean { return this._type === 'PERCENTAGE_OFF_MIN_PURCHASE'; }
}
