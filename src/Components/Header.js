import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
// import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core';

export default function Header(){
    return (
        // <div style={{height:'10vh', alignItems:'center', flexDirection:'row', display:'flex', backgroundColor:'InfoBackground', justifyContent:'center', fontWeight:'bolder'}}>
        //     Suivi des personnes agées
        // </div>
        <AppBar position="fixed" color="primary" style={{top: 0}}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open drawer">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    Suivi des personnes agées
                </Typography>
                {/* <Fab color="secondary" aria-label="add" style={{position: 'absolute', zIndex: 1, top: -30, left: 0, right: 0, margin: '0 auto'}}>
                    <AddIcon />
                </Fab> */}
                <div style={{flexGrow: 1}} />
            </Toolbar>
        </AppBar>
    )
}