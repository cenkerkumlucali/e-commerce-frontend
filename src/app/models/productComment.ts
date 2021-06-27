import {UserCommentImage} from './userCommentImage';

export interface ProductComment {
  id?: number;
  userId?: number;
  productId?: number;
  comment?: string;
  commentImagePath?: UserCommentImage[];
}
