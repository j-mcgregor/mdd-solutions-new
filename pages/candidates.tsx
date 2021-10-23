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
    const { logo } = contact.results[0].data

    return (
        <div>
            <Head>
                <title>Candidates | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <Header title={title} bgColor="bg-gradient-to-br from-yellow-500 to-yellow-600" />
                <section className="relative p-4 md:py-32">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#F9FAFB" />
                    </div>

                    <div className="container max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="items-center flex flex-col text-xl leading-10 text-justify">
                                <div className="text-gray-400 text-3xl py-5">
                                    <RichText render={summary} />
                                </div>
                                <div className="text-base leading-8 space-y-5">
                                    <RichText render={description} />
                                </div>
                            </div>
                            <div className="items-start flex flex-row text-base leading-8 text-start pt-8">
                                <ImgCard img={background_image.url} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-full p-10 md:p-20">
                    <div className="max-w-8xl mx-auto text-center py-8 text-3xl font-light uppercase tracking-wider">
                        <RichText render={typical_role_title} />
                    </div>
                    <div
                        className={`font-light max-w-8xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 xl:grid-cols-${typical_roles.length}`}
                    >
                        {typical_roles.map((role, i) => (
                            <div key={i} className="p-8 text-lg rounded-xl bg-blue-900 text-white shadow-xl">
                                <div className="text-xl py-3 uppercase tracking-wider border-b-2 border-blue-700">
                                    <RichText render={role.title1} />
                                </div>
                                <div className="text-base leading-10 tracking-wider">
                                    <RichText render={role.roles} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full">
                        <Link href="/vacancies">
                            <a className="bg-blue-800 flex items-center justify-center p-6 rounded-xl mx-auto md:w-80 text-white text-lg my-6 transition duration-150 hover:bg-blue-700 cursor-pointer uppercase">
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
