import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type ProductType = 'Producto' | 'Kit';

export class StoreProduct implements BaseEntity<string> {
  private _id: string;
  private _name: string;
  private _category: string;
  private _type: ProductType;
  private _price: number;
  private _oldPrice?: number;
  private _rating: number;
  private _stock: number;
  private _imageUrl: string;
  private _tags: string[];
  private _description: string;
  private _recommendedFor: string[];
  private _longDescription?: string;
  private _images?: string[];
  private _specifications?: Record<string, string>;
  private _isPopular?: boolean;

  constructor(storeProduct: {
    id: string;
    name: string;
    category: string;
    type: ProductType;
    price: number;
    oldPrice?: number;
    rating: number;
    stock: number;
    imageUrl: string;
    tags: string[];
    description: string;
    recommendedFor: string[];
    longDescription?: string;
    images?: string[];
    specifications?: Record<string, string>;
    isPopular?: boolean;
  }) {
    this._id = storeProduct.id;
    this._name = storeProduct.name;
    this._category = storeProduct.category;
    this._type = storeProduct.type;
    this._price = storeProduct.price;
    this._oldPrice = storeProduct.oldPrice;
    this._rating = storeProduct.rating;
    this._stock = storeProduct.stock;
    this._imageUrl = storeProduct.imageUrl;
    this._tags = [...storeProduct.tags];
    this._description = storeProduct.description;
    this._recommendedFor = [...storeProduct.recommendedFor];
    this._longDescription = storeProduct.longDescription;
    this._images = storeProduct.images ? [...storeProduct.images] : undefined;
    this._specifications = storeProduct.specifications ? { ...storeProduct.specifications } : undefined;
    this._isPopular = storeProduct.isPopular;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }
  get category(): string { return this._category; }
  set category(value: string) { this._category = value; }
  get type(): ProductType { return this._type; }
  set type(value: ProductType) { this._type = value; }
  get price(): number { return this._price; }
  set price(value: number) { this._price = value; }
  get oldPrice(): number | undefined { return this._oldPrice; }
  set oldPrice(value: number | undefined) { this._oldPrice = value; }
  get rating(): number { return this._rating; }
  set rating(value: number) { this._rating = value; }
  get stock(): number { return this._stock; }
  set stock(value: number) { this._stock = value; }
  get imageUrl(): string { return this._imageUrl; }
  set imageUrl(value: string) { this._imageUrl = value; }
  get tags(): string[] { return this._tags; }
  set tags(value: string[]) { this._tags = value; }
  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }
  get recommendedFor(): string[] { return this._recommendedFor; }
  set recommendedFor(value: string[]) { this._recommendedFor = value; }
  get longDescription(): string | undefined { return this._longDescription; }
  set longDescription(value: string | undefined) { this._longDescription = value; }
  get images(): string[] | undefined { return this._images; }
  set images(value: string[] | undefined) { this._images = value; }
  get specifications(): Record<string, string> | undefined { return this._specifications; }
  set specifications(value: Record<string, string> | undefined) { this._specifications = value; }
  get isPopular(): boolean | undefined { return this._isPopular; }
  set isPopular(value: boolean | undefined) { this._isPopular = value; }
}
