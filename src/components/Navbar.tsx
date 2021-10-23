import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

import { ImageProps } from '../../types'
import { useScrollPosition } from '../hooks/useScrollPosition'
import classNames from 'classnames'

interface NavbarProps {
    logo?: ImageProps
    invert?: boolean
}

const StyledLink = styled.a`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SWITCH_NAV_HEIGHT = {
    index: -803,
    other: -280,
}

const Navbar: NextPage<NavbarProps> = ({ logo }) => {
    const [transparent, setTransparent] = useState(true)
    const [otherTransparent, setOtherTransparent] = useState(true)

    useScrollPosition(
        ({ currPos }) => {
            const isIndexShow = currPos.y > SWITCH_NAV_HEIGHT.index
            const isOtherShow = currPos.y > SWITCH_NAV_HEIGHT.other
            setTransparent(isIndexShow)
            setOtherTransparent(isOtherShow)
        },
        [transparent, otherTransparent]
    )

    const router = useRouter()

    const textColorMap = {
        '/candidates': 'text-blue-900',
        '/vacancies': 'text-blue-900 hover:text-white',
    }

    const bgColorMap = {
        '/': transparent ? 'bg-transparent' : 'bg-blue-900',
        '/candidates': otherTransparent ? 'bg-transparent' : 'bg-yellow-500',
        '/vacancies': otherTransparent ? 'bg-transparent' : 'bg-yellow-500',
        '/contact': otherTransparent ? 'bg-transparent' : 'bg-blue-800',
    }

    const linkTabClasses = (invert?: boolean) => ({
        active: `${
            invert ? 'text-gray-100' : textColorMap[router.asPath] ?? 'text-yellow-400'
        } px-5 uppercase text-sm font-light tracking-wider cursor-pointer`,
        default: `${
            invert ? 'text-gray-500' : textColorMap[router.asPath] ?? 'text-white'
        } hover:text-gray-400 px-5 uppercase text-sm font-light tracking-wider cursor-pointer`,
    })

    const navLinks = [
        {
            href: '/about',
            isActive: router.asPath === '/about',
            label: 'About',
        },
        {
            href: '/candidates',
            isActive: router.asPath === '/candidates',
            label: 'Candidates',
        },
        {
            href: '/clients',
            isActive: router.asPath === '/clients',
            label: 'Clients',
        },
        {
            href: '/vacancies',
            isActive: router.asPath === '/vacancies',
            label: 'Vacancies',
        },
        {
            href: '/contact',
            isActive: router.asPath === '/contact',
            label: 'Contact',
        },
    ]

    return (
        <nav className={classNames('fixed z-50 w-full', bgColorMap[router.asPath] ?? 'bg-blue-900')}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16">
                    <div className="flex flex-row h-full content-center justify-between">
                        <div className="">
                            <Link href="/">
                                <img src={logo?.url} alt={logo?.alt} className="w-32 cursor-pointer" />
                            </Link>
                        </div>
                        <div className=" h-full">
                            <div className="ml-10 flex justify-center content-center h-full">
                                {navLinks.map((nav, i) => (
                                    <Link href={nav.href} key={i}>
                                        <StyledLink
                                            ref={React.createRef()}
                                            className={
                                                nav.isActive
                                                    ? linkTabClasses(
                                                          ['/candidates', '/vacancies'].includes(router.asPath)
                                                      ).active
                                                    : linkTabClasses().default
                                            }
                                        >
                                            {nav.label}
                                        </StyledLink>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
