import React, { useState, useEffect } from 'react';
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import 'bytemd/dist/index.css';
import { cn } from '@/lib/utils';
import BlockQuotePlugin from '@/plugins/BlockQuotePlugin';
import AdmonitionPlugin from '@/plugins/AdmonitionPlugin';
import CommonPlugin from '@/plugins/CommonPlugin';
import { ShikiPluginAlt } from '@/plugins/ShikiPluginAlt';
import { RenderPlugin } from '@/plugins/RenderPlugin';

interface MarkdownEditorProps {
  initialValue?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  maxTOCDepth?: number;
  height?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '',
  readOnly = false,
  className = '',
  onChange,
  height = '600px',
}) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // 插件配置
  const plugins = [
    gfm(),
    AdmonitionPlugin(),
    BlockQuotePlugin(),
    CommonPlugin(),
    ShikiPluginAlt(),
    RenderPlugin(),
  ];


  // 处理内容变化
  const handleChange = (v: string) => {
    setValue(v);
    if (onChange) {
      onChange(v);
    }
  };

  // 自定义编辑器高度样式
  const editorStyle = {
    '--editor-height': height,
  } as React.CSSProperties;

  return (
    <div className={cn('flex flex-col md:flex-row gap-6', className)}>
      <div className={cn('w-full')} style={editorStyle}>
        {readOnly ? (
          <div className="prose max-w-none dark:prose-invert">
            <Viewer value={value} plugins={plugins} sanitize={(schema: any) => {
              schema.attributes['*'].push('dataComponent')
              schema.attributes['*'].push('dataProps')
              return schema
            }} />
          </div>
        ) : (
          <Editor
            value={value}
            plugins={plugins}
            onChange={handleChange}
          />
        )}
      </div>
      <style>{`
        .bytemd {
          height: var(--editor-height) !important;
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor; 