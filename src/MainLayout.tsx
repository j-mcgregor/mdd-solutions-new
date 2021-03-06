import { NextPage } from 'next'
import * as React from 'react'
import { ContactDataProps, ImageProps } from '../types'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

interface MainLayoutProps {
    contact: ContactDataProps
    logo?: ImageProps
    invertNavLinks?: boolean
}

const MainLayout: NextPage<MainLayoutProps> = ({ contact, children, logo, invertNavLinks = false }) => {
    return (
        <>
            <Navbar logo={logo} invertNavLinks={invertNavLinks} />
            {children}
            <Footer {...contact} />
        </>
    )
}

export default MainLayout
