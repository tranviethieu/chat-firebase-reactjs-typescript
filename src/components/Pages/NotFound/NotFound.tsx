// src/components/NotFound.tsx
import Button from '@mui/material/Button'
import React, { Fragment } from 'react'
import styles from './NotFound.module.scss' // Import module SCSS
import { useNavigate } from 'react-router-dom'
const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const handleBackHome = () => {
    navigate('/about')
  }
  return (
    <Fragment>
      <header>
        <title>403 - Not forbidden</title>
      </header>
      <div className={styles.page404}>
        <div className='image404'>{/* <ImageFill className='image' default src='/static/images/404.png' /> */}</div>
        <h3 style={{ textAlign: 'center', fontSize: '124px', color: '#4979d1', marginBottom: '30px' }}>403</h3>
        <h2>Rất tiếc!!!</h2>
        <p>Trang bạn đang tìm kiếm không được được quyền truy cập.</p>
        <div>
          <Button variant='contained' color='primary' size='medium' onClick={handleBackHome}>
            Trở về trang chủ
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default NotFound
