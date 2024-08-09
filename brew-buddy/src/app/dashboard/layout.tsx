'use client'

import { ReactNode, useState, MouseEvent } from 'react';
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
import HopsIcon from '../components/hopsIcon';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar({children}: {children: ReactNode}) {
    const { data: session, status } = useSession();
    const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setUserMenu(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserMenu(null);
    };

    const handleProfileClick = () => {
        console.log("userpage")
    }

    const handleLogout = () => {
        signOut({ callbackUrl: '/', redirect:true })
    }

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: "#1c9b1c" }}>
                <Container maxWidth={false}>
                    <Toolbar disableGutters={false}>
                        <HopsIcon />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/dashboard"
                            sx={{
                                mr: 5,
                                ml: 0.5,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Brew Buddy
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link href={'dashboard/recipe'} className='mr-10'>+ New Recipe</Link>
                            <Link href={'dashboard/ingredients'}>Ingredients</Link>
                        </Box>

                        <Box sx={{ flexGrow: 0, display: 'flex'}}>
                            {/* css doesn't get set if session hasn't loaded in yet */}
                            {/* apply css to div to make sure it is styled regardless */}
                            <div className='mr-5 mt-2'> 
                                <Typography >{session?.user.email}</Typography>
                            </div>
                            <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: "#213b64" }}>
                                    <ManageAccountsIcon />
                                </Avatar>
                            </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '45px' }}
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
                                <MenuItem key='Profile' onClick={handleProfileClick}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem key='Logout' onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </>
    );
}

export default ResponsiveAppBar;