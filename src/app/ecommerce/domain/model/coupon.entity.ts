import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Coupon implements BaseEntity<string> {
  private _id: string;
  private _title: string;
  private _costCoins: number;
  private _discount: string;

  constructor(coupon: { id: string; title: string; costCoins: number; discount: string }) {
    this._id = coupon.id;
    this._title = coupon.title;
    this._costCoins = coupon.costCoins;
    this._discount = coupon.discount;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }
  get costCoins(): number { return this._costCoins; }
  set costCoins(value: number) { this._costCoins = value; }
  get discount(): string { return this._discount; }
  set discount(value: string) { this._discount = value; }
}
