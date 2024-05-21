// src/Layout.tsx
import React from 'react'
import { AppBar, Toolbar, Typography, Container, CssBaseline, Fade, Fab } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import HideOnScroll from '../HideOnScroll/HideOnScroll'
import ScrollTop from '../ScrollTop/ScrollTop'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import RequireAuth from '../../protected/RequiredAuth'
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
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Outlet />
      </Container>
      <ScrollTop {...props}>
        <Fab size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}

export default Layout
