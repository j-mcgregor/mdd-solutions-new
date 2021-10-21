import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'

import { Client } from '../prismic-configuration'
import { AnimateIn } from '../src/components/AnimateIn'
import InfoCard from '../src/components/InfoCard'
import Polygon from '../src/components/Polygon'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'

export async function getStaticProps() {
    const main = await Client().query(Prismic.Predicates.at('document.type', 'role'))
    const homepage = await Client().query(Prismic.Predicates.at('document.type', 'homepage'))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            main,
            homepage,
            contact,
        },
    }
}

export const Home: NextPage<StaticPageProps<typeof getStaticProps>> = ({ homepage, contact }): JSX.Element => {
    const {
        title,
        description,
        background_image,

        sectors,
        sector_title,
        sector_subtitle,
    } = homepage?.results[0].data
    const { logo } = contact?.results[0].data

    const sectorsMap = {
        main_contracting: { href: '/candidates' },
        me_contracting: { href: '/clients' },
        building_services_design: { href: '/vacancies' },
        executive_search_and_select: { href: '/upload_cv' },
    }

    return (
        <div>
            <Head>
                <title>Home | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact?.results[0].data} logo={logo}>
                <main>
                    <section
                        className="relative pt-16 pb-32 flex content-center items-center justify-center"
                        style={{
                            minHeight: '85vh',
                        }}
                    >
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage: `url('${background_image?.url}')`,
                            }}
                        >
                            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-blue-900"></span>
                        </div>
                        <div className="container relative mx-auto">
                            <div className="items-center flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                    <div className="pr-12">
                                        <AnimateIn
                                            animateIn
                                            triggerOnce
                                            className="text-white font-semibold text-8xl py-10"
                                        >
                                            <h1>
                                                <div className="text-yellow-400">Welcome</div>{' '}
                                                <div className="text-3xl"> to</div> MDD Solutions
                                            </h1>
                                        </AnimateIn>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: '70px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#0b1e2f" />
                        </div>
                    </section>

                    <section className="relative pt-16 pb-32 flex content-center items-center justify-center bg-blue-900">
                        <div className="container max-w-6xl relative mx-auto">
                            <div className="mt-4 text-xl text-gray-300 leading-10 p-10 xl:p-1">
                                <RichText render={description} />
                            </div>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: '70px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#0b1e2f" />
                        </div>
                    </section>
                    {/* SECTORS */}
                    <section className="relative py-32 bg-yellow-400 pb-56">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#FBBF24" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 text-center">
                            <h2 className="font-semibold text-5xl py-3">
                                <RichText render={sector_title} />
                            </h2>
                            {sector_subtitle && (
                                <h4 className="font-semibold text-2xl py-3">
                                    <RichText render={sector_subtitle} />
                                </h4>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                                {sectors?.map((c, i) => (
                                    <InfoCard
                                        key={i}
                                        title={<RichText render={c.sector_title} />}
                                        color="bg-white"
                                        description={<RichText render={c.sector_summary} />}
                                        icon={sectorsMap[c.id]?.icon}
                                        uppercaseTitle
                                        titleClasses="text-gray-400 font-light"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* CONTACT */}
                    <section className="pb-20 relative block bg-gray-800">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#1F2937" />
                        </div>

                        <div className="container max-w-4xl mx-auto px-4 lg:pt-24 lg:pb-20">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center justify-center pt-10 sm:pt-1">
                                <AnimateIn animateIn triggerOnce className="flex items-center justify-center">
                                    <Link href="/">
                                        <a className="h-52 w-52 flex items-center justify-center bg-blue-400 text-white rounded-full text-xl uppercase shadow-xl border-8 border-white hover:bg-blue-900 hover:border-yellow-400 transition duration-200">
                                            Vacancies
                                        </a>
                                    </Link>
                                </AnimateIn>
                                <AnimateIn animateIn triggerOnce className="flex items-center justify-center">
                                    <Link href="/">
                                        <a className="h-52 w-52 flex items-center justify-center bg-blue-400 text-white rounded-full text-xl uppercase shadow-xl border-8 border-white hover:bg-blue-900 hover:border-yellow-400 transition duration-200">
                                            Get in touch
                                        </a>
                                    </Link>
                                </AnimateIn>
                                <AnimateIn animateIn triggerOnce className="flex items-center justify-center">
                                    <Link href="/">
                                        <a className="h-52 w-52 flex items-center justify-center bg-blue-400 text-white rounded-full text-xl uppercase shadow-xl border-8 border-white hover:bg-blue-900 hover:border-yellow-400 transition duration-200">
                                            Send CV
                                        </a>
                                    </Link>
                                </AnimateIn>
                            </div>
                        </div>
                    </section>
                </main>
            </MainLayout>
        </div>
    )
}

export default Home
