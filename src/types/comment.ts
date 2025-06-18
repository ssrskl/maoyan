export interface Comment {
  id: string;
  content: string;
  userId: string;
  username: string;
  avatar?: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  parentId?: string;
}

export interface CommentFormData {
  content: string;
  parentId?: string;
}

export interface CommentResponse {
  comments: Comment[];
  total: number;
  page: number;
  pageSize: number;
} 