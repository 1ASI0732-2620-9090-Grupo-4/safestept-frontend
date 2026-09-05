import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class ProductReview implements BaseEntity<string> {
  private _id: string;
  private _productId: string;
  private _userName: string;
  private _rating: number;
  private _comment: string;
  private _createdAt: string;

  constructor(productReview: { id: string; productId: string; userName: string; rating: number; comment: string; createdAt: string }) {
    this._id = productReview.id;
    this._productId = productReview.productId;
    this._userName = productReview.userName;
    this._rating = productReview.rating;
    this._comment = productReview.comment;
    this._createdAt = productReview.createdAt;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get productId(): string { return this._productId; }
  set productId(value: string) { this._productId = value; }
  get userName(): string { return this._userName; }
  set userName(value: string) { this._userName = value; }
  get rating(): number { return this._rating; }
  set rating(value: number) { this._rating = value; }
  get comment(): string { return this._comment; }
  set comment(value: string) { this._comment = value; }
  get createdAt(): string { return this._createdAt; }
  set createdAt(value: string) { this._createdAt = value; }
}
