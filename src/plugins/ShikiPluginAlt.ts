import type { BytemdPlugin } from "bytemd"
import { codeToHtml } from 'shiki'
import { transformerNotationDiff, transformerNotationFocus, transformerNotationHighlight } from '@shikijs/transformers'

const customTransformer = {
  name: 'highlight-empty-lines',
  line(node: { children: string | any[]; properties: { className: string[]; }; }, lineNumber: any) {
    if (!node.children.length) { // 检测空行
      node.properties.className = ['empty-line-highlight'];
    }
    return node;
  }
};

export function ShikiPluginAlt(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const els = markdownBody.querySelectorAll<HTMLElement>('pre>code')
      if (els.length === 0)
        return
      
      els.forEach(async (el) => {
        const lang = el.className.replace('language-', '')
        el.className = `${el.className} shiki-code`
        const codeContent = el.textContent || ''
        
        try {
          // 使用快捷方法直接处理代码
          const html = await codeToHtml(codeContent, {
            lang: lang || 'text',
            theme: 'one-light',
            transformers:[
              transformerNotationDiff(
                {matchAlgorithm: "v3"}
              ),
              transformerNotationFocus(
                {
                  matchAlgorithm: "v3",
                }
              ),
              transformerNotationHighlight(),

            ]
          }
        )
          
          if (el.parentElement) {
            el.parentElement.innerHTML = html
          }
        } catch (error) {
          console.error('Shiki highlighting error:', error)
        }
      })
    },
  }
} 