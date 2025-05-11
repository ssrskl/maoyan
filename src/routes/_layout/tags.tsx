import { createFileRoute } from '@tanstack/react-router'
import TagsPage from '@/pages/TagsPage'

export const Route = createFileRoute('/_layout/tags')({
  component: () => <TagsPage />
}) 