import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

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
    const {
        title,
        description,
        summary,
        background_image,
        typical_roles,
        typical_role_title,
    } = candidates.results[0].data
    const { logo_inverse } = contact.results[0].data

    return (
        <div>
            <Head>
                <title>Candidates | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo_inverse}>
                <Header title={title} bgColor="bg-gradient-to-br from-primary-yellow to-secondary-yellow" />
                <section className="relative p-4 md:py-32">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 hidden sm:block"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#eeeeee" />
                    </div>

                    <div className="container max-w-7xl mx-auto px-4 bg-light">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex items-center justify-center flex-col text-base sm:text-xl leading-8 text-justify">
                                <div className="text-gray-400 text-lg sm:text-2xl py-5">
                                    <RichText render={summary} />
                                </div>
                                <div className="text-base sm:text-xl leading-6 sm:leading-8 space-y-5">
                                    <RichText render={description} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-base leading-6 sm:leading-8">
                                <ImgCard img={background_image.url} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-primary-blue w-full p-7 md:px-16 md:py-8">
                    <div className="max-w-8xl mx-auto text-center py-8 text-xl sm:text-3xl font-light uppercase tracking-wider text-primary-yellow">
                        <RichText render={typical_role_title} />
                    </div>
                    <div
                        className={`mt-6 font-light max-w-8xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 xl:grid-cols-${typical_roles.length}`}
                    >
                        {typical_roles.map((role, i) => (
                            <div key={i} className="px-4 py-3 text-lg rounded-xl bg-primary-yellow text-dark shadow-xl">
                                <div className="text-xl py-3 uppercase tracking-wider border-b-2 border-blue-700">
                                    <RichText render={role.title1} />
                                </div>
                                <div className="text-base leading-8 tracking-wider py-2">
                                    <RichText render={role.roles} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full mt-10">
                        <Link href="/vacancies">
                            <a className="bg-primary-yellow hover:bg-secondary-yellow flex items-center justify-center p-4 rounded-xl mx-auto md:w-80 text-dark text-lg my-6 transition duration-150 cursor-pointer uppercase">
                                See our vacancies
                                <AiOutlineArrowRight size={25} className="ml-1 fill-current" />
                            </a>
                        </Link>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default Candidates
