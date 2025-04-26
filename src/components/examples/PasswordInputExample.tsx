import React from 'react';
import { PasswordInput } from '../ui/password-input';

export function PasswordInputExample() {
  const [password, setPassword] = React.useState('');

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">密码输入框示例</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">密码</label>
        <PasswordInput 
          value={password}
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">组件特点</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>密码可见性切换</li>
          <li>密码强度实时检测</li>
          <li>密码强度等级指示器</li>
          <li>简洁美观的界面设计</li>
        </ul>
      </div>
    </div>
  );
} 