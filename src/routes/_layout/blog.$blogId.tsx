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
import { FaLink, FaLongArrowAltLeft } from "react-icons/fa";
import { Skeleton } from '@/components/ui/skeleton'
import { MdOutlineDateRange } from 'react-icons/md'
import { toFromNow } from '@/lib/time'
import { Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import AdmonitionPlugin from '@/plugins/AdmonitionPlugin'
import { RenderPlugin } from '@/plugins/RenderPlugin'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import MarkdownTOC from '@/components/MarkdownTOC'
import CommonPlugin from '@/plugins/CommonPlugin'
import BlockQuotePlugin from '@/plugins/BlockQuotePlugin'
import { getTagIcon } from '@/components/TagIcons'

export const Route = createFileRoute('/_layout/blog/$blogId')({
    component: BlogDetail,
})



function BlogDetail() {
    const { blogId } = useParams({ from: '/_layout/blog/$blogId' });
    const plugins = [
        gfm(),
        highlight(),
        CommonPlugin(),
        AdmonitionPlugin(),
        BlockQuotePlugin(),
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
            console.log(response);
            return response
        },
        enabled: !!blogId
    })

    console.log("博客详情页面渲染", blogId, blog);

    return <div className="flex justify-center pt-10">
        <div className="flex w-2/3">
            <div className="gap-5 flex flex-col justify-center px-6 w-full">
                <div className="gap-5 flex flex-col justify-center">
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
                            <div className='w-3/4'>
                                <div className=' border-r-2 border-gray-200 pt-16 pr-6'>
                                    <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
                                    <div className="flex items-center text-gray-500 text-sm my-2">
                                        <MdOutlineDateRange className="mr-1" />
                                        {toFromNow(Date.parse(blog.$createdAt))}
                                    </div>
                                    <div className="mt-6 prose prose-slate max-w-none">
                                        <Viewer value={blog.content} plugins={plugins} />
                                    </div>

                                </div>
                                <div className='flex flex-wrap gap-2 mt-36'>
                                    {blog.tags.map((tag: any) => (
                                        <ArticleTag key={tag.tag_name} icon={getTagIcon(tag.tag_name)} tagName={tag.tag_name} />
                                    ))}</div>
                            </div>

                            <div className="flex flex-col pl-8 pt-8">
                                <div className="text-xl my-10">作者</div>
                                <div className="flex items-center space-x-3 cursor-pointer">
                                    <Avatar>
                                        <AvatarImage src='https://avatars.githubusercontent.com/u/18780761?v=4' />
                                    </Avatar>
                                    <div className="flex flex-col space-y-3 ">
                                        <div className="font-bold text-sm">猫颜</div>
                                        <div className="text-sm text-zinc-500">
                                            一花一世界，一叶一追寻
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xl my-10">分享至</div>
                                <ul className="grid grid-cols-4 gap-2">
                                    <FaLink className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    <SiTencentqq className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    <SiWechat className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    <SiSinaweibo className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    <SiX className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    <SiFacebook className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    <SiGmail className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                    <SiZhihu className="border w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer border-stone-300" />
                                </ul>
                                <MarkdownTOC
                                    markdown={blog.content}
                                    className="sticky top-32 mt-16"
                                    maxDepth={3}
                                />
                            </div>
                        </div>

                    ) : (
                        <div className="py-10 text-center">
                            <p className="text-gray-500">博客文章不存在或已被删除</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
}
