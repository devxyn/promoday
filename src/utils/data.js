export const promos = [
  { name: "Buy 3 one-way ticket, get 1 free", product: "One-way ticket", requiredQuantity: 3, freeQuantity: 1 },
  {
    name: "30% off on Round Trip ticket (up to 5)",
    product: "Round trip ticket",
    discountPercent: 30,
    maxDiscountedQuantity: 5,
  },
  {
    name: "10% off on Full year unli Travel subscription",
    product: "Full year unli Travel subscription",
    discountPercent: 10,
  },
  {
    name: "10% off on Half a year unli Travel subscription (if 2 bought in one transaction)",
    product: "Half a year unli Travel subscription",
    discountPercent: 10,
    requiredQuantity: 2,
  },
];

export const products = {
  "One-way ticket": 5000,
  "Round trip ticket": 10000,
  "Half a year unli Travel subscription": 50000,
  "Full year unli Travel subscription": 100000,
};

export const promocode = ["FREETWOWAY", "5OFF"];
