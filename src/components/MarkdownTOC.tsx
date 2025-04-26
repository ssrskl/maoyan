import React, { useEffect, useMemo } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useMount } from 'ahooks';

export interface TOCItem {
  id: string;
  level: number;
  text: string;
}

export interface MarkdownTOCProps {
  markdown: string;
  className?: string;
  maxDepth?: number;
  onItemClick?: (id: string) => void;
}

/**
 * 解析 Markdown 内容并提取标题
 */
const parseMarkdownHeadings = (markdown: string, maxDepth: number = 3): TOCItem[] => {
  // 匹配 Markdown 标题: # 标题, ## 标题, 等
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    // 只包含指定深度的标题
    if (level <= maxDepth) {
      const text = match[2].trim();
      // 创建一个 ID（基于文本的 slug）
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

      headings.push({ id, level, text });
    }
  }

  return headings;
};
const parseHeadingsFromDOM = (maxDepth: number = 3): TOCItem[] => {
  const container = document.querySelector('.markdown-body');
  if (!container) {
    return [];
  }

  // 获取所有标题元素（h1, h2, h3 等）
  const headingTags = Array.from({ length: maxDepth }, (_, i) => `h${i + 1}`);
  const headings = container.querySelectorAll(headingTags.join(','));

  const tocItems: TOCItem[] = [];
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1), 10); // 从 h1, h2 中提取 level
    const id = heading.id;
    const text = heading.textContent?.trim() || '';

    // 确保 id 和 text 存在
    if (id && text) {
      tocItems.push({ id, level, text });
    }
  });

  return tocItems;
};

export const MarkdownTOC: React.FC<MarkdownTOCProps> = ({
  markdown,
  className,
  maxDepth = 3,
  onItemClick,
}) => {
  const [headings, setHeadings] = React.useState<TOCItem[]>([]);
  useMount(() => {
    setHeadings(parseHeadingsFromDOM(maxDepth));
    // headings = useMemo(() => parseHeadingsFromDOM(maxDepth), [maxDepth]);
    if (headings.length === 0) {
      return null;
    }
  });
  // const headings = useMemo(() => parseMarkdownHeadings(markdown, maxDepth), [markdown, maxDepth]);


  const handleItemClick = (id: string) => {
    if (onItemClick) {
      onItemClick(id);
    } else {
      // 默认行为：滚动到锚点
      const element = document.getElementById(id);
      if (element) {
        element.getBoundingClientRect();
        const scrollY = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
        // element.scrollIntoView({behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={cn('markdown-toc', className)}>
      <h3 className="text-lg font-semibold mb-2">目录</h3>
      <Table>
        <TableBody>
          {headings.map((heading) => (
            <TableRow key={heading.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell
                className={cn(
                  'py-1 border-0',
                  heading.level === 1 ? 'pl-0' : `pl-${(heading.level - 1) * 4}`
                )}
                onClick={() => handleItemClick(heading.id)}
              >
                {heading.text}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarkdownTOC; 