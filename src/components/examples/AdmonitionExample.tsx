import React, { useState } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import 'bytemd/dist/index.css';
import { RenderPlugin } from '@/plugins/RenderPlugin';
import RemarkExtensionPlugin from '@/plugins/RemarkExtensionPlugin';

const plugins = [
  gfm(),
  RemarkExtensionPlugin(),
  RenderPlugin()
];

const exampleMarkdown = `# Admonition 示例

这是一个展示自定义组件的示例。

## 使用 Admonition 组件

下面是不同类型的提示框:

:::admonition type="info" title="信息提示"
这是一个信息提示框，用于显示重要信息。
:::

:::admonition type="success" title="成功提示"
这是一个成功提示框，用于显示操作成功的信息。
:::

:::admonition type="warning" title="警告提示"
这是一个警告提示框，用于显示需要注意的信息。
:::

:::admonition type="danger" title="危险提示"
这是一个危险提示框，用于显示可能导致严重后果的信息。
:::

## 不带标题的提示框

:::admonition type="info"
这是一个没有自定义标题的信息提示框。
:::

## 带有内联标记的提示框

:::admonition type="success"
这是一个带有**加粗文本**和*斜体文本*的提示框。
:::
`;

const AdmonitionExample: React.FC = () => {
  const [markdown] = useState(exampleMarkdown);

  return (
    <div className="p-4">
      <div className="prose max-w-none dark:prose-invert">
        <Viewer value={markdown} plugins={plugins} />
      </div>
    </div>
  );
};

export default AdmonitionExample; 