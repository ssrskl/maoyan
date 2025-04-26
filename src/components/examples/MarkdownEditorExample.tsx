import React, { useState } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';

const initialMarkdown = `# Markdown 编辑器与目录示例

这是一个示例 Markdown 文档，展示了编辑器和自动生成目录的功能。

## 使用方法

这个组件集成了 Markdown 编辑器和目录功能。

### 编辑模式

在编辑模式下，你可以编辑 Markdown 内容，目录会实时更新。

### 预览模式

在预览模式下，你只能查看 Markdown 内容，目录可以帮助你导航到不同的章节。

## 目录功能

目录会自动解析 Markdown 中的标题，并生成可点击的链接。

### 目录深度

你可以设置目录显示的最大深度，默认为 3 级。

## 自定义样式

你可以通过 className 属性自定义组件的样式。

## 块引用功能

我们支持特殊的块引用格式，使用方括号包括内容和URL：

[[(百度),(https://www.baidu.com)]]

[[(GitHub),(https://github.com)]]

这些会被转换为带有特殊样式的链接。

## 实现细节

### ByteMD 插件

我们使用 ByteMD 作为 Markdown 编辑器，并添加了自定义插件来支持目录功能。

### 响应式设计

目录在移动设备上会显示在内容上方，在桌面设备上则显示在侧边。
`;

const MarkdownEditorExample: React.FC = () => {
  const [value, setValue] = useState(initialMarkdown);
  const [isReadOnly, setIsReadOnly] = useState(false);
  
  const handleToggleMode = () => {
    setIsReadOnly(!isReadOnly);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Markdown 编辑器示例</h2>
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
        showTOC={true}
        maxTOCDepth={3}
      />
    </div>
  );
};

export default MarkdownEditorExample; 