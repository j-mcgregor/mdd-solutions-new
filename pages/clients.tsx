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
    const { title, description, background_image, section: sections } = clients.results[0].data
    const { logo } = contact.results[0].data

    const bgColors = ['bg-blue-800 text-gray-50', '', 'bg-blue-900 text-gray-50', '', 'bg-yellow-500 text-gray-800']
    return (
        <div>
            <Head>
                <title>Clients | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <Header title={title} bgColor="bg-blue-900" />
                <section className="relative py-32">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#F9FAFB" />
                    </div>

                    <div className="container mx-auto max-w-7xl px-4 grid gap-10 grid-cols-1 xl:grid-cols-2">
                        <div className="flex flex-col items-start justify-start flex-wrap mx-auto leading-7 md:leading-10 text-justify space-y-5">
                            <RichText render={description} />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <ImgCard img={background_image.url} />
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
                                    className={classNames('max-w-7xl container mx-auto grid grid-cols-3 py-32')}
                                    key={i}
                                >
                                    <div className={classNames('col-span-2 leading-8', alignLeft && 'col-start-2')}>
                                        <div className="py-10">
                                            <RichText render={section.title1} htmlSerializer={htmlSerializer} />
                                        </div>
                                        <div>
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
