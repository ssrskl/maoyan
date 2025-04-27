import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { databases } from '@/lib/appwrite';
import { toFromNow } from '@/lib/time';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from "react-icons/md";
import type { Models } from 'appwrite';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

// 标签类型定义
interface BlogTag {
    tag_name: string;
    tag_icon: string;
}

// 博客类型定义 - 扩展Appwrite Document类型
interface BlogItem extends Models.Document {
    title: string;
    description: string;
    tags?: BlogTag[];
}

// 博客列表响应类型 - 使用Appwrite DocumentList
type BlogsResponse = Models.DocumentList<BlogItem>;

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

export const Route = createFileRoute('/_layout/blog/')({
    component: Blog,
})

function Blog() {
    // 获取博客列表
    const { data: blogs, isLoading } = useQuery<BlogsResponse>({
        queryKey: ['blogs'],
        queryFn: async () => {
            const response = await databases.listDocuments('674ea924002fc5b22567',
                '674ea93300318c2482e7');
            return response as BlogsResponse;
        },
    });
    const navigate = useNavigate({from: '/blog'});
    return <motion.div 
        className="flex justify-center pt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <motion.div 
            className="flex w-2/3"
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
                                <BreadcrumbLink href="/" className='font-blod text-black'>博客</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <motion.h1 
                        className="text-4xl font-bold my-4"
                        variants={itemVariants}
                    >
                        博客
                    </motion.h1>
                    <motion.p variants={itemVariants}>
                        这里是写的一些博客文章
                    </motion.p>
                </motion.div>

                {/* 博客文章列表 */}

                <motion.ul 
                    className="grid grid-cols-2 gap-x-4 gap-y-10 w-full mt-6"
                    variants={containerVariants}
                >
                    {isLoading ? (
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
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            </motion.li>
                        ))
                    ) : blogs ? (
                        blogs.documents.map((blog, index) => (
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
                                    <div className="flex items-center h-6 space-x-2">
                                        {blog.tags &&
                                            blog.tags.map((tag, tagIndex) => (
                                                <div className="text-gray-400 text-sm flex gap-1" key={tagIndex}>
                                                    <p className="text-gray-400 text-sm hover:underline">
                                                        # {tag.tag_name}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>

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
                    ) : (
                        <div>暂无数据</div>
                    )}
                </motion.ul>

                {/**分页器 */}
            </div>
        </motion.div>
    </motion.div>
}
