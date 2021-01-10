import { NextPage } from 'next'
import * as React from 'react'
import { ContactDataProps, ImageProps } from '../types'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

interface MainLayoutProps {
    contact: ContactDataProps
    logo?: ImageProps
}

const MainLayout: NextPage<MainLayoutProps> = ({ contact, children, logo }) => {
    return (
        <>
            <Navbar logo={logo} />
            {children}
            <Footer {...contact} />
        </>
    )
}

export default MainLayout
