import classNames from 'classnames'
import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'

import { Client } from '../prismic-configuration'
import { AnimateIn } from '../src/components/AnimateIn'
import Polygon from '../src/components/Polygon'
import { htmlSerializer } from '../src/lib/htmlSerializer'
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
        description_1,
        description_2,
        background_image,

        sectors,
        sector_title,
        sector_subtitle,
    } = homepage?.results[0].data
    const { logo } = contact?.results[0].data

    const sectorsMap = [
        {
            classes: 'border-r-2 border-b-2',
        },
        { classes: 'border-b-2' },
        { classes: 'border-r-2' },
        { classes: '' },
    ]

    return (
        <div>
            <Head>
                <title>Home | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact?.results[0].data} logo={logo}>
                <main>
                    {/* ============== HERO ============== */}
                    <section
                        className="relative pt-16 pb-32 flex content-center items-center justify-center"
                        style={{
                            minHeight: '85vh',
                        }}
                    >
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover bg-fixed"
                            style={{
                                backgroundImage: `url('${background_image?.url}')`,
                            }}
                        >
                            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-blue-900"></span>
                        </div>
                        <div className="container relative mx-auto">
                            <div className="flex items-center justify-center">
                                <AnimateIn animateIn triggerOnce className="text-light py-10 ">
                                    <img src="/images/logo-transparent.png" alt="" />
                                </AnimateIn>
                            </div>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: '70px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#eeeeee" />
                        </div>
                    </section>
                    {/* ============== DESC 1 ============== */}
                    <section className="relative pt-20 pb-32 flex content-center items-center justify-center bg-light">
                        <div className="container max-w-6xl relative mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-3 text-xl text-dark leading-8 p-10 xl:p-1">
                                <div className="sm:col-span-2 text-justify text-xl leading-8">
                                    <RichText render={description_1} htmlSerializer={htmlSerializer} />
                                </div>
                            </div>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: '70px', transform: 'translateZ(0)  scale(-1, 1)' }}
                        >
                            <Polygon fillColor="#f4b41a" />
                        </div>
                    </section>
                    {/* ============== DESC 2 ============== */}
                    <section className="relative pt-20 pb-32 flex content-center items-center justify-center bg-primary-yellow">
                        <div className="container max-w-6xl relative mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-3 text-xl text-dark p-10 xl:p-1">
                                <div className="sm:col-span-2 col-start-2 text-justify text-xl leading-8 ">
                                    <RichText render={description_2} htmlSerializer={htmlSerializer} />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ============== SECTORS ============== */}
                    <section className="relative pt-20 pb-12 bg-primary-blue text-gray-50">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#143959" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 text-center">
                            <h2 className="text-4xl pb-5 uppercase font-light text-primary-yellow">
                                <RichText render={sector_title} />
                            </h2>
                            {sector_subtitle && (
                                <h4 className="text-2xl py-3">
                                    <RichText render={sector_subtitle} />
                                </h4>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                {sectors.map((sector, i) => {
                                    return (
                                        <div
                                            className={classNames(
                                                'px-10 sm:px-20 py-8 sm:py-16 flex items-center justify-center flex-col space-y-5 border-none sm:border-gray-50 ',
                                                sectorsMap[i].classes
                                            )}
                                            key={i}
                                        >
                                            <div className="text-2xl uppercase text-primary-yellow">
                                                <RichText render={sector.sector_title} />
                                            </div>
                                            <div className="text-xl">
                                                <RichText render={sector.sector_summary} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                </main>
            </MainLayout>
        </div>
    )
}

export default Home
