import {ProductImage} from './productImage';

export interface Product {
  id?: number
  categoryId?: number
  brandId?: number
  name?: string
  code?: string
  price?: number
  description?: string
  rating?: number
  discountRate?: number
  images?: ProductImage[]
}
