import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { useData } from '../context';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const { user, handleUser, handleSnackBar } = useData()
    const [userMenu, setUserMenu] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setUserMenu(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setUserMenu(null);
    };

    const handleDashboard = () => {
        navigate('/dashboard')
        setUserMenu(null);
    }

    const handleLogOut = () => {
        localStorage.removeItem("user")
        handleSnackBar({
            open: true,
            severity: "success",
            message: "Log out successfully!"
        })
        navigate('/sign-in')
        setUserMenu(null);
        handleUser(null)
        window.location.reload()
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters style={{ minHeight: '46px', maxWidth: "1000px", margin: '0px auto' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 600,
                            letterSpacing: '.3px',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Expense Tracker
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 600,
                            fontSize: '20px',
                            letterSpacing: '.3px',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Expense Tracker
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        {user && <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar style={{ height: '35px', width: '35px' }}>{user.name.charAt(0).toUpperCase()}</Avatar>
                            </IconButton>
                        </Tooltip>}
                        <Menu
                            sx={{ mt: '30px' }}
                            id="menu-appbar"
                            anchorEl={userMenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(userMenu)}
                            onClose={handleCloseUserMenu}
                        >
                            <Link to='dashboard'>
                                <MenuItem onClick={handleDashboard}>
                                    <Typography textAlign="center">Dashboard</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={handleLogOut}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
