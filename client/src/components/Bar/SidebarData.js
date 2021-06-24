import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import Register from '@material-ui/icons/PersonAddSharp';
import Escola from '@material-ui/icons/SchoolSharp';

export const SidebarData = [
    {
        title:"home",
        icon:<HomeIcon />,
        link:"/"
    },
    {
        title:"Register",
        icon:<Register />,
        link:"/register"
    },
    {
        title:"Escola",
        icon:<Escola />,
        link:"/escola"
    }

]