import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import React from 'react'
import styled from 'styled-components'

import { Client } from '../../prismic-configuration'
import Header from '../../src/components/Header'
import Polygon from '../../src/components/Polygon'
import MainLayout from '../../src/MainLayout'
import { StaticPageProps } from '../../types'

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const role = await Client().query(Prismic.Predicates.at('document.id', params.id))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            role: role.results[0].data,
            contact,
            url: req?.headers,
        },
    }
}

const StyledList = styled.div`
    ul {
        list-style: disc;
        list-style-position: inside;

        li {
            padding-left: 2px;
        }
    }
`

const VacancyShow: NextPage<StaticPageProps<typeof getServerSideProps>> = ({ contact, role, url }) => {
    const { logo, links } = contact.results[0].data

    const MAIL_TO = links.find((link: any) => link.source_name === 'mail').source.url

    // const MAIL_SRC = `<a href="${url.referer}" target="_blank" rel="noopener noreferer">MDD Solutions</a>`
    const MAIL_TITLE = encodeURI(`Application for ${RichText.asText(role.title)}`)
    const MAIL_BODY = encodeURI(
        `Hi,\r\n\r\nI would like to apply for the ${RichText.asText(role.title)} role posted on ${
            url.referer
        }.\r\n\r\nI have attached my CV for review.\r\n\r\nI look forward to hearing your response.\r\n\r\nKind regards,\r\n\r\n<your name>`
    )

    const mailToFormatted = `${MAIL_TO}?subject=${MAIL_TITLE}&body=${MAIL_BODY}`

    return (
        <div>
            <Head>
                <title>{RichText.asText(role.title)}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo} invertNavLinks>
                {role.title && (
                    <Header title={role.title} bgColor="bg-gradient-to-br from-primary-blue to-secondary-blue" />
                )}
                <section className="relative py-12 px-4 bg-light">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#eeeeee" />
                    </div>
                    <div className="container mx-auto max-w-6xl grid grid-cols-1 xl:grid-cols-5 gap-20">
                        <div className="col-span-2">
                            {role.overview && (
                                <div className="leading-8">
                                    <div className="text-xl py-3 font-semibold">Overview</div>
                                    <StyledList className="list-disc">{RichText.render(role.overview)}</StyledList>
                                </div>
                            )}
                            <div className="mt-10 md:mt-20 text-center w-full hidden xl:block">
                                <a
                                    className="px-4 py-3 rounded-md text-light bg-primary-yellow hover:bg-secondary-yellow cursor-pointer"
                                    href={mailToFormatted}
                                    role="button"
                                >
                                    Apply now
                                </a>
                            </div>
                        </div>
                        <div className="col-span-3 leading-8 text-justify space-y-2 sm:space-y-5 ">
                            {role.company && (
                                <div className="">
                                    <div className="text-xl py-3 font-semibold">Company</div>
                                    <StyledList className="list-disc">{RichText.render(role.company)}</StyledList>
                                </div>
                            )}
                            {role.role && (
                                <div className="">
                                    <div className="text-xl py-3 font-semibold">Role</div>
                                    <StyledList className="list-disc">{RichText.render(role.role)}</StyledList>
                                </div>
                            )}
                            {role.education_and_experience && (
                                <div className="">
                                    <div className="text-xl py-3 font-semibold">Education & Experience</div>
                                    <StyledList className="list-disc">
                                        {RichText.render(role.education_and_experience)}
                                    </StyledList>
                                </div>
                            )}
                        </div>
                        <div className="col-span-3 md:mt-5 text-center w-full xl:hidden mx-auto">
                            <a className="px-4 py-3 rounded-md text-light bg-primary-yellow hover:bg-secondary-yellow cursor-pointer">
                                Apply now
                            </a>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default VacancyShow
