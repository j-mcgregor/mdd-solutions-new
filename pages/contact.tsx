import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import * as React from 'react'

import { FaEnvelopeOpen, FaPhone } from 'react-icons/fa'
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

/**
 * •	On right hand side of page opposite the get in touch box have address (only city and county), email (info email), landline number and linkedin details / link
 */
export const Contact: NextPage<StaticPageProps<typeof getStaticProps>> = ({ contact }): JSX.Element => {
    const { title, logo, links } = contact.results[0].data
    const phone = links.find((link) => link.source_name === 'tel')
    const mail = links.find((link) => link.source_name === 'mail')
    return (
        <div>
            <Head>
                <title>Contact | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <Header title={title} bgColor="bg-gradient-to-tl from-blue-800 to-blue-900" />
                <section className="relative py-20">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#fff" />
                    </div>

                    <div className="container mx-auto max-w-7xl px-4">
                        <div className={`grid xl:grid-cols-2 grid-cols-1 p-5 lg:p-10 gap-8 md:gap-16 text-white`}>
                            <div className="flex items-start flex-col justify-center text-blue-700 shadow-lg rounded-3xl bg-gradient-to-tl from-yellow-400 to-yellow-500 px-4 py-10 md:px-20">
                                <h4 className="text-xl md:text-4xl font-semibold uppercase">Get in touch with us</h4>
                                <p className="leading-relaxed my-4 text-lg">
                                    Complete this form and we will get back to you in 24 hours.
                                </p>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-start">
                                        <FaEnvelopeOpen size={20} />{' '}
                                        <a className="ml-5 hover:text-gray-900" href={mail.source.url}>
                                            {mail.source.url.replace('mailto:', '')}
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-start">
                                        <FaPhone size={20} />{' '}
                                        <a className="ml-5 hover:text-gray-900" href={phone.source.url}>
                                            {phone.source.url.replace('tel:', '')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <Form labelColor="text-blue-800" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default Contact
