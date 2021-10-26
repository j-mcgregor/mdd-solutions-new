import moment from 'moment'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import React from 'react'

import { Client } from '../../prismic-configuration'
import Header from '../../src/components/Header'
import Polygon from '../../src/components/Polygon'
import { htmlSerializer } from '../../src/lib/htmlSerializer'
import MainLayout from '../../src/MainLayout'
import { StaticPageProps } from '../../types'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const role = await Client().query(Prismic.Predicates.at('document.id', params.id))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            role: role.results[0].data,
            contact,
        },
    }
}

const VacancyShow: NextPage<StaticPageProps<typeof getServerSideProps>> = ({ contact, role }) => {
    const { logo } = contact.results[0].data

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
                <section className="relative py-12 px-4">
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
                                    <div className="text-xl py-3">Overview</div>
                                    <RichText render={role.overview} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                            <div className="mt-10 text-center w-full">
                                <a className="px-4 py-3 rounded-md text-light bg-accent hover:bg-dark cursor-pointer">
                                    Apply now
                                </a>
                            </div>
                        </div>
                        <div className="col-span-3 leading-8 text-justify space-y-5">
                            {role.company && (
                                <div className="">
                                    <div className="text-xl py-3">Company</div>
                                    <RichText render={role.company} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                            {role.role && (
                                <div className="">
                                    <div className="text-xl py-3">Role</div>
                                    <RichText render={role.role} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                            {role.education_and_experience && (
                                <div className="">
                                    <div className="text-xl py-3">Education & Experience</div>
                                    <RichText render={role.education_and_experience} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="relative py-12 px-4">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#eeeeee" />
                    </div>

                    <div className="max-w-6xl mx-auto mb-3">
                        {role.first_uploaded && (
                            <p className="mt-1 text-xs text-gray-500">
                                First Uploaded {moment(role.first_uploaded).format('LL')}
                            </p>
                        )}
                        {role.start_date && (
                            <p className="mt-1 text-xs text-gray-500">
                                Start Date: {moment(role.start_date).format('LL')}
                            </p>
                        )}
                    </div>
                    <div className="container mx-auto max-w-6xl grid grid-cols-1 xl:grid-cols-5 gap-20">
                        <div className="col-span-3 leading-8 text-justify space-y-5">
                            {role.company && (
                                <div className="">
                                    <div className="text-xl py-3">Company</div>
                                    <RichText render={role.company} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                            {role.role && (
                                <div className="">
                                    <div className="text-xl py-3">Role</div>
                                    <RichText render={role.role} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                            {role.education_and_experience && (
                                <div className="">
                                    <div className="text-xl py-3">Education & Experience</div>
                                    <RichText render={role.education_and_experience} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                        </div>
                        <div className="col-span-2">
                            {role.overview && (
                                <div className="leading-8">
                                    <div className="text-xl py-3">Overview</div>
                                    <RichText render={role.overview} htmlSerializer={htmlSerializer} />
                                </div>
                            )}
                            <div className="mt-10 text-center w-full">
                                <a className="px-4 py-3 rounded-md text-light bg-accent hover:bg-dark cursor-pointer">
                                    Apply now
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default VacancyShow
