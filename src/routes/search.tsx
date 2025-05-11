import { createFileRoute } from '@tanstack/react-router'
import SearchPage from '@/pages/SearchPage'

// 定义搜索路由
export const Route = createFileRoute('/search')({
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>) => {
    // 验证搜索参数
    return {
      q: search.q ? String(search.q) : ''
    }
  }
}) 