// src/Layout.tsx
import React from 'react'
import { AppBar, Toolbar, Typography, Container, CssBaseline, Fade, Fab } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import HideOnScroll from '../HideOnScroll/HideOnScroll'
import ScrollTop from '../ScrollTop/ScrollTop'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import RequireAuth from '../../protected/RequiredAuth'
import Header from '../Header/Header'
const Layout: React.FC = ({ props }: any) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Header />
        </AppBar>
      </HideOnScroll>
      <Toolbar id='back-to-top-anchor' />
      <Outlet />
      <ScrollTop {...props}>
        <Fab size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}

export default Layout
