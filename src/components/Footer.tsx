import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import { ContactDataProps } from '../../types'

const StyledFooter = styled.footer`
    width: 100%;
`

const Footer: NextPage<ContactDataProps> = ({ links, footnote }) => {
    const iconMap: { [x: string]: IconDefinition } = {
        mail: faEnvelope,
        tel: faPhone,
        linkedin: faLinkedin,
    }

    return (
        <StyledFooter className="bg-gray-900">
            <div className="py-8 max-w-7xl mx-auto">
                <div className="flex flex-row mb-4">
                    <div className="flex-1 sm:w-1/4">
                        <ul className="list-reset leading-normal">
                            {links?.map((link) => {
                                if (link.source_name in iconMap) {
                                    return (
                                        <li
                                            key={link.source.url}
                                            className="mb-2 flex flex-row items-center uppercase text-primary-yellow hover:text-secondary-yellow text-xs"
                                        >
                                            <a
                                                href={link.source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-row content-center justify-center hover:text-secondary-yellow"
                                            >
                                                <FontAwesomeIcon
                                                    icon={iconMap[link.source_name]}
                                                    size="xs"
                                                    className="p-1 w-6 h-6 text-primary-yellow hover:text-secondary-yellow"
                                                />
                                                <span className="p-1">{link.source_name}</span>
                                            </a>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    <div className="flex-2 sm:w-1/4 sm:mt-0">
                        <ul className="list-reset leading-normal text-primary-yellow">
                            <li className="mb-2 flex flex-row-reverse uppercase text-primary-yellow hover:text-secondary-yellow">
                                <Link href="/privacy-policy">
                                    <a className="p-1 text-xs text-right">PRIVACY POLICY</a>
                                </Link>
                            </li>
                            <li className="mb-2 flex flex-row-reverse uppercase text-primary-yellow hover:text-secondary-yellow">
                                <Link href="/cookie-policy">
                                    <a className="p-1 text-xs text-right">COOKIE POLICY</a>
                                </Link>
                            </li>
                            <li className="mb-2 flex flex-row-reverse uppercase text-primary-yellow">
                                <div className="p-1 text-xs text-right">
                                    {footnote && <RichText render={footnote} />}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="container flex px-3 items-center justify-center w-full text-xs sm:text-sm text-primary-yellow">
                    Site made by{' '}
                    <a
                        href="https://www.linkedin.com/in/jack-mcgregor/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold mx-1"
                    >
                        Jack McGregor
                    </a>{' '}
                    @{' '}
                    <a
                        href="http://www.manyana.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold mx-1"
                    >
                        Manyana Dev.
                    </a>
                </div>
            </div>
        </StyledFooter>
    )
}

export default Footer
