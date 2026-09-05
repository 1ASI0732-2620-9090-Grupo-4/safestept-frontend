export interface ProductSuggestionResponse {
  productSuggestions: ProductSuggestionResource[];
}

export interface ProductSuggestionResource {
  productId: string;
  reason: string;
}
