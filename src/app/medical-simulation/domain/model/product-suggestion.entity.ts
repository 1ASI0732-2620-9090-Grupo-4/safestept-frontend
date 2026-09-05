export class ProductSuggestion {
  private _productId: string;
  private _reason: string;

  constructor(suggestion: {
    productId: string;
    reason: string;
  }) {
    this._productId = suggestion.productId;
    this._reason = suggestion.reason;
  }

  get productId(): string { return this._productId; }
  set productId(value: string) { this._productId = value; }
  get reason(): string { return this._reason; }
  set reason(value: string) { this._reason = value; }
}
