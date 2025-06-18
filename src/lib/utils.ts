import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Comment } from "@/components/CommentSection"

export interface ResponseComment {
  $collectionId: string;
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  avatarUrl: string;
  blog_id: string;
  content: string;
  id: string;
  reply_id: string;
  username: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildCommentTree(responseComments: ResponseComment[]) {
  const commentTree: Comment[] = [];
  const commentMap = new Map<string, Comment>();
  responseComments.forEach(responseComment => {
    const comment: Comment = {
      id: responseComment.id,
      content: responseComment.content,
      user: {
        name: responseComment.username,
        avatarUrl: responseComment.avatarUrl,
      },
      timestamp: responseComment.$createdAt,
      replies: [] // 初始化 replies 数组
    };
    commentMap.set(comment.id, comment);
  });
  commentMap.forEach(comment => {
    const originalComment = responseComments.find(rc => rc.id === comment.id)!;
    if (originalComment.reply_id === 0) {
      commentTree.push(comment);
    } else {
      const parentComment = commentMap.get(originalComment.reply_id);
      if (parentComment) {
        parentComment.replies?.push(comment);
      }
    }
  });
  console.log(commentTree)
  return commentTree
}