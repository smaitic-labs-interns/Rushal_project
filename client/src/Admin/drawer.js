import React from 'react'
import styled from '@emotion/styled';
import MuiDrawer from '@mui/material/Drawer';
import { mainlistItems } from './listItems';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import NotAuth from '../components/notAuth';


export const Drawer = () => {
    const drawerWidth = 240;
    const {role} = useSelector(state => state.user)
    const Drawer = styled (MuiDrawer , {shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              width: theme.spacing(7),
              [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
              },
            }),
          },
        }),
      );

  return (
    <>
    {role === "admin" &&
    <Drawer variant="permanent" open={'open'}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >  
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainlistItems}
          </List>
        </Drawer>
}
{role === "user" && <NotAuth />}
       </> 

  )
}
