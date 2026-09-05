import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class ProductCategory implements BaseEntity<string> {
  private _id: string;
  private _name: string;
  private _productCount: number;

  constructor(productCategory: { id: string; name: string; productCount: number }) {
    this._id = productCategory.id;
    this._name = productCategory.name;
    this._productCount = productCategory.productCount;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }
  get productCount(): number { return this._productCount; }
  set productCount(value: number) { this._productCount = value; }
}
