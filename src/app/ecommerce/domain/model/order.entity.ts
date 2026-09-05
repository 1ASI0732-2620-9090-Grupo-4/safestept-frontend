import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Order implements BaseEntity<string> {
  private _id: string;
  private _userId: string;
  private _total: number;
  private _status: string;
  private _items: string[];
  private _createdAt: string;
  private _shippingAddressId: number | null;
  private _paymentMethodId: number | null;
  private _couponCode: string;
  private _discountApplied: number;
  private _paymentProvider: string | null;
  private _paymentStatus: string | null;
  private _stripeCheckoutSessionId: string | null;
  private _stripePaymentIntentId: string | null;

  constructor(order: { id: string; userId: string; total: number; status: string; items: string[]; createdAt: string; shippingAddressId?: number | null; paymentMethodId?: number | null; couponCode?: string; discountApplied?: number; paymentProvider?: string | null; paymentStatus?: string | null; stripeCheckoutSessionId?: string | null; stripePaymentIntentId?: string | null }) {
    this._id = order.id;
    this._userId = order.userId;
    this._total = order.total;
    this._status = order.status;
    this._items = [...order.items];
    this._createdAt = order.createdAt;
    this._shippingAddressId = order.shippingAddressId ?? null;
    this._paymentMethodId = order.paymentMethodId ?? null;
    this._couponCode = order.couponCode ?? '';
    this._discountApplied = order.discountApplied ?? 0;
    this._paymentProvider = order.paymentProvider ?? null;
    this._paymentStatus = order.paymentStatus ?? null;
    this._stripeCheckoutSessionId = order.stripeCheckoutSessionId ?? null;
    this._stripePaymentIntentId = order.stripePaymentIntentId ?? null;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get userId(): string { return this._userId; }
  set userId(value: string) { this._userId = value; }
  get total(): number { return this._total; }
  set total(value: number) { this._total = value; }
  get status(): string { return this._status; }
  set status(value: string) { this._status = value; }
  get items(): string[] { return this._items; }
  set items(value: string[]) { this._items = value; }
  get createdAt(): string { return this._createdAt; }
  set createdAt(value: string) { this._createdAt = value; }
  get shippingAddressId(): number | null { return this._shippingAddressId; }
  set shippingAddressId(value: number | null) { this._shippingAddressId = value; }
  get paymentMethodId(): number | null { return this._paymentMethodId; }
  set paymentMethodId(value: number | null) { this._paymentMethodId = value; }
  get couponCode(): string { return this._couponCode; }
  set couponCode(value: string) { this._couponCode = value; }
  get discountApplied(): number { return this._discountApplied; }
  set discountApplied(value: number) { this._discountApplied = value; }
  get paymentProvider(): string | null { return this._paymentProvider; }
  set paymentProvider(value: string | null) { this._paymentProvider = value; }
  get paymentStatus(): string | null { return this._paymentStatus; }
  set paymentStatus(value: string | null) { this._paymentStatus = value; }
  get stripeCheckoutSessionId(): string | null { return this._stripeCheckoutSessionId; }
  set stripeCheckoutSessionId(value: string | null) { this._stripeCheckoutSessionId = value; }
  get stripePaymentIntentId(): string | null { return this._stripePaymentIntentId; }
  set stripePaymentIntentId(value: string | null) { this._stripePaymentIntentId = value; }
}
