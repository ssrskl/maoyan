import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
export interface Comment {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  timestamp: string;
  replies?: Comment[];
  // parentUserName?: string; // No longer needed directly on data, will be passed as prop
}

interface CommentSectionProps {
  comments: Comment[];
  onCommentSubmit: (content: string) => void;
  onReplySubmit?: (content: string, parentCommentId: string) => void;
}

interface CommentItemProps {
  comment: Comment;
  onReplySubmit?: CommentSectionProps['onReplySubmit'];
  parentUserName?: string; // Name of the user this comment is a reply to (for @mention)
  nestingLevel: number; // 0 for top-level, 1 for reply to top-level, etc.
}

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12, duration: 0.3 }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1 // Adjust stagger timing as needed
    }
  }
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReplySubmit, parentUserName, nestingLevel }) => {
  const [replyContent, setReplyContent] = React.useState('');
  const [showReplyInput, setShowReplyInput] = React.useState(false);

  const handleReplySubmit = () => {
    if (replyContent.trim() && onReplySubmit) {
      onReplySubmit(replyContent, comment.id);
      setReplyContent('');
      setShowReplyInput(false);
    }
  };

  const isTopLevelComment = nestingLevel === 0;
  // Adjust sizes for compactness
  const avatarSize = isTopLevelComment ? "w-9 h-9" : "w-7 h-7";
  const textSize = isTopLevelComment ? "text-sm" : "text-xs"; // Smaller base text size
  const nameTextSize = isTopLevelComment ? "text-sm font-semibold" : "text-xs font-semibold";
  const metaTextSize = "text-xs text-muted-foreground";
  // Adjust paddings for compactness
  const headerPadding = isTopLevelComment ? "p-2 " : "p-1.5 ";
  const footerPadding = isTopLevelComment ? "p-2 pt-0 " : "p-1.5 pt-0 ";
  const headerSpaceX = isTopLevelComment ? "space-x-2.5" : "space-x-2";

  return (
    <motion.div className="w-full" variants={itemVariants}>
      <Card className={`bg-transparent shadow-none py-0 ${!isTopLevelComment ? 'pt-0' : ''}`}>
        <CardHeader className={`flex flex-row items-start ${headerSpaceX} ${headerPadding}`}>
          <Avatar className={`${avatarSize} mt-0.5`}> {/* Added mt-0.5 for better alignment with text */} 
            <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
            {/* <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback> */}
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className={nameTextSize}>{comment.user.name}</p>
              <p className={metaTextSize}>{comment.timestamp}</p>
            </div>
            {parentUserName && nestingLevel > 0 && (
              <p className={`${metaTextSize}`}> {/* Reduced mt */} 
                回复 <span className="font-semibold text-primary">@{parentUserName}</span>
              </p>
            )}
            <p className={`text-foreground ${textSize} ${parentUserName && nestingLevel > 0 ? 'mt-0.5' : 'mt-1'}`}> {/* Reduced mt */} 
              {comment.content}
            </p>
          </div>
        </CardHeader>
        {onReplySubmit && (
          <CardFooter className={`${footerPadding} flex flex-col items-end`}>
            <Button variant="ghost" onClick={() => setShowReplyInput(!showReplyInput)} className="self-end text-xs h-7 px-2">
              {showReplyInput ? '取消回复' : '回复'}
            </Button>
            {showReplyInput && (
              <motion.div className="w-full mt-1.5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }}>
                <Textarea
                  value={replyContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyContent(e.target.value)}
                  placeholder={`回复 ${comment.user.name}...`}
                  className={`mb-1.5 ${textSize} p-1.5`}
                  rows={2}
                />
                <Button onClick={handleReplySubmit} className="text-xs h-7 px-2">提交回复</Button>
              </motion.div>
            )}
          </CardFooter>
        )}
      </Card>

      {/* Replies (Sub-comments) Section */}
      {comment.replies && comment.replies.length > 0 && (
        <motion.div 
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className={`replies-block ${
            isTopLevelComment 
              ? 'mt-1.5 ml-8 pl-3 pt-1.5 border-l border-border/60 space-y-1' // Reduced spacing and indentation
              : 'mt-1.5 ml-0 pl-0 pt-1 space-y-0.5' // Reduced spacing for sub-replies
          }`}
        >
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReplySubmit={onReplySubmit}
              parentUserName={comment.user.name} // The user being replied to is the author of the current comment
              nestingLevel={nestingLevel + 1}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onCommentSubmit, onReplySubmit }) => {
  const [newComment, setNewComment] = React.useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onCommentSubmit(newComment);
      setNewComment('');
    }
  };
  
  const totalCommentsCount = comments.reduce((acc, c) => {
    let count = 1; // for the comment itself
    const countReplies = (replies: Comment[]): number => {
      let num = 0;
      for (const reply of replies) {
        num += 1;
        if (reply.replies) {
          num += countReplies(reply.replies);
        }
      }
      return num;
    };
    if (c.replies) {
      count += countReplies(c.replies);
    }
    return acc + count;
  }, 0);


  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto" 
      initial="hidden" 
      animate="visible" 
      variants={listVariants}
    >
      <motion.h2 variants={itemVariants} className="text-lg font-semibold mb-3"> 
        评论 ({totalCommentsCount})
      </motion.h2>
      
      <motion.div variants={itemVariants}>
        <Card className="mb-4 md:mb-5"> 
          <CardContent className="p-2 md:p-3"> 
            <Textarea
              value={newComment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              placeholder="留下你的想法..."
              rows={3} 
              className="mb-2 md:mb-2.5 text-sm p-2" 
            />
          </CardContent>
          <CardFooter className="p-2 pt-0 flex justify-end"> 
            <Button onClick={handleSubmit} size="sm" className="text-xs h-8 px-3">发表评论</Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div variants={listVariants}>
        {comments.length === 0 ? (
          <motion.p variants={itemVariants} className="text-muted-foreground text-sm text-center py-3">暂无评论，快来发表第一条评论吧！</motion.p> 
        ) : (
          <div className="space-y-3 md:space-y-4"> 
            {comments.map(comment => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                onReplySubmit={onReplySubmit} 
                nestingLevel={0} 
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// SampleUsage should also be wrapped with motion.div if you want its initial appearance animated
// when testing directly. However, CommentSection itself handles its internal animations.
const SampleUsage = () => {
  const [sampleComments, setSampleComments] = React.useState<Comment[]>([
    {
      id: '1',
      user: { name: '用户张三', avatarUrl: 'https://github.com/shadcn.png' },
      content: '这篇文章写得太好了，分析得很透彻！受益匪浅。观点独到，论据充分，期待博主更多佳作！',
      timestamp: '3 小时前',
      replies: [
        {
          id: '1-1',
          user: { name: '用户李四' },
          content: '确实，博主的观点很有启发性。我特别喜欢关于未来趋势的预测部分。',
          timestamp: '2 小时前',
          replies: [
            {
              id: '1-1-1',
              user: { name: '用户王五' },
              content: '我尤其同意关于未来趋势的那部分，感觉很有前瞻性！',
              timestamp: '1 小时前',
            },
            {
              id: '1-1-2',
              user: { name: '用户张三', avatarUrl: 'https://github.com/shadcn.png' },
              content: '谢谢李四和王五的认可！很高兴我的想法能给大家带来启发。',
              timestamp: '30 分钟前',
            }
          ]
        },
        {
          id: '1-2',
          user: { name: '用户赵六' },
          content: '已收藏，感谢分享！准备再细读一遍。',
          timestamp: '1 小时前',
        }
      ]
    },
    {
      id: '2',
      user: { name: '用户小七' },
      content: '学习了，希望以后能看到更多这样的好文章。顺便问一下，博主下一篇文章计划写什么主题呢？',
      timestamp: '5 小时前',
    }
  ]);

  const handleCommentSubmit = (content: string) => {
    const newComment: Comment = {
      id: String(Date.now()),
      user: { name: '当前登录用户', avatarUrl: 'https://i.pravatar.cc/40?u=currentuser' }, 
      content,
      timestamp: '刚刚',
    };
    setSampleComments(prevComments => [newComment, ...prevComments]);
  };

  const handleReplySubmit = (content: string, parentCommentId: string) => {
    const newReply: Comment = {
      id: String(Date.now()),
      user: { name: '当前登录用户', avatarUrl: 'https://i.pravatar.cc/40?u=currentuser' }, 
      content,
      timestamp: '刚刚',
    };
    
    const addReplyRecursively = (commentsList: Comment[], parentId: string, reply: Comment): Comment[] => {
      return commentsList.map(c => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [ ...(c.replies || []), reply]
          };
        }
        if (c.replies && c.replies.length > 0) {
          return {
            ...c,
            replies: addReplyRecursively(c.replies, parentId, reply)
          };
        }
        return c;
      });
    };
    setSampleComments(prevComments => addReplyRecursively(prevComments, parentCommentId, newReply));
  };

  return (
    // It's good practice for a page/test wrapper to also have an entry animation if desired.
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-2 sm:p-4 bg-muted/10 min-h-screen"> 
      <CommentSection 
        comments={sampleComments} 
        onCommentSubmit={handleCommentSubmit}
        onReplySubmit={handleReplySubmit} 
      />
    </motion.div>
  );
}