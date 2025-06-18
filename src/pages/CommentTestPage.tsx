import React from 'react';
import { CommentSection } from '@/components/CommentSection';
import type { Comment } from '@/components/CommentSection'; // 假设 Comment 类型是从 CommentSection 导出的

const CommentTestPage: React.FC = () => {
  const [sampleComments, setSampleComments] = React.useState<Comment[]>([
    {
      id: '1',
      user: { name: '测试用户小明', avatarUrl: 'https://github.com/shadcn.png' },
      content: '这真是太棒了，我非常喜欢这个功能！希望未来能有更多类似的设计。',
      timestamp: '2 小时前',
      replies: [
        {
          id: '1-1',
          user: { name: '测试用户小红' },
          content: '完全同意！期待更多更新。',
          timestamp: '1 小时前',
          replies: [
            {
              id: '1-1-1',
              user: { name: '测试用户小明', avatarUrl: 'https://github.com/shadcn.png' },
              content: '是的，希望开发者能看到我们的反馈。',
              timestamp: '30 分钟前',
            }
          ]
        },
        {
          id: '1-2',
          user: { name: '测试用户小刚' },
          content: '我也觉得很赞！',
          timestamp: '45 分钟前',
        }
      ]
    },
    {
      id: '2',
      user: { name: '访客用户007' },
      content: '很好的分享，学习到了很多有用的知识点，感谢博主！',
      timestamp: '3 小时前',
    },
    {
      id: '3',
      user: { name: '开发者代表', avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4' }, // shadcn avatar
      content: '感谢大家的反馈，我们会持续优化体验。',
      timestamp: '15 分钟前',
    }
  ]);

  const handleCommentSubmit = (content: string) => {
    const newComment: Comment = {
      id: String(Date.now()),
      // 在实际应用中，这里应该是当前登录用户的信息
      user: { name: '当前登录用户', avatarUrl: 'https://source.unsplash.com/random/100x100/?avatar&currentuser' }, 
      content,
      timestamp: '刚刚',
    };
    setSampleComments(prevComments => [newComment, ...prevComments]);
    console.log('New comment submitted from test page:', content);
    // 实际应用中，这里会调用 API 将评论发送到后端
  };

  const handleReplySubmit = (content: string, parentCommentId: string) => {
    const newReply: Comment = {
      id: String(Date.now()),
      // 在实际应用中，这里应该是当前登录用户的信息
      user: { name: '当前登录用户', avatarUrl: 'https://source.unsplash.com/random/100x100/?avatar&currentuser' }, 
      content,
      timestamp: '刚刚',
    };
    
    const addReplyToComment = (commentsList: Comment[], parentId: string, reply: Comment): Comment[] => {
      return commentsList.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [reply, ...(comment.replies || [])] // 将新回复放在前面
          };
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies, parentId, reply)
          };
        }
        return comment;
      });
    };

    setSampleComments(prevComments => addReplyToComment(prevComments, parentCommentId, newReply));
    console.log('New reply submitted from test page:', content, 'to comment ID:', parentCommentId);
    // 实际应用中，这里会调用 API 将回复发送到后端
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">评论组件测试页面</h1>
        <p className="text-muted-foreground text-center mt-2">
          这是一个用于展示和测试 `CommentSection` 组件的页面。
        </p>
      </header>
      
      <main>
        <CommentSection 
          comments={sampleComments} 
          onCommentSubmit={handleCommentSubmit}
          onReplySubmit={handleReplySubmit} 
        />
      </main>

      <footer className="mt-12 pt-8 border-t text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} 您的博客名称. 评论功能测试.</p>
      </footer>
    </div>
  );
};

export default CommentTestPage; 