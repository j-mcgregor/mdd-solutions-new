import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import React from 'react'

import { Client } from '../../prismic-configuration'
import Header from '../../src/components/Header'
import Polygon from '../../src/components/Polygon'
import MainLayout from '../../src/MainLayout'
import { StaticPageProps } from '../../types'

export const getServerSideProps = async () => {
    const vacancies = await Client().query(Prismic.Predicates.at('document.type', 'vacancies'))
    const roles = await Client().query(Prismic.Predicates.at('document.type', 'role'))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            vacancies,
            roles,
            contact,
        },
    }
}

const VacancyShow: NextPage<StaticPageProps<typeof getServerSideProps>> = ({ vacancies, contact, roles }) => {
    const { logo } = contact.results[0].data

    const router = useRouter()
    const role = roles.results.find((r) => r.uid === router.query.id)

    return (
        <div>
            <Head>
                <title>Contact | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo} invertNavLinks>
                <Header title={role.data.title} bgColor="bg-gradient-to-br from-gray-700 to-gray-900" />
                <section className="relative py-32">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#fff" />
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="flex flex-col flex-wrap w-8/12 mx-auto text-sm leading-8 text-justify pt-8">
                            <div className="mb-3">
                                <p className="mt-1 text-xs text-gray-500">
                                    First Uploaded {moment(role.data.first_uploaded).format('LL')}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Start Date: {moment(role.data.start_date).format('LL')}
                                </p>
                            </div>
                            <div className="flex-1">
                                <RichText render={role.data.description} />
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default VacancyShow
