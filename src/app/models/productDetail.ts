import {ProductImage} from './productImage';

export interface ProductDetail {
  id?: number
  brandId?: number
  categoryId?: number
  categoryName?: string
  brandName?: string
  productName?: string
  description?: string
  images?: string[]
  image?: ProductImage[]
  code?: string
  price?: number
  discountRate?: number
  createDate?: Date
  active?: boolean
}
