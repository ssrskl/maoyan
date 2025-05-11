import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import type { Tag } from '@/types/Tag';
import type { ReactNode } from 'react';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  tags: Tag[];
}

// 高亮搜索词的辅助函数
const highlightText = (text: string, searchTerm: string): ReactNode[] => {
  if (!searchTerm || searchTerm.trim() === '') return [text];
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return <span key={index} className="bg-yellow-200 text-primary font-bold">{part}</span>;
    }
    return part;
  });
};

export default function SearchPage() {
  const search = useSearch({ from: '/search' });
  const navigate = useNavigate();
  const query = (search.q as string) || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const { documents } = await databases.listDocuments(
        "blog",
        "t_blog",
        [
          Query.search("title", searchTerm)
        ]
      )
      const results = documents.map((document: any) => ({
        id: document.$id,
        title: document.title,
        excerpt: document.description,
        tags: document.tags,
      }));
      setResults(results);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 使用TanStack Router导航
      navigate({
        to: '/search',
        search: { q: searchQuery.trim() },
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">搜索结果</h1>
      
      <form onSubmit={handleSearch} className="mb-8 flex gap-2 items-center">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-8"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          搜索
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="border border-border rounded-lg p-4 hover:shadow-md">
              <div className='fle items-center h-6 space-x-2'>
              {result.tags.map((tag) => (
                <div className='text-gray-400 text-sm flex gap-1' key={tag.tag_name}>
                  <p className='text-gray-400 text-sm'>
                    # {tag.tag_name}
                  </p>
                </div>
              ))}
                </div>
              <h2 className="text-xl font-semibold mb-2">
                <Link to="/blog/$blogId" params={{ blogId: result.id }} className="text-primary hover:underline">
                  {highlightText(result.title, query)}
                </Link>
              </h2>
              <p className="text-gray-600">{result.excerpt}</p>
              <Link to="/blog/$blogId" params={{ blogId: result.id }} className="text-sm text-primary hover:underline mt-2 inline-block">
                阅读更多 →
              </Link>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-10">
          <p className="text-lg">没有找到与 "{query}" 相关的内容</p>
          <p className="text-gray-500 mt-2">请尝试其他关键词或浏览我们的博客内容</p>
        </div>
      ) : null}
    </div>
  );
} 