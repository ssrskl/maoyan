import type { BytemdPlugin } from "bytemd";

/**
 * ByteMD插件：用于高亮代码块中的特定行
 * 使用方式：在代码块前添加特殊注释 ```js {highlight-next-line} 或 ```js {1,3-5}
 */
export default function LineHighlightPlugin(): BytemdPlugin {
    return {
        viewerEffect({ markdownBody }) {
            // 获取所有代码块
            const codeBlocks = markdownBody.querySelectorAll('pre > code');
            
            codeBlocks.forEach((codeBlock) => {
                const pre = codeBlock.parentElement;
                if (!pre) return;
                
                // 获取代码块的前面元素，通常是隐藏的元素，包含原始信息
                const codeBlockInfo = pre.id || pre.className || '';
                const highlightNextLine = codeBlockInfo.includes('highlight-next-line');
                const highlightLines = extractHighlightLines(codeBlockInfo);
                
                if (highlightNextLine || highlightLines.length > 0) {
                    // 将代码块分割成行
                    const codeLines = codeBlock.innerHTML.split('\n');
                    
                    let html = '';
                    let nextLineHighlight = false;
                    
                    // 处理每一行代码
                    codeLines.forEach((line, index) => {
                        const shouldHighlight = 
                            (highlightNextLine && nextLineHighlight) || 
                            highlightLines.includes(index + 1);
                        
                        if (line.includes('// highlight-next-line') || 
                            line.includes('/* highlight-next-line */') ||
                            line.includes('<!-- highlight-next-line -->')) {
                            nextLineHighlight = true;
                            // 不显示高亮指示行
                            return;
                        } else {
                            // 如果当前行应该高亮
                            if (shouldHighlight) {
                                html += `<div class="highlighted-line">${line}</div>`;
                            } else {
                                html += `<div>${line}</div>`;
                            }
                            nextLineHighlight = false;
                        }
                    });
                    
                    // 替换原始代码块内容
                    codeBlock.innerHTML = html;
                    
                    // 添加样式
                    if (!document.getElementById('line-highlight-style')) {
                        const style = document.createElement('style');
                        style.id = 'line-highlight-style';
                        style.innerHTML = `
                            .highlighted-line {
                                background-color: rgba(255, 255, 0, 0.15);
                                display: block;
                                margin: 0 -16px;
                                padding: 0 16px;
                                border-left: 3px solid #f1c40f;
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }
            });
        }
    };
}

/**
 * 从代码块信息中提取要高亮的行号
 * 支持格式: {1,3-5,8}
 */
function extractHighlightLines(codeBlockInfo: string): number[] {
    const highlightLines: number[] = [];
    
    // 查找 {1,3-5,8} 格式的行号指定
    const match = codeBlockInfo.match(/{([^}]+)}/);
    if (match && match[1]) {
        const lineDefs = match[1].split(',');
        
        lineDefs.forEach(lineDef => {
            if (lineDef === 'highlight-next-line') {
                return;
            }
            
            if (lineDef.includes('-')) {
                // 处理范围，如 3-5
                const [start, end] = lineDef.split('-').map(Number);
                for (let i = start; i <= end; i++) {
                    highlightLines.push(i);
                }
            } else {
                // 处理单行，如 1
                highlightLines.push(Number(lineDef));
            }
        });
    }
    
    return highlightLines;
} 