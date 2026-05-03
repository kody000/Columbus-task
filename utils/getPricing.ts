import {Product} from "@/types/productTypes";

export interface ProductPricing {
  original: number;
  final: number;
  hasDiscount: boolean;
  discountPercentage: number | null;
}


export default function getPricing(product: Product): ProductPricing {
  const promotion = product.promotion;
  const original = product.price;

  if (!promotion || promotion.percentage <= 0) {
    return {
      original,
      final: original,
      hasDiscount: false,
      discountPercentage: null,
    };
  }

  const final = Math.round(original * (1 - promotion.percentage / 100));

  return {
    original,
    final,
    hasDiscount: true,
    discountPercentage: promotion.percentage,
  };
}