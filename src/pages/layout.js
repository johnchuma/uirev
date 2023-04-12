import React from 'react'
import {Outlet} from 'react-router-dom'
import NavigationBar from '../widgets/navigation_bar'
const Layout = () => {
    return (
        <>
        <NavigationBar/>
        <Outlet/>
        </>
    )
}

export default Layout
