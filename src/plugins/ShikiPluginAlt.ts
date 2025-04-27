import type { BytemdPlugin } from "bytemd"
import { codeToHtml } from 'shiki'
import { transformerMetaHighlight, transformerNotationDiff, transformerNotationFocus, transformerNotationHighlight, transformerRemoveNotationEscape } from '@shikijs/transformers'

export function ShikiPluginAlt(options?: any): BytemdPlugin {
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
              transformerRemoveNotationEscape(),
              transformerNotationDiff(
                {matchAlgorithm: "v3"}
              ),
              transformerNotationFocus(
                {
                  matchAlgorithm: "v3",
                }
              ),
              transformerMetaHighlight(
                {
                  className: "highlighted"
                }
              ),
              transformerNotationHighlight({matchAlgorithm: "v3"}),

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