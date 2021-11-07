import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

import { Client } from '../prismic-configuration'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'

export async function getStaticProps() {
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))
    const legal = await Client().query(Prismic.Predicates.at('document.type', 'legal'))

    return {
        props: {
            contact,
            legal,
        },
    }
}

const CookiePolicy: NextPage<StaticPageProps<typeof getStaticProps>> = ({ contact, legal }) => {
    const { logo_inverse } = contact.results[0].data

    return (
        <div>
            <Head>
                <title>Cookie Policy</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo_inverse} invertNavLinks>
                <div className="container max-w-4xl mx-auto w-full h-auto pt-20">
                    <div className="text-4xl">
                        <RichText render={legal.results[0].data.title} />
                    </div>
                    <div className="flex justify-start">
                        <a
                            href={legal.results[0].data.pdf.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-start bg-primary-yellow px-4 py-2 my-4 rounded-md hover:bg-secondary-yellow"
                        >
                            Download PDF <AiOutlineDownload size={20} />
                        </a>
                    </div>
                    <div className="leading-8">
                        <RichText render={legal.results[0].data.body} />
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default CookiePolicy
