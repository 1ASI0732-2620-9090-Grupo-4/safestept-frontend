import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class CartItem implements BaseEntity<string> {
  private _id: string;
  private _userId: string;
  private _productId: string;
  private _quantity: number;
  private _addedAt: string;

  constructor(cartItem: { id: string; userId: string; productId: string; quantity: number; addedAt: string }) {
    this._id = cartItem.id;
    this._userId = cartItem.userId;
    this._productId = cartItem.productId;
    this._quantity = cartItem.quantity;
    this._addedAt = cartItem.addedAt;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get userId(): string { return this._userId; }
  set userId(value: string) { this._userId = value; }
  get productId(): string { return this._productId; }
  set productId(value: string) { this._productId = value; }
  get quantity(): number { return this._quantity; }
  set quantity(value: number) { this._quantity = value; }
  get addedAt(): string { return this._addedAt; }
  set addedAt(value: string) { this._addedAt = value; }
}
