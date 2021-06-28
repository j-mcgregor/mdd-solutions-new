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

export async function getStaticProps() {
    const candidates = await Client().query(Prismic.Predicates.at('document.type', 'candidates'))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            candidates,
            contact,
        },
    }
}

export const Candidates: NextPage<StaticPageProps<typeof getStaticProps>> = ({ candidates, contact }): JSX.Element => {
    const { title, description, summary, background_image } = candidates.results[0].data
    const { logo } = contact.results[0].data

    return (
        <div>
            <Head>
                <title>Candidates | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <Header title={title} bgColor="bg-gradient-to-br from-blue-800 to-blue-900" />
                <section className="relative py-32">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#fff" />
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="items-center flex flex-wrap w-10/12 mx-auto text-xl leading-8 text-justify text-gray-400">
                            <RichText render={summary} />
                        </div>
                        <div className="items-center flex flex-row flex-wrap w-10/12 mx-auto text-sm leading-8 text-justify pt-8">
                            <div className="flex-1 pr-32">
                                <RichText render={description} />
                            </div>
                            <ImgCard img={background_image.url} />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default Candidates
