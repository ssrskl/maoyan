import { createFileRoute } from '@tanstack/react-router';
import MarkdownTOCExample from '@/components/examples/MarkdownTOCExample';
import MarkdownEditorExample from '@/components/examples/MarkdownEditorExample';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import AdmonitionPlugin from '@/plugins/AdmonitionPlugin';
import BlockQuotePlugin from '@/plugins/BlockQuotePlugin';
import LineHighlightPlugin from '@/plugins/LineHighlightPlugin';
import 'bytemd/dist/index.css';

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

function MarkdownDemo() {
  // 配置ByteMD插件
  const plugins = [
    gfm(),
    highlight(),
    AdmonitionPlugin(),
    BlockQuotePlugin(),
    LineHighlightPlugin(),
  ];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Markdown 功能演示</h1>
      
      <Tabs defaultValue="toc" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="toc">目录示例</TabsTrigger>
          <TabsTrigger value="editor">编辑器示例</TabsTrigger>
          <TabsTrigger value="highlight">代码高亮示例</TabsTrigger>
          <TabsTrigger value="admonition">提示框示例</TabsTrigger>
          <TabsTrigger value="blockquote">块引用示例</TabsTrigger>
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
      </Tabs>
    </div>
  );
}

export default MarkdownDemo; 