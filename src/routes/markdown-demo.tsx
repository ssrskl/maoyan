import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import MarkdownTOCExample from '@/components/examples/MarkdownTOCExample';
import MarkdownEditorExample from '@/components/examples/MarkdownEditorExample';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import AdmonitionPlugin from '@/plugins/AdmonitionPlugin';
import BlockQuotePlugin from '@/plugins/BlockQuotePlugin';
import 'bytemd/dist/index.css';

export const Route = createFileRoute('/markdown-demo')({
  component: MarkdownDemo
});

// Markdown示例内容，包含各种admonition指令
const admonitionExample = `# Admonition 指令示例

这是一个展示如何使用 Markdown 指令创建提示框的示例。

## 信息提示

:::info
这是一个信息提示框。
可以包含**多行**内容和_格式化_文本。
:::

## 注意提示

:::note
这是一个注意提示框。
重要的信息应该放在这里。
:::

## 技巧提示

:::tip
这是一个技巧提示框。
提供有用的小技巧和建议。
:::

## 警告提示

:::warning
这是一个警告提示框。
用于提醒用户需要注意的重要事项。
:::

## 危险提示

:::danger
这是一个危险提示框。
表示可能导致严重后果的操作或信息。
:::
`;

// 块引用示例内容
const blockQuoteExample = `# 块引用示例

这是一个展示如何使用特殊语法创建块引用的示例。

## 基本用法

使用 \`[[(名称),(链接URL)]]\` 格式可以快速创建一个带样式的引用链接：

[[(百度搜索),(https://www.baidu.com)]]

[[(GitHub),(https://github.com)]]

## 在段落中使用

你可以在段落中插入块引用链接，这里是一个例子：我们可以使用 [[(React官网),(https://react.dev)]] 来查看React的官方文档，或者访问 [[(MDN Web Docs),(https://developer.mozilla.org)]] 来查看Web开发相关文档。

## 适用场景

块引用链接适合用于：

1. 文献引用和参考资料
2. 相关文章和推荐阅读
3. 定义术语的词汇表链接
4. 外部资源链接的突出显示
`;

function MarkdownDemo() {
  // 配置ByteMD插件
  const plugins = [
    gfm(),
    highlight(),
    AdmonitionPlugin(),
    BlockQuotePlugin()
  ];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Markdown 功能演示</h1>
      
      <Tabs defaultValue="toc" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="toc">目录示例</TabsTrigger>
          <TabsTrigger value="editor">编辑器示例</TabsTrigger>
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
        
        <TabsContent value="admonition" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Admonition 提示框效果</h2>
            <p className="text-muted-foreground mb-6">
              下面展示了各种提示框的实际效果，由 Markdown 指令生成。
            </p>
            <div className="prose max-w-none dark:prose-invert">
              <Viewer value={admonitionExample} plugins={plugins} />
            </div>
          </div>
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Markdown 源代码</h3>
            <pre className="text-sm overflow-auto p-4 bg-background rounded-lg">
              {admonitionExample}
            </pre>
          </div>
        </TabsContent>
        
        <TabsContent value="blockquote" className="p-4 border rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">块引用链接效果</h2>
            <p className="text-muted-foreground mb-6">
              下面展示了块引用链接的实际效果，使用特殊语法 [[(名称),(链接URL)]] 生成。
            </p>
            <div className="prose max-w-none dark:prose-invert">
              <Viewer value={blockQuoteExample} plugins={plugins} />
            </div>
          </div>
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Markdown 源代码</h3>
            <pre className="text-sm overflow-auto p-4 bg-background rounded-lg">
              {blockQuoteExample}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MarkdownDemo; 