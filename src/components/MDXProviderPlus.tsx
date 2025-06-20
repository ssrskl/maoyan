import { MDXProvider } from "@mdx-js/react";
import Admonition from "./Admonition";
import ClassLoaderOfJVM from "@/blogs/java/Class-Loader-Of-JVM.mdx";
import mdxfile from "@/lib/mdx";


const components = {
    h1: (props: any) => <h1 className="text-3xl font-bold mb-4 text-blue-600" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mb-3 text-green-600" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mb-2 text-purple-600" {...props} />,
    h4: (props: any) => <h4 className="text-lg font-bold mb-2 text-orange-600" {...props} />,
    h5: (props: any) => <h5 className="text-base font-bold mb-1 text-pink-600" {...props} />,
    h6: (props: any) => <h6 className="text-sm font-bold mb-1 text-indigo-600" {...props} />,
    div: (props:any) => {
        const className = props.className || '';
        
        // 处理 admonition 类型的组件
        if (className.startsWith('admonition-')) {
          const type = className.replace('admonition-', '') as 'info' | 'warning' | 'danger' | 'success';
          return <Admonition type={type}>{props.children}</Admonition>;
        }
        // 默认渲染
        return <div {...props} />;
      },
      p: (props:any) => <p className="text-base mb-4 text-gray-700" {...props}/>,
      code: (props:any) => <code className="px-1 py-0.5 bg-gray-100 rounded text-red-600" {...props}/>,
      a: (props:any) => <a className="text-blue-500 underline" {...props}/>,
      ul: (props:any) => <ul className="list-disc pl-6 mb-4" {...props}/>,
      ol: (props:any) => <ol className="list-decimal pl-6 mb-4" {...props}/>,
      li: (props:any) => <li className="mb-1" {...props}/>,
      blockquote: (props:any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props}/>

}

interface MDXProviderPlusProps {
    blogId: string;
}
export default function MDXProviderPlus({blogId}: MDXProviderPlusProps) {
    const mdx = mdxfile.find(item => item.title === blogId)
    console.log(ClassLoaderOfJVM)
    return (
        <MDXProvider>
            <div className="markdown-body">
                {mdx && <mdx.component components={components}/>}
            </div>
        </MDXProvider>
    )
}