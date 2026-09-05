import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class PaymentMethod implements BaseEntity<number> {
  private _id: number;
  private _type: string;
  private _label: string;
  private _description: string;
  private _processingFee: number;
  private _isAvailable: boolean;

  constructor(paymentMethod: { id: number; type: string; label: string; description: string; processingFee: number; isAvailable: boolean }) {
    this._id = paymentMethod.id;
    this._type = paymentMethod.type;
    this._label = paymentMethod.label;
    this._description = paymentMethod.description;
    this._processingFee = paymentMethod.processingFee;
    this._isAvailable = paymentMethod.isAvailable;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  get type(): string { return this._type; }
  set type(value: string) { this._type = value; }
  get label(): string { return this._label; }
  set label(value: string) { this._label = value; }
  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }
  get processingFee(): number { return this._processingFee; }
  set processingFee(value: number) { this._processingFee = value; }
  get isAvailable(): boolean { return this._isAvailable; }
  set isAvailable(value: boolean) { this._isAvailable = value; }
}
