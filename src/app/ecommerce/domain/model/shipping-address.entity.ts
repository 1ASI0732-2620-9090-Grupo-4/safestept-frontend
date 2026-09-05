import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class ShippingAddress implements BaseEntity<number> {
  private _id: number;
  private _label: string;
  private _recipientName: string;
  private _city: string;
  private _district: string;
  private _isDefault: boolean;

  constructor(shippingAddress: { id: number; label: string; recipientName: string; city: string; district: string; isDefault: boolean }) {
    this._id = shippingAddress.id;
    this._label = shippingAddress.label;
    this._recipientName = shippingAddress.recipientName;
    this._city = shippingAddress.city;
    this._district = shippingAddress.district;
    this._isDefault = shippingAddress.isDefault;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  get label(): string { return this._label; }
  set label(value: string) { this._label = value; }
  get recipientName(): string { return this._recipientName; }
  set recipientName(value: string) { this._recipientName = value; }
  get city(): string { return this._city; }
  set city(value: string) { this._city = value; }
  get district(): string { return this._district; }
  set district(value: string) { this._district = value; }
  get isDefault(): boolean { return this._isDefault; }
  set isDefault(value: boolean) { this._isDefault = value; }
}
