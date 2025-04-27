import React, { useState, useEffect } from 'react';
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import 'bytemd/dist/index.css';
import MarkdownTOC from './MarkdownTOC';
import { cn } from '@/lib/utils';
import BlockQuotePlugin from '@/plugins/BlockQuotePlugin';
import AdmonitionPlugin from '@/plugins/AdmonitionPlugin';
import LineHighlightPlugin from '@/plugins/LineHighlightPlugin';
import highlight from '@bytemd/plugin-highlight';

interface MarkdownEditorProps {
  initialValue?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  showTOC?: boolean;
  maxTOCDepth?: number;
}

// ByteMD 插件类型定义
interface BytemdPluginViewerEffectContext {
  markdownBody: HTMLElement;
}

// 创建一个自定义的 ByteMD 插件，为标题添加 ID
const headingAnchorPlugin = () => {
  return {
    viewerEffect({ markdownBody }: BytemdPluginViewerEffectContext) {
      // 为所有标题添加 ID
      const headings = markdownBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading: Element) => {
        const text = heading.textContent || '';
        const id = text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
        
        heading.id = id;
      });
    }
  };
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '',
  readOnly = false,
  className = '',
  onChange,
  showTOC = false,
  maxTOCDepth = 3
}) => {
  const [value, setValue] = useState(initialValue);
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  // 根据传入的initialValue更新内部状态
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // 插件配置
  const plugins = [
    gfm(),
    highlight(),
    headingAnchorPlugin(),
    BlockQuotePlugin(),
    AdmonitionPlugin(),
    LineHighlightPlugin(),
  ];

  // 处理内容变化
  const handleChange = (v: string) => {
    setValue(v);
    if (onChange) {
      onChange(v);
    }
  };

  return (
    <div className={cn('flex flex-col md:flex-row gap-6', className)}>
      {showTOC && value && (
        <div className="w-full md:w-1/4 mb-4 md:mb-0 bg-muted/20 p-4 rounded-lg">
          <MarkdownTOC 
            markdown={value}
            className="sticky top-20" 
            maxDepth={maxTOCDepth}
          />
        </div>
      )}

      <div className={cn('w-full', showTOC ? 'md:w-3/4' : 'w-full')}>
        {readOnly ? (
          <div className="prose max-w-none dark:prose-invert">
            <Viewer value={value} plugins={plugins} />
          </div>
        ) : (
          <Editor
            value={value}
            plugins={plugins}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor; 