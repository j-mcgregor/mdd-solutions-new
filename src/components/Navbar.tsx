import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import styled from 'styled-components'

import { ImageProps } from '../../types'

interface NavbarProps {
    logo?: ImageProps
    invertNavLinks?: boolean
}

const StyledLink = styled.a`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Navbar: NextPage<NavbarProps> = ({ logo, invertNavLinks }) => {
    const router = useRouter()
    const isDark = router.asPath === '/about'

    const textColor = isDark ? 'text-gray-600' : 'text-gray-300'

    const linkTabClasses = {
        active: `${
            invertNavLinks ? 'text-gray-600' : 'text-yellow-400'
        } px-5 uppercase text-sm font-light tracking-wider cursor-pointer`,
        default: `${
            invertNavLinks ? 'text-gray-500' : textColor
        } hover:text-gray-400 px-5 uppercase text-sm font-light tracking-wider cursor-pointer`,
    }

    return (
        <nav className="bg-transparent absolute z-50 w-full">
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
                                <Link href="/about">
                                    <StyledLink
                                        className={
                                            router.asPath === '/about' ? linkTabClasses.active : linkTabClasses.default
                                        }
                                    >
                                        About
                                    </StyledLink>
                                </Link>
                                <Link href="/candidates">
                                    <StyledLink
                                        className={
                                            router.asPath === '/candidates'
                                                ? linkTabClasses.active
                                                : linkTabClasses.default
                                        }
                                    >
                                        Candidates
                                    </StyledLink>
                                </Link>
                                <Link href="/vacancies">
                                    <StyledLink
                                        className={
                                            router.asPath === '/vacancies'
                                                ? linkTabClasses.active
                                                : linkTabClasses.default
                                        }
                                    >
                                        Vacancies
                                    </StyledLink>
                                </Link>
                                <Link href="/contact">
                                    <StyledLink
                                        className={
                                            router.asPath === '/contact'
                                                ? linkTabClasses.active
                                                : linkTabClasses.default
                                        }
                                    >
                                        Contact
                                    </StyledLink>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
