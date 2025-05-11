import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArticleTag } from '@/components/ArticleTag';
import { FiHash } from 'react-icons/fi';
import { 
  FiCode, 
  FiCoffee, 
  FiBook, 
  FiMusic, 
  FiFilm, 
  FiHeart, 
  FiGlobe, 
  FiStar, 
  FiCamera, 
  FiTrendingUp 
} from 'react-icons/fi';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

// 示例标签数据
const TAGS = [
  { id: '1', name: '技术', icon: <FiCode className="w-5 h-5" /> },
  { id: '2', name: '生活', icon: <FiCoffee className="w-5 h-5" /> },
  { id: '3', name: '阅读', icon: <FiBook className="w-5 h-5" /> },
  { id: '4', name: '音乐', icon: <FiMusic className="w-5 h-5" /> },
  { id: '5', name: '电影', icon: <FiFilm className="w-5 h-5" /> },
  { id: '6', name: '健康', icon: <FiHeart className="w-5 h-5" /> },
  { id: '7', name: '旅行', icon: <FiGlobe className="w-5 h-5" /> },
  { id: '8', name: '收藏', icon: <FiStar className="w-5 h-5" /> },
  { id: '9', name: '摄影', icon: <FiCamera className="w-5 h-5" /> },
  { id: '10', name: '热门', icon: <FiTrendingUp className="w-5 h-5" /> },
  // 添加更多标签使得滚动效果更明显
  { id: '11', name: 'React', icon: <FiCode className="w-5 h-5" /> },
  { id: '12', name: 'Vue', icon: <FiCode className="w-5 h-5" /> },
  { id: '13', name: 'Angular', icon: <FiCode className="w-5 h-5" /> },
  { id: '14', name: 'Node.js', icon: <FiCode className="w-5 h-5" /> },
  { id: '15', name: 'Python', icon: <FiCode className="w-5 h-5" /> },
];

const TagsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // 模拟加载标签数据
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTagClick = (tagId: string) => {
    setContentLoading(true);
    setSelectedTag(tagId);
    
    // 模拟加载内容
    setTimeout(() => {
      setContentLoading(false);
    }, 400);
  };

  // 标签骨架屏加载动画
  const renderTagsSkeleton = () => {
    return (
      <div className="flex space-x-2 p-1 overflow-x-auto">
        {Array(10).fill(0).map((_, index) => (
          <div key={index} className="inline-flex shrink-0">
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        标签
      </motion.h1>
      
      {/* 标签横向滚动区域 */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-3">所有标签</h2>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          {loading ? renderTagsSkeleton() : (
            <motion.div 
              className="flex space-x-2 p-1 overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {TAGS.map((tag, index) => (
                <motion.div 
                  key={tag.id} 
                  onClick={() => handleTagClick(tag.id)}
                  className={`inline-flex shrink-0 ${selectedTag === tag.id ? 'ring-2 ring-primary' : ''}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArticleTag icon={tag.icon} tagName={tag.name} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </ScrollArea>
      </motion.div>
      
      {/* 选中标签的内容展示区 */}
      {selectedTag && (
        <motion.div 
          className="border rounded-md p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4 }}
        >
          {contentLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
              <h3 className="text-xl font-medium mb-4">
                <span className="inline-flex items-center">
                  {TAGS.find(t => t.id === selectedTag)?.icon}
                  <span className="ml-2">{TAGS.find(t => t.id === selectedTag)?.name}</span>
                </span>
              </h3>
              <p className="text-gray-600">
                这里将显示与标签"{TAGS.find(t => t.id === selectedTag)?.name}"相关的内容列表。
              </p>
            </>
          )}
        </motion.div>
      )}
      
      {!selectedTag && !loading && (
        <motion.div 
          className="text-center py-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FiHash className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>请选择一个标签查看相关内容</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TagsPage; 