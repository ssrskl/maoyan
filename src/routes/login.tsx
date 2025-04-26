import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconInput } from '@/components/ui/icon-input'
import { PasswordInput } from '@/components/ui/password-input'
import React from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

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
)

function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">登录</h1>
        <p className="text-gray-500">请输入您的账号和密码</p>
      </div>
      
      <div className="space-y-4">
        <IconInput 
          icon={<UserIcon />}
          placeholder="输入用户名..."
          iconPosition="left"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <PasswordInput 
          value={password}
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
        
        <Button className="w-full" onClick={() => console.log('登录', { username, password })}>
          登录
        </Button>
      </div>
    </>
  )
} 