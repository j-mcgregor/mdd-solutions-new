import { NextPage } from 'next'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import { ContactDataProps } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

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
            <div className="py-20 max-w-4xl mx-auto">
                <div className="flex flex-row mb-4">
                    <div className="flex-1 sm:w-1/4">
                        <ul className="list-reset leading-normal">
                            {links?.map((link) => (
                                <li
                                    key={link.source.url}
                                    className="mb-2 flex flex-row content-center uppercase text-yellow-400 hover:text-yellow-500"
                                >
                                    <a
                                        href={link.source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-row content-center justify-center hover:text-yellow-500"
                                    >
                                        <FontAwesomeIcon
                                            icon={iconMap[link.source_name]}
                                            size="sm"
                                            className="text-white p-1 w-8 h-8 text-yellow-400 hover:text-yellow-500"
                                        />
                                        <span className="p-1">{link.source_name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-2 sm:w-1/4 sm:mt-0">
                        <ul className="list-reset leading-normal text-yellow-400">
                            <li className="mb-2 flex flex-row content-center uppercase text-yellow-400 hover:text-yellow-500">
                                <a href="http://" target="_blank" rel="noopener noreferrer" className="p-1">
                                    PRIVACY POLICY
                                </a>
                            </li>
                            <li className="mb-2 flex flex-row content-center uppercase text-yellow-400 hover:text-yellow-500">
                                <a href="http://" target="_blank" rel="noopener noreferrer" className="p-1">
                                    COOKIE POLICY
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footnote p-10 flex justify-center content-center uppercase bg-black text-yellow-400">
                {footnote && <RichText render={footnote} />}
            </div>
        </StyledFooter>
    )
}

export default Footer
