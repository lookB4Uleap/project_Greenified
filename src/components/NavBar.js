// import React, { useEffect } from 'react'
// import { NavLink } from 'react-router-dom'
// // import Home from './Home'
// import '../component-styles/NavBar.css'
import Logo from '../Logo'
// import { auth } from '../Firebase'
// // import { useAuthState } from 'react-firebase-hooks/auth'
// import UserOptions from './UserOptions'


// const NavBar = ({ user }) => {

//     const logoutUser = async () => {
//         await auth.signOut()
//         alert('Logged Out')
//     }

//     useEffect(() => {
//     }, [])
        
//     return (
        
//             <nav className='Navbar'>
//                 <Logo />
//                 { user  ? 
                         
//                        <UserOptions logoutUser = {logoutUser} user={user} /> :
//                         <NavLink exact to='/login'
//                         className='Link'
//                         activeClassName='ActiveLink'>
//                            Login
//                        </NavLink>       
//                 }
//             </nav>
            
//     )
// }

// export default NavBar

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { useHistory } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [user, loading] = useAuthState(auth)
  const history = useHistory()

//   React.useEffect(() => {
//       console.log(history)
//   })

  const logoutUser = async () => {
        await auth.signOut()
        alert('Logged Out')
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="Navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Greenified
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Tooltip title="Menu">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
                <MenuItem onClick={
                    () => {
                        handleCloseNavMenu()
                        history.replace("/")
                    }
                }>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={
                    () => {
                        handleCloseNavMenu()
                        if (history.location.pathname !== "/news")
                        history.push("/news")
                    }
                }>
                  <Typography textAlign="center">News</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Greenified
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            <Button
                onClick={
                    () => {
                        handleCloseNavMenu()
                        history.replace("/")
                    }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
            </Button>
            <Button
                onClick={
                    () => {
                        handleCloseNavMenu()
                        history.replace("/news")
                    }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                News
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {
            user ?
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={user?.photoURL} />
              </IconButton>
            </Tooltip> : 
            <Button color="inherit" onClick = {() => history.replace("/login") }>Login</Button>
            }
            {
            user ? 
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
                <MenuItem  onClick={
                    () => {
                        handleCloseNavMenu()
                        if (history.location.pathname !== "/yourPosts")
                        history.push("/yourPosts")
                    }
                } >
                  <Typography textAlign="center">My Posts</Typography>
                </MenuItem>
                <MenuItem  onClick={
                    () => {
                        handleCloseNavMenu()
                        logoutUser()
                    }
                } >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                
            </Menu> : 
            <></>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
