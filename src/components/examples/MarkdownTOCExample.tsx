import React, { useState } from 'react';
import MarkdownTOC from '@/components/MarkdownTOC';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import 'bytemd/dist/index.css';

const plugins = [gfm()];

const exampleMarkdown = `# Markdown 示例文档

这是一个示例 Markdown 文档，用于展示目录功能。

## 一级标题

这是一级标题的内容。

### 1.1 二级标题

这是二级标题的内容。

### 1.2 另一个二级标题

这里有更多内容。

## 另一个一级标题

这是另一个一级标题下的内容。

### 2.1 二级标题

这是更多的内容。

#### 2.1.1 三级标题

这是三级标题的内容。
`;

const MarkdownTOCExample: React.FC = () => {
  const [markdown] = useState(exampleMarkdown);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-1/4 bg-muted/20 p-4 rounded-lg">
        <MarkdownTOC 
          markdown={markdown} 
          className="sticky top-20" 
          maxDepth={3}
        />
      </div>
      
      <div className="w-full md:w-3/4">
        <div className="prose max-w-none dark:prose-invert">
          <Viewer value={markdown} plugins={plugins} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownTOCExample; 