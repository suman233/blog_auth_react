import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Auth/Authtext'
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
import AdbIcon from '@mui/icons-material/Adb';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';

const privatePages = ['Home', 'About', 'Courses', 'Show', 'Blog', 'Contact'];
const publicPage = ['Login']
const settings = ['Profile', 'Settings', 'Logout'];

const Navbar = () => {

    const [auth, setAuth] = useAuth()

    const nav = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('auth')
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        toast.success('Logout Successfully')
        nav('/')
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <>
            {/* <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Navbar</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/about">About</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/courses">Courses</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/blog">Blog</Link>
                            </li>
                            {
                                !auth.user ? (
                                    <>
                                        <li class="nav-item">
                                            <Link class="nav-link" to="/register">Register</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link class="nav-link" to="/">Login</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li class="nav-item">
                                            <Link class="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                                        </li>
                                    </>
                                )
                            }

                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav> */}

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Blog App
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            {
                                !auth.user ? null : (
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
                                        {privatePages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center" onClick={() => nav(`/${page}`)}>{page}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                )
                            }

                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Blog App
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                !auth.user ? null : (
                                    <>
                                        {privatePages.map((page) => (
                                            <Button
                                                key={page}
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: 'white', display: 'block' }}
                                                component={Link} to={`/${page}`}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </>
                                )
                            }

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {
                                !auth.user ? (
                                    <>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                            component={Link} to={`/`}
                                        >
                                            {publicPage}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt={auth.user.name} src="/static/images/avatar/2.jpg" />
                                            </IconButton>
                                        </Tooltip>
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
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center"
                                                        onClick={setting == 'Logout' ? (
                                                            // ()=>handleLogout()
                                                            handleOpen
                                                        ) : () => nav(`/${setting}`)}
                                                    >
                                                        {setting}
                                                    </Typography>
                                                    <Modal
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby="child-modal-title"
                                                            aria-describedby="child-modal-description"
                                                        >
                                                            <Box sx={{ ...style, width: 300, textAlign: 'center' }}>
                                                                <h2>Waana go away?</h2>
                                                                <p>Are you sure...you want to logout?</p>
                                                                <Button onClick={handleLogout}>Logout</Button>
                                                            </Box>
                                                        </Modal>
                                                    {/* <Button
                                                        key={setting}
                                                        component={Link}
                                                        to={`/${setting}`}
                                                    >{setting}</Button> */}
                                                    {/* <MenuItem component={Link} to='/profile'>Profile</MenuItem>
                                                    <MenuItem>Settings</MenuItem>
                                                    <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                )
                            }

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar