import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import type { Tag } from '@/types/Tag';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  tags: Tag[];
}

// 高亮搜索词的辅助函数
const highlightText = (text: string, searchTerm: string): ReactNode[] => {
  if (!searchTerm || searchTerm.trim() === '') return [text];
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return <span key={index} className="bg-yellow-200 text-primary font-bold">{part}</span>;
    }
    return part;
  });
};

// 定义容器动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

// 定义子元素动画变体
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 12
    }
  }
};

export default function SearchPage() {
  const search = useSearch({ from: '/search' });
  const navigate = useNavigate();
  const query = (search.q as string) || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const { documents } = await databases.listDocuments(
        "blog",
        "t_blog",
        [
          Query.contains("title", searchTerm)
        ]
      )
      const results = documents.map((document: any) => ({
        id: document.$id,
        title: document.title,
        excerpt: document.description,
        tags: document.tags,
      }));
      setResults(results);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 使用TanStack Router导航
      navigate({
        to: '/search',
        search: { q: searchQuery.trim() },
      });
    }
  };

  return (
    <motion.div 
      className="flex justify-center pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex md:w-2/3 sm:w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="gap-5 flex flex-col justify-center px-6 w-full">
          <motion.div
            className="gap-5 flex flex-col justify-center"
            variants={itemVariants}
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/search" className='font-bold text-black'>搜索结果</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <motion.h1 
              className="text-4xl font-bold my-4"
              variants={itemVariants}
            >
              搜索结果
            </motion.h1>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSearch} 
            className="mb-8 flex gap-2 items-center"
            variants={itemVariants}
          >
            <div className="relative flex-grow">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-8"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              搜索
            </button>
          </motion.form>

          {query && (
            <motion.p variants={itemVariants} className="text-gray-500 mb-4">
              {loading ? '搜索中...' : `找到 ${results.length} 个与 "${query}" 相关的结果`}
            </motion.p>
          )}

          {/* 搜索结果列表 */}
          <motion.ul 
            className="grid md:grid-cols-2 gap-x-4 gap-y-10 w-full mt-6 list-none sm:grid-cols-1"
            variants={containerVariants}
          >
            {loading ? (
              // 加载动画
              [...Array(4)].map((_, index) => (
                <motion.li 
                  key={index} 
                  className="rounded-lg"
                  variants={itemVariants}
                >
                  <div className="flex flex-col rounded-lg bg-white h-full p-4">
                    <div className="flex items-center h-6 space-x-2 mb-2">
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-20 w-full mb-3" />
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </motion.li>
              ))
            ) : results.length > 0 ? (
              results.map((result) => (
                <motion.li
                  key={result.id}
                  className="rounded-lg hover:shadow-lg"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Link 
                    to="/blog/$blogId" 
                    params={{ blogId: result.id }}
                    className="flex flex-col rounded-lg bg-white h-full hover:bg-stone-200 p-4 transition-all duration-300"
                  >
                    <div className="flex items-center h-6 space-x-2">
                      {result.tags &&
                        result.tags.map((tag) => (
                          <div className="text-gray-400 text-sm flex gap-1" key={tag.tag_name}>
                            <p className="text-gray-400 text-sm hover:underline">
                              # {tag.tag_name}
                            </p>
                          </div>
                        ))}
                    </div>
                    <h3 className="text-2xl mt-1">
                      {highlightText(result.title, query)}
                    </h3>
                    <p className="my-3">{result.excerpt}</p>
                  </Link>
                </motion.li>
              ))
            ) : query ? (
              <motion.div 
                className="text-center py-10 col-span-2"
                variants={itemVariants}
              >
                <p className="text-lg">没有找到与 "{query}" 相关的内容</p>
                <p className="text-gray-500 mt-2">请尝试其他关键词或浏览我们的博客内容</p>
              </motion.div>
            ) : null}
          </motion.ul>
        </div>
      </motion.div>
    </motion.div>
  );
} 