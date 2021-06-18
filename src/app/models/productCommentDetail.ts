import {UserCommentImage} from './userCommentImage';

export interface ProductCommentDetails {
  id: number;
  userId: number;
  productId: number;
  userFullName: string;
  productName: string;
  comment: string;
  imagePath: string[];
  commentImagePath: UserCommentImage[];
}
