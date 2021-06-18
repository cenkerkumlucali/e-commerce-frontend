export interface UserCommentImage {
  id?: number;
  userId?: number;
  commentId?: number;
  productId?: number;
  imagePath?: string;
  createDate?: Date;
  active?: boolean;
}
