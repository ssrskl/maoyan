import { createFileRoute } from '@tanstack/react-router';
import MarkdownTOCExample from '@/components/examples/MarkdownTOCExample';
import MarkdownEditorExample from '@/components/examples/MarkdownEditorExample';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import AdmonitionPlugin from '@/plugins/AdmonitionPlugin';
import BlockQuotePlugin from '@/plugins/BlockQuotePlugin';
import { RenderPlugin } from '@/plugins/RenderPlugin';
import 'bytemd/dist/index.css';
import Like from '@/components/Like';
import Bookmark from '@/components/Bookmark';
import { Button } from '@/components/ui/button';
import MarkdownEditor from '@/components/MarkdownEditor';
import { useState, type ClassAttributes, type HTMLAttributes } from 'react';
import CommonPlugin from '@/plugins/CommonPlugin';
import { ShikiPluginAlt } from '@/plugins/ShikiPluginAlt';
import { CommentSection } from '@/components/CommentSection';
import { MDXProvider } from '@mdx-js/react';
import Class_Loader_Of_JVM from '@/blogs/java/Class-Loader-Of-JVM.mdx';
import type { JSX } from 'react/jsx-runtime';

export const Route = createFileRoute('/markdown-demo')({
  component: MarkdownDemo
});

// 添加一个包含代码高亮示例的Markdown字符串
const highlightExample = `
## 代码行高亮示例

### 使用 highlight-next-line 注释

\`\`\`javascript
// 下面是一个简单的函数
function hello(name) {
  // highlight-next-line
  return "Hello, " + name + "!";
}
console.log(hello("World"));
\`\`\`

### 使用行号指定高亮

\`\`\`javascript {2,4-5}
function sum(a, b) {
  // 这行会被高亮
  const result = a + b;
  // 这行会被高亮
  return result; // 这行会被高亮
}
\`\`\`
`;

// 添加提示框示例
const admonitionExample = `
# 提示框示例

:::info
这是一个信息提示框
:::

:::warning
这是一个警告提示框
:::

:::danger
这是一个危险提示框
:::

:::success
这是一个成功提示框
:::
`;

// 添加块引用示例
const blockQuoteExample = `
# 块引用示例

这是一个普通段落。

[[(猫颜的博客),(https://maoyan.me)]]

段落中的 [[(GitHub),(https://github.com)]] 引用。

[[(Stack Overflow),(https://stackoverflow.com)]]
`;

// 添加自定义组件示例
const customComponentExample = `
# 自定义组件示例

:::admonition type="info" title="自定义信息提示"
这是使用自定义组件语法创建的信息提示框。
:::

:::admonition type="success" title="自定义成功提示"
这是使用自定义组件语法创建的成功提示框，支持**Markdown格式**。
:::

:::admonition type="warning" title="自定义警告提示"
这是使用自定义组件语法创建的警告提示框。
:::

:::admonition type="danger" title="自定义危险提示"
这是使用自定义组件语法创建的危险提示框。
:::
`;

const commentExample = `
# 评论示例

这是一个评论示例。
`;


