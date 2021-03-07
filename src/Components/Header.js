import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Divider, List, ListItem, ListItemIcon, SwipeableDrawer, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { Link, Redirect } from 'react-router-dom';
import Routes from '../Constantes/Routes';
import { TitleBehaviour } from '../App';
import { isLoggedIn, logout } from '../Helpers/Auth';

const icons = [<AccountCircleIcon />, <NotificationsIcon />, <HomeIcon />, <ExitToAppIcon />]

export default function Header(props) {
    let [drawer, setDrawer] = useState(false)
    let [redirect, setRedirect] = useState(false)
    const LList = () => (
        <div
            role="presentation"
            onClick={()=>setDrawer(false)}
            onKeyDown={()=>setDrawer(false)}
        >
            <List>
                <Link to={Routes.home} style={{textDecoration:'none', color:'gray'}}>
                    <ListItem button key={'Home'}>
                        <ListItemIcon>{icons[2]}</ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                </Link>
                <Link to={Routes.profile} style={{textDecoration:'none', color:'gray'}}>
                    <ListItem button key={'Profile'}>
                        <ListItemIcon>{icons[0]}</ListItemIcon>
                        <ListItemText primary={'Profile'} />
                    </ListItem>
                </Link>
                <Link to={Routes.notifications} style={{textDecoration:'none', color:'gray'}}>
                    <ListItem button key={'Notifications'}>
                        <ListItemIcon>{icons[1]}</ListItemIcon>
                        <ListItemText primary={'Notifications'} />
                    </ListItem>
                </Link>
                <Link style={{textDecoration:'none', color:'gray'}}
                    onClick={()=>{
                        logout()
                        setRedirect(true)
                    }}>
                    <ListItem button key={'Logout'}>
                        <ListItemIcon>{icons[3]}</ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
        </div>
    );
    return (
        <>
            <React.Fragment key='left'>
                <SwipeableDrawer
                    anchor='left'
                    open={drawer}
                    onClose={() => setDrawer(false)}
                    onOpen={() => setDrawer(true)}
                >
                    <LList></LList>
                </SwipeableDrawer>
            </React.Fragment>
            <AppBar position="fixed" color="primary" style={{ top: 0 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => { let c = isLoggedIn() ? setDrawer(true) : '' }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {TitleBehaviour.title || 'Elderly'}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
            {redirect && <Redirect to={Routes.login}></Redirect>}
        </>
    )
}