import Header from '@/components/layouts/Header'
import useAuth from '@/hooks/useAuth';
import React from 'react'

const headerHeight = "3rem";

const Mypage = () => {
  const { isLogin } = useAuth();
  return (
    isLogin ? (
      <Header headerHeight={headerHeight} />
    ) : null
  )
}

export default Mypage