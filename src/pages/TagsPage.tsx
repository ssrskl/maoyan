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
import { databases } from '@/lib/appwrite';
import { useQuery } from '@tanstack/react-query';
import { getTagIcon } from '@/components/TagIcons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import type { Models } from 'appwrite';
import { Link } from '@tanstack/react-router';
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from 'react-icons/md';
import { toFromNow } from '@/lib/time';

interface Tag extends Models.Document {
  tag_name: string;
}

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

const TagsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState<boolean>(false);

  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        'blog',
        't_tag'
      );
      // console.log(response.documents);  
      return response.documents as Tag[];
    }
  });

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
      <div className="flex flex-wrap gap-2 p-1">
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
                  <BreadcrumbLink href="/tags" className='font-bold text-black'>标签</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <motion.h1
              className="text-4xl font-bold my-4"
              variants={itemVariants}
            >
              标签
            </motion.h1>

            <motion.p variants={itemVariants}>
              探索博客文章的所有标签分类
            </motion.p>
          </motion.div>

          {/* 标签横向滚动区域 */}
          <motion.div
            className="mt-6"
            variants={itemVariants}
          >
            <ScrollArea className="w-full pb-4">
              {isLoading ? renderTagsSkeleton() : (
                <motion.div
                  className="flex flex-wrap gap-2 p-1"
                  variants={containerVariants}
                >
                  {tags && tags.map((tag, index) => (
                    <motion.div
                      key={tag.$id}
                      onClick={() => handleTagClick(tag.$id)}
                      className={`inline-flex shrink-0 ${selectedTag === tag.$id ? 'ring-2 ring-primary rounded-md' : ''}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArticleTag icon={getTagIcon(tag.tag_name)} tagName={tag.tag_name} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </ScrollArea>
          </motion.div>

          {/* 选中标签的内容展示区 */}
          {selectedTag && (
            <motion.div
              className="border rounded-lg p-6 mt-6 bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
              variants={itemVariants}
            >
              {contentLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : (
                tags && (
                  <>
                    <h3 className="text-2xl font-medium mb-4">
                      <span className="inline-flex items-center">
                        {getTagIcon(tags.find(t => t.$id === selectedTag)?.tag_name || '')}
                        <span className="ml-2">{tags.find(t => t.$id === selectedTag)?.tag_name}</span>
                      </span>
                    </h3>
                    <motion.ul
                      className="grid md:grid-cols-2 gap-x-4 gap-y-10 w-full mt-6 list-none sm:grid-cols-1"
                      variants={containerVariants}
                    >
                      {tags.find(t => t.$id === selectedTag)?.blogs.length > 0 ? (
                        tags.find(t => t.$id === selectedTag)?.blogs.map((blog: any, index: number) => (
                          <motion.li
                            key={blog.$id}
                            className="rounded-lg hover:shadow-lg"
                            variants={itemVariants}
                            whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Link
                            to="/blog/$blogId"
                            params={{ blogId: blog.$id }}
                            className="flex flex-col rounded-lg bg-white h-full hover:bg-stone-200 p-4 transition-all duration-300"
                          >
                            <h3 className="text-2xl mt-1">{blog.title}</h3>
                            <p className="my-3">{blog.description}</p>
                            <div className="flex items-center space-x-2">
                              <div className="text-gray-400 text-sm flex items-center gap-1">
                                <MdOutlineDateRange />
                                {toFromNow(Date.parse(blog.$createdAt))}
                              </div>
                              <div className="text-gray-400 text-sm flex items-center gap-1">
                                <MdOutlineRemoveRedEye />
                                {Math.floor(Math.random() * 1000)}
                              </div>
                            </div>
                          </Link>
                        </motion.li>
                      ))
                      ):(
                        <div className="text-center py-12 text-gray-500 bg-white rounded-lg mt-6">
                          <FiHash className="w-16 h-16 mx-auto mb-4 opacity-40" />
                          <p className="text-lg">该标签下没有文章</p>
                        </div>
                      )}
                    </motion.ul>
                  </>
                )
              )}
            </motion.div>
          )}

          {!selectedTag && !isLoading && (
            <motion.div
              className="text-center py-12 text-gray-500 bg-white rounded-lg mt-6"
              variants={itemVariants}
            >
              <FiHash className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <p className="text-lg">请选择一个标签查看相关内容</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TagsPage; 