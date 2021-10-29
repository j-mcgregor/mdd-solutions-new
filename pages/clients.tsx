import classNames from 'classnames'
import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import React from 'react'

import { Client } from '../prismic-configuration'
import Header from '../src/components/Header'
import ImgCard from '../src/components/ImgCard'
import Polygon from '../src/components/Polygon'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'
import { htmlSerializer } from '../src/lib/htmlSerializer'

export async function getStaticProps() {
    const clients = await Client().query(Prismic.Predicates.at('document.type', 'clients'))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            clients,
            contact,
        },
    }
}

export const Contact: NextPage<StaticPageProps<typeof getStaticProps>> = ({ clients, contact }): JSX.Element => {
    const { title, summary, description, background_image, section: sections } = clients.results[0].data
    const { logo } = contact.results[0].data

    const bgColors = [
        'bg-primary-blue text-gray-50',
        '',
        'bg-primary-yellow text-gray-800',
        '',
        'bg-primary-blue text-gray-50',
    ]
    return (
        <div>
            <Head>
                <title>Clients | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <Header title={title} bgColor="bg-primary-blue" />
                <section className="relative py-32 bg-light">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#eeeeee" />
                    </div>
                    <div className="container max-w-7xl mx-auto px-4 bg-light">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="items-start flex flex-col justify-center text-xl leading-8 text-justify">
                                <div className="text-gray-400 text-2xl py-5">
                                    <RichText render={summary} />
                                </div>
                                <div className="text-xl leading-8 space-y-5">
                                    <RichText render={description} />
                                </div>
                            </div>
                            <div className="items-center flex flex-row text-base leading-8 text-start pt-8">
                                <ImgCard img={background_image.url} />
                            </div>
                        </div>
                    </div>
                </section>
                {sections &&
                    sections.length &&
                    sections.map((section, i) => {
                        const alignLeft = i % 2 === 0
                        return (
                            <div className={classNames('', bgColors[i])} key={i}>
                                <div
                                    className={classNames('max-w-7xl container mx-auto grid grid-cols-3 py-20 px-5')}
                                    key={i}
                                >
                                    <div className={classNames('col-span-2 leading-8', alignLeft && 'col-start-2')}>
                                        <div className="text-2xl py-6">
                                            <RichText render={section.title1} htmlSerializer={htmlSerializer} />
                                        </div>
                                        <div className="text-xl">
                                            <RichText render={section.body} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </MainLayout>
        </div>
    )
}

export default Contact
