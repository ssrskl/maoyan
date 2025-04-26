import { databases } from '@/lib/appwrite'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { ArticleTag } from '@/components/ArticleTag'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { MdOutlineDateRange } from 'react-icons/md'
import { toFromNow } from '@/lib/time'

export const Route = createFileRoute('/_layout/blog/$blogId')({
    component: BlogDetail,
})

function BlogDetail() {
    const { blogId } = useParams({ from: '/_layout/blog/$blogId' });
    
    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const response = await databases.getDocument(
                '674ea924002fc5b22567',
                '674ea93300318c2482e7',
                blogId
            )
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
                                <BreadcrumbLink>{isLoading ? '加载中...' : blog?.title}</BreadcrumbLink>
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
                        <>
                            <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
                            <div className="flex items-center text-gray-500 text-sm my-2">
                                <MdOutlineDateRange className="mr-1" />
                                {toFromNow(Date.parse(blog.$createdAt))}
                            </div>
                            <ArticleTag icon={blog?.icon} tagName={blog?.tag} />
                            <div className="mt-6 prose prose-slate max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: blog.content || '<p>暂无内容</p>' }} />
                            </div>
                        </>
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
