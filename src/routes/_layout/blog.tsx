import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/blog')({
    component: Blog,
})

function Blog() {
    return <div className="flex justify-center pt-10">
        <div className="flex w-2/3">
            <div className="gap-5 flex flex-col justify-center px-6 w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">首页</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">博客</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-4xl font-bold my-4">博客</h1>
                <p>这里是写的一些博客文章</p>

                {/* 博客文章列表 */}

                <ul className="grid grid-cols-2 gap-x-4 gap-y-10 w-full">
                    {blogs ? (
                        blogs.documents.map((blog) => (
                            <li
                                key={blog.$id}
                                className="animate-fade-up animate-ease-in-out hover:shadow-lg rounded-lg"
                                style={{
                                    animationDelay: `${getDelay()}ms`,
                                }}
                            >
                                <div
                                    className="flex flex-col rounded-lg bg-white h-full hover:bg-stone-200 p-4 cursor-pointer"
                                    onClick={() => {
                                        navigate("/blogdetail/" + blog.$id);
                                    }}
                                >
                                    <div className="flex items-center h-6 space-x-2">
                                        {blog.tags &&
                                            blog.tags.map((tag) => (
                                                <div className="text-gray-400 text-sm flex gap-1">
                                                    <p className="text-gray-400 text-sm hover:underline">
                                                        # {tag.tag_name}
                                                    </p>
                                                    <Icon icon={tag.tag_icon} className="w-4 h-4" />
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
                                            71
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div>暂无数据</div>
                    )}
                </ul>

                {/**分页器 */}
                <div className="flex justify-center mt-16">
                    <Pagination total={2} showSizeChanger={false} />
                </div>
            </div>
        </div>
    </div>
}
