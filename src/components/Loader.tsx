import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoaderProps {
  tip?: string
  size?: 'small' | 'default' | 'large'
}

const Loader: React.FC<LoaderProps> = ({ tip = 'Loading...', size = 'large' }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      <Spin indicator={antIcon} tip={tip} size={size} />
    </div>
  )
}

export default Loader
