import { IconInput } from '../ui/icon-input';

// 这里我们使用一个简单的 SVG 图标作为示例
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export function IconInputExample() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <h2 className="text-xl font-bold">图标输入框示例</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">左侧搜索图标</label>
        <IconInput
          icon={<SearchIcon />}
          placeholder="搜索..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">右侧用户图标</label>
        <IconInput
          icon={<UserIcon />}
          iconPosition="right"
          placeholder="输入用户名..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">无图标输入框</label>
        <IconInput
          placeholder="普通输入..."
        />
      </div>
    </div>
  );
} 