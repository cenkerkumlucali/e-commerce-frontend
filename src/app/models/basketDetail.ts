export interface BasketDetails {
  id?: number;
  userId?: number;
  productId?: number;
  productName?: string;
  brandName?: string
  userFullName?: string;
  price: number;
  count?: number;
  createDate?: Date;
  active?: boolean;
  images?: string[];
}
