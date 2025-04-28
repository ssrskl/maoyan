import type { BytemdPlugin } from "bytemd"
import { createHighlighter, type Highlighter, type BundledLanguage, type BundledTheme } from 'shiki'

export function ShikiPlugin(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const els = markdownBody.querySelectorAll<HTMLElement>('pre>code')
      if (els.length === 0)
        return
      
      // 初始化高亮器
      createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json', 'markdown', 'yaml', 'bash'],
      }).then((highlighter: Highlighter) => {
        els.forEach(el => {
          const lang = el.className.replace('language-', '') as BundledLanguage
          el.className = `${el.className} shiki-code`
          const codeContent = el.textContent || ''
          
          try {
            // 使用高亮器处理代码
            const html = highlighter.codeToHtml(codeContent, {
              lang: lang || 'text',
              theme: 'github-light' as BundledTheme
            })
            
            if (el.parentElement) {
              el.parentElement.innerHTML = html
            }
          } catch (error) {
            console.error('Shiki highlighting error:', error)
          }
        })
      }).catch((err: unknown) => {
        console.error('Failed to load Shiki highlighter:', err)
      })
    },
  }
}