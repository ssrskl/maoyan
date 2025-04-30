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
import { toFromNow } from '@/lib/time'
import { Viewer } from '@bytemd/react'
import type { Schema } from 'hast-util-sanitize'
import gfm from '@bytemd/plugin-gfm'
// import highlight from '@bytemd/plugin-highlight'
import AdmonitionPlugin from '@/plugins/AdmonitionPlugin'
import { RenderPlugin } from '@/plugins/RenderPlugin'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import MarkdownTOC from '@/components/MarkdownTOC'
import CommonPlugin from '@/plugins/CommonPlugin'
import BlockQuotePlugin from '@/plugins/BlockQuotePlugin'
import { getTagIcon } from '@/components/TagIcons'
import { motion } from 'framer-motion'
// import { ShikiPlugin } from '@/plugins/ShikiPlugin'
import { ShikiPluginAlt } from '@/plugins/ShikiPluginAlt'
import TestPlugin from '@/plugins/TestPlugin'
import RemarkExtensionPlugin from '@/plugins/RemarkExtensionPlugin'
import { RehypeExtensionPlugin } from '@/plugins/RehypeExtensionPlugin'

export const Route = createFileRoute('/_layout/blog/$blogId')({
    component: BlogDetail,
})

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
    const plugins = [
        gfm(),
        AdmonitionPlugin(),
        BlockQuotePlugin(),
        // RemarkExtensionPlugin(),
        // TestPlugin(),
        // RehypeExtensionPlugin(),
        CommonPlugin(),
        ShikiPluginAlt(),
        RenderPlugin(),
    ]
    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const response = await databases.getDocument(
                '674ea924002fc5b22567',
                '674ea93300318c2482e7',
                blogId
            )
            // console.log(response);
            return response
        },
        enabled: !!blogId
    })

    // console.log("博客详情页面渲染", blogId, blog);

    return <div className="flex justify-center pt-10">
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
                                        <Viewer value={blog.content} plugins={plugins} sanitize={(schema: any) => {
                                            schema.attributes['*'].push('dataComponent')
                                            schema.attributes['*'].push('dataProps')
                                            return schema
                                        }} />
                                    </motion.div>

                                </div>
                                <motion.div
                                    className='flex flex-wrap gap-2 mt-36'
                                    variants={staggerContainer}
                                >
                                    {blog.tags.map((tag: any) => (
                                        <motion.div key={tag.tag_name} variants={slideUp}>
                                            <ArticleTag icon={getTagIcon(tag.tag_name)} tagName={tag.tag_name} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

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
                                        <FaLink className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />,
                                        <SiTencentqq className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />,
                                        <SiWechat className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />,
                                        <SiSinaweibo className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />,
                                        <SiX className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />,
                                        <SiFacebook className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />,
                                        <SiGmail className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />,
                                        <SiZhihu className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    ].map((icon, index) => (
                                        <motion.li
                                            key={index}
                                            variants={slideUp}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {icon}
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
                                        markdown={blog.content}
                                        maxDepth={3}
                                    />
                                </motion.div>
                            </motion.div>
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
