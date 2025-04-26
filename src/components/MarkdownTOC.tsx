import React, { useEffect, useMemo, useState } from 'react';
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
  const [activeId, setActiveId] = useState<string>('');
  
  useMount(() => {
    setHeadings(parseHeadingsFromDOM(maxDepth));
    if (headings.length === 0) {
      return null;
    }
  });
  // const headings = useMemo(() => parseMarkdownHeadings(markdown, maxDepth), [markdown, maxDepth]);

  // 添加监听滚动事件以更新活跃的目录项
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean) as HTMLElement[];
      
      if (headingElements.length === 0) return;
      
      // 找到当前在视口中最上方的标题
      const scrollPosition = window.scrollY + 100; // 添加一点偏移量
      
      // 找到当前滚动位置之前的最后一个标题
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element.offsetTop <= scrollPosition) {
          setActiveId(element.id);
          return;
        }
      }
      
      // 如果没有找到，设置第一个为活跃
      if (headingElements.length > 0) {
        setActiveId(headingElements[0].id);
      }
    };
    
    // 初始化
    handleScroll();
    
    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

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
            <TableRow 
              key={heading.id} 
              className={cn(
                "cursor-pointer",
                activeId === heading.id ? "bg-primary/10" : "hover:bg-muted/50"
              )}
            >
              <TableCell
                className={cn(
                  'py-1 border-0',
                  heading.level === 1 ? 'pl-0' : `pl-${(heading.level - 1) * 4}`,
                  activeId === heading.id ? "font-medium text-primary" : ""
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