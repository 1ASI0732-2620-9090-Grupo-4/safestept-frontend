import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class EmergencyKit implements BaseEntity<string> {
  private _id: string;
  private _name: string;
  private _description: string;
  private _level: string;
  private _individualPrice: number;
  private _kitPrice: number;
  private _savings: number;
  private _savingsPercentage: number;
  private _products: Array<{ productId: string; quantity: number }>;
  private _imageUrl: string;
  private _isPopular: boolean;

  constructor(emergencyKit: { id: string; name: string; description: string; level: string; individualPrice: number; kitPrice: number; savings: number; savingsPercentage: number; products: Array<{ productId: string; quantity: number }>; imageUrl: string; isPopular: boolean }) {
    this._id = emergencyKit.id;
    this._name = emergencyKit.name;
    this._description = emergencyKit.description;
    this._level = emergencyKit.level;
    this._individualPrice = emergencyKit.individualPrice;
    this._kitPrice = emergencyKit.kitPrice;
    this._savings = emergencyKit.savings;
    this._savingsPercentage = emergencyKit.savingsPercentage;
    this._products = emergencyKit.products.map((p) => ({ ...p }));
    this._imageUrl = emergencyKit.imageUrl;
    this._isPopular = emergencyKit.isPopular;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }
  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }
  get level(): string { return this._level; }
  set level(value: string) { this._level = value; }
  get individualPrice(): number { return this._individualPrice; }
  set individualPrice(value: number) { this._individualPrice = value; }
  get kitPrice(): number { return this._kitPrice; }
  set kitPrice(value: number) { this._kitPrice = value; }
  get savings(): number { return this._savings; }
  set savings(value: number) { this._savings = value; }
  get savingsPercentage(): number { return this._savingsPercentage; }
  set savingsPercentage(value: number) { this._savingsPercentage = value; }
  get products(): Array<{ productId: string; quantity: number }> { return this._products; }
  set products(value: Array<{ productId: string; quantity: number }>) { this._products = value; }
  get imageUrl(): string { return this._imageUrl; }
  set imageUrl(value: string) { this._imageUrl = value; }
  get isPopular(): boolean { return this._isPopular; }
  set isPopular(value: boolean) { this._isPopular = value; }
}
