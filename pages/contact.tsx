import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import * as React from 'react'

import { Client } from '../prismic-configuration'
import Form from '../src/components/Form'
import Header from '../src/components/Header'
import Polygon from '../src/components/Polygon'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'

export async function getStaticProps() {
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            contact,
        },
    }
}

export const Contact: NextPage<StaticPageProps<typeof getStaticProps>> = ({ contact }): JSX.Element => {
    const { title, description, logo } = contact.results[0].data
    return (
        <div>
            <Head>
                <title>Contact | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <Header
                    title={title}
                    description={description}
                    bgColor="bg-gradient-to-br from-green-800 to-green-900"
                />
                <section className="relative py-32">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#fff" />
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="items-center flex flex-wrap w-6/12 mx-auto">
                            <Form textColor="text-gray-800" labelColor="text-gray-600" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default Contact
