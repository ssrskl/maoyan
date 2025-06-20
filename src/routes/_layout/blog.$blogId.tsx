import { databases } from '@/lib/appwrite'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { ArticleTag } from '@/components/ArticleTag'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import {
    SiFacebook,
    SiGmail,
    SiSinaweibo,
    SiTencentqq,
    SiWechat,
    SiX,
    SiZhihu,
} from "react-icons/si";
import { FaLink } from "react-icons/fa";
import { Skeleton } from '@/components/ui/skeleton'
import { MdOutlineDateRange } from 'react-icons/md'
import { TimeFormatter, toFromNow } from '@/lib/time'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import MarkdownTOC from '@/components/MarkdownTOC'
import { getTagIcon } from '@/components/TagIcons'
import { motion } from 'framer-motion'
import Like from '@/components/Like'
import Bookmark from '@/components/Bookmark'
import ShareButton from '@/components/ShareButton'
import { Toaster } from '@/components/ui/toaster'
import { useTitle } from 'ahooks'
import { CommentSection } from '@/components/CommentSection'
import { Query } from 'appwrite'
import { buildCommentTree, type ResponseComment } from '@/lib/utils'
import MDXProviderPlus from '@/components/MDXProviderPlus'

// 定义动画变体
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
}

const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}
function BlogDetail() {
    const { blogId } = useParams({ from: '/_layout/blog/$blogId' });
    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const response = await databases.getDocument(
                'blog',
                't_blog',
                blogId
            )
            console.log(response);
            return response
        },
        enabled: !!blogId
    })
    const { data: comments, isLoading: isCommentsLoading } = useQuery({
        queryKey: ['comments', blogId],
        queryFn: async () => {
            const response = await databases.listDocuments('blog', 't_comment', [Query.equal('blog_id', blogId)])
            const responseComments:ResponseComment[] =[]
            response.documents?.forEach(responseComment=>{
                responseComments.push({
                    $collectionId : responseComment.$collectionId,
                    $createdAt : responseComment.$createdAt,
                    $id : responseComment.$id,
                    $updatedAt : responseComment.$updatedAt,
                    avatarUrl : responseComment.avatarUrl,
                    blog_id : responseComment.blog_id,
                    content : responseComment.content,
                    id : responseComment.id,
                    reply_id : responseComment.reply_id,
                    username : responseComment.username,
                })
            });
            const commentTree =  buildCommentTree(responseComments)
            return commentTree
        }
    })
    
    useTitle(`猫颜的数字花园 | ${blog?.title}`)
    return <div className="flex justify-center pt-10">
        <Toaster />
        <div className="flex w-2/3">
            <div className="gap-5 flex flex-col justify-center px-6 w-full">
                <motion.div
                    className="gap-5 flex flex-col justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/blog">博客</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className='font-bold text-black'>{isLoading ? '加载中...' : blog?.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {isLoading ? (
                        <div className="w-full space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-64 w-full" />
                        </div>
                    ) : blog ? (
                        <div className='flex'>
                            {/* 内容 */}
                            <motion.div
                                className='w-3/4'
                                variants={slideUp}
                            >
                                <div className=' border-r-2 border-gray-200 pt-16 pr-6'>
                                    <motion.h1
                                        className="text-3xl font-bold mt-4"
                                        variants={slideUp}
                                    >
                                        {blog.title}
                                    </motion.h1>
                                    <motion.div
                                        className="flex items-center text-gray-500 text-sm my-2"
                                        variants={slideUp}
                                    >
                                        <MdOutlineDateRange className="mr-1" />
                                        {toFromNow(Date.parse(blog.$createdAt))}
                                    </motion.div>
                                    <motion.div
                                        className="mt-6 prose prose-slate max-w-none"
                                        variants={slideUp}
                                    >
                                        <MDXProviderPlus blogId={blogId}/>
                                        {/* <Viewer value={blog.content} plugins={plugins} sanitize={(schema: any) => {
                                            schema.attributes['*'].push('dataComponent')
                                            schema.attributes['*'].push('dataProps')
                                            return schema
                                        }} /> */}
                                    </motion.div>



                                </div>
                                {/* 标签 */}
                                <motion.div
                                    className='flex flex-wrap gap-2 mt-36'
                                    variants={staggerContainer}
                                >
                                    {blog.tags.map((tag: any, index: number) => (
                                        <motion.div
                                            key={tag.tag_name}
                                            initial="hidden"
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.5
                                            }}
                                        >
                                            <ArticleTag icon={getTagIcon(tag.tag_name)} tagName={tag.tag_name} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                                {/* 点赞和收藏 */}
                                <motion.div
                                    className='flex flex-wrap gap-4 mt-36'
                                >
                                    <motion.div
                                        initial="hidden"
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Like blogId={blogId} />
                                    </motion.div>
                                    <motion.div
                                        initial="hidden"
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Bookmark />
                                    </motion.div>
                                </motion.div>
                                {/* 评论 */}
                                <motion.div
                                    className='mt-10'
                                >
                                    {isCommentsLoading ? <div>加载中...</div> : 
                                    <CommentSection 
                                        comments={comments || []}
                                        onCommentSubmit={() => {}}
                                        onReplySubmit={() => {}}
                                    />
                                    }
                                </motion.div>
                            </motion.div>
                            {/* 侧边栏 */}
                            <motion.div
                                className="flex flex-col pl-8 pt-8"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className="text-xl my-10">作者</div>
                                <motion.div
                                    className="flex items-center space-x-3 cursor-pointer"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <Avatar>
                                        <AvatarImage src='https://avatars.githubusercontent.com/u/18780761?v=4' />
                                    </Avatar>
                                    <div className="flex flex-col space-y-3 ">
                                        <div className="font-bold text-sm">猫颜</div>
                                        <div className="text-sm text-zinc-500">
                                            一花一世界，一叶一追寻
                                        </div>
                                    </div>
                                </motion.div>
                                <div className="text-xl my-10">分享至</div>
                                <motion.ul
                                    className="grid grid-cols-4 gap-2 list-none"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {[
                                        { icon: <FaLink />, platform: '复制链接' },
                                        { icon: <SiTencentqq />, platform: 'QQ' },
                                        { icon: <SiWechat />, platform: '微信' },
                                        { icon: <SiSinaweibo />, platform: '微博' },
                                        { icon: <SiX />, platform: 'X' },
                                        { icon: <SiFacebook />, platform: 'Facebook' },
                                        { icon: <SiGmail />, platform: 'Gmail' },
                                        { icon: <SiZhihu />, platform: '知乎' }
                                    ].map((shareItem, index) => (
                                        <motion.li
                                            key={index}
                                            variants={slideUp}
                                        >
                                            <ShareButton
                                                icon={shareItem.icon}
                                                platform={shareItem.platform}
                                                title={blog?.title}
                                            />
                                        </motion.li>
                                    ))}
                                </motion.ul>
                                <motion.div
                                    className='sticky top-32 mt-16'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <MarkdownTOC
                                        markdown={blogId}
                                        maxDepth={3}
                                    />
                                </motion.div>

                            </motion.div>
                            <div>
                            </div>
                        </div>

                    ) : (
                        <motion.div
                            className="py-10 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-gray-500">博客文章不存在或已被删除</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    </div>
}

export const Route = createFileRoute('/_layout/blog/$blogId')({
    component: BlogDetail,
})