function MarkdownDemo() {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [value, setValue] = useState('');
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
  const handleToggleMode = () => {
    setIsReadOnly(!isReadOnly);
  };
  const components = {
    em(properties: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>){
      return <i {...properties} className='text-red-500' />
    },
    h1: (props: any) => <h1 className="text-3xl font-bold mb-4 text-blue-600" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mb-3 text-green-600" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mb-2 text-purple-600" {...props} />,
    h4: (props: any) => <h4 className="text-lg font-bold mb-2 text-orange-600" {...props} />,
    h5: (props: any) => <h5 className="text-base font-bold mb-1 text-pink-600" {...props} />,
    h6: (props: any) => <h6 className="text-sm font-bold mb-1 text-indigo-600" {...props} />,
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">测试</h1>

      <Tabs defaultValue="toc" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="toc">目录示例</TabsTrigger>
          <TabsTrigger value="editor">编辑器示例</TabsTrigger>
          <TabsTrigger value="highlight">代码高亮示例</TabsTrigger>
          <TabsTrigger value="admonition">提示框示例</TabsTrigger>
          <TabsTrigger value="blockquote">块引用示例</TabsTrigger>
          <TabsTrigger value="custom">自定义组件</TabsTrigger>
          <TabsTrigger value="like">点赞示例</TabsTrigger>
          <TabsTrigger value="publish">发文示例</TabsTrigger>
          <TabsTrigger value="comment">评论示例</TabsTrigger>
          <TabsTrigger value="tag">MDX测试</TabsTrigger>
        </TabsList>

        <TabsContent value="toc" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Markdown 目录组件</h2>
            <p className="text-muted-foreground">
              这个示例展示了如何使用 MarkdownTOC 组件来为 Markdown 内容生成目录。
              目录会自动提取标题并创建链接，允许用户快速导航到文档的不同部分。
            </p>
          </div>
          <MarkdownTOCExample />
        </TabsContent>

        <TabsContent value="editor" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Markdown 编辑器与目录</h2>
            <p className="text-muted-foreground">
              这个示例展示了编辑器和目录的集成。你可以在编辑模式下修改内容，
              或在预览模式下浏览内容并使用目录导航。
            </p>
          </div>
          <MarkdownEditorExample />
        </TabsContent>

        <TabsContent value="highlight" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">代码行高亮示例</h2>
            <p className="text-muted-foreground">
              这个示例展示了如何在代码块中高亮特定行。支持两种方式：
            </p>
            <ol className="list-decimal pl-5 mt-2 text-muted-foreground">
            </ol>
          </div>
          <div className="border p-4 rounded-lg bg-white">
            <Viewer value={highlightExample} plugins={plugins} />
          </div>
        </TabsContent>

        <TabsContent value="admonition" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">提示框示例</h2>
            <p className="text-muted-foreground">
              这个示例展示了如何使用 AdmonitionPlugin 创建各种提示框。
              提示框包括信息、警告、危险和成功四种类型。
            </p>
          </div>
          <div className="border p-4 rounded-lg bg-white">
            <Viewer value={admonitionExample} plugins={plugins} />
          </div>
        </TabsContent>

        <TabsContent value="blockquote" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">块引用示例</h2>
            <p className="text-muted-foreground">
              这个示例展示了如何使用 BlockQuotePlugin 创建引用块。
              使用 [[(名称),(链接)]] 语法可以创建带有链接的引用。
            </p>
          </div>
          <div className="border p-4 rounded-lg bg-white">
            <Viewer value={blockQuoteExample} plugins={plugins} />
          </div>
        </TabsContent>

        <TabsContent value="custom" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">自定义组件示例</h2>
            <p className="text-muted-foreground">
              这个示例展示了如何使用 RemarkExtensionPlugin 创建自定义组件。
              使用 :::组件名 参数 内容 ::: 语法可以创建自定义组件。
            </p>
          </div>
          <div className="border p-4 rounded-lg bg-white">
            <Viewer value={customComponentExample} plugins={plugins} />
          </div>
        </TabsContent>
        <TabsContent value="like" className="p-4 border rounded-lg">
          <Like blogId="123" />
          <Bookmark />
        </TabsContent>

        <TabsContent value='publish' className='p-4 border rounded-lg'>
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">发布文章</h2>
              <Button
                onClick={handleToggleMode}
                variant="default"
              >
                {isReadOnly ? '切换到编辑模式' : '切换到预览模式'}
              </Button>
            </div>

            <MarkdownEditor
              initialValue={value}
              readOnly={isReadOnly}
              onChange={setValue}
              maxTOCDepth={3}
            />
          </div>
          <Button className='mt-4'>发布</Button>
        </TabsContent>
        <TabsContent value='comment' className='p-4 border rounded-lg'>
          <CommentSection 
            comments={[
              {
                id: '1',
                content: '这是一个评论',
                user: {
                  name: '张三',
                  avatarUrl: 'https://example.com/avatar.jpg'
                },
                timestamp: '2021-01-01 12:00:00',
                replies:[
                  {
                    id: '2',
                    content: '这是一个回复',
                    user: {
                      name: '李四',
                      avatarUrl: 'https://example.com/avatar.jpg'
                    },
                    timestamp: '2021-01-01 12:00:01',
                    replies:[
                      {
                        id: '3',
                        content: '这是一个回复的回复',
                        user: {
                          name: '王五',
                          avatarUrl: 'https://example.com/avatar.jpg'
                        },
                        timestamp: '2021-01-01 12:00:02',
                      }
                    ]
                  }
                ]
              },              
            ]} 
            onCommentSubmit={() => {}} 
            onReplySubmit={() => {}} 
          />
        </TabsContent>
        <TabsContent value='tag' className='p-4 border rounded-lg'>
          <div className="container mx-auto p-4 markdown-body">
            {/* <MDXProviderPlus> */}
            <MDXProvider components={{h2: (props: any) => <h2 className="text-2xl font-bold mb-3 text-green-600" {...props} />}}>
              
            </MDXProvider>
              
            {/* </MDXProviderPlus> */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MarkdownDemo; 