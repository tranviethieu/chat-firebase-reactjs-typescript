import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../../store/store'
import { auth } from '../../../firebase/firebase'
import { setStateLogin, setToken } from '../../../store/reducers/auth'
import { setInfoAccount } from '../../../store/reducers/user'
import { setLoading } from '../../../store/reducers/site'
import { AppContext } from '../../../Context/AppProvider'
import { AuthContext, AuthContextType } from '../../../Context/AuthProvider'
import { useContext } from 'react'

function Header() {
  const { user } = useContext(AuthContext) as AuthContextType
  //const { clearState } = useContext(AppContext)
  const pages = [
    { title: 'home', action: '/' },
    { title: 'about', action: '/about' },
    { title: 'profile', action: '/profile' },
    { title: 'chat', action: '/chat' }
  ]
  const settings = ['Profile', 'Account', 'Logout']
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (action: string) => {
    setAnchorElNav(null)
    if (action !== location.pathname) navigate(action)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    // clear state in App Provider when logout
    //clearState()
    auth.signOut()
  }
  return (
    <Container maxWidth='xl'>
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant='h6'
          noWrap
          component='a'
          href='#app-bar-with-responsive-menu'
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          LOGO
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.action}
                onClick={() => handleCloseNavMenu(page?.action)}
                sx={{
                  backgroundColor: location?.pathname === page?.action ? 'lightblue' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'lightblue'
                  }
                }}
              >
                <Typography textAlign='center'>{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant='h5'
          noWrap
          component='a'
          href='#app-bar-with-responsive-menu'
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {pages.map((page) => (
            <Button
              key={page.action}
              onClick={() => handleCloseNavMenu(page.action)}
              sx={{ my: 2, color: location?.pathname === page?.action ? 'white' : '#ccc', display: 'block' }}
            >
              {page.title}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={user?.displayName}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user?.displayName || 'aaaa'}
                src={user?.photoURL ? `${user?.photoURL}` : '/static/images/avatar/2.jpg'}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  handleCloseUserMenu()
                  setting == 'Logout' && handleLogout()
                }}
              >
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  )
}

export default Header
