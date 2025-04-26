
import Header from '@/components/Header'
import { Outlet } from '@tanstack/react-router'

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}