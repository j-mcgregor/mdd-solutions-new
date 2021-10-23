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
                            <div className="items-start flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4 text-center">
                                    <div className="pr-12">
                                        <AnimateIn
                                            animateIn
                                            triggerOnce
                                            className="text-white font-semibold py-10 text-left"
                                        >
                                            <div className="text-8xl">
                                                <div className="text-yellow-400">MDD</div>
                                                <div className="font-light tracking-wide">Solutions</div>
                                            </div>
                                            <div className="text-xl mt-4 tracking-widest font-light">
                                                Lorem ipsum dolor sit amet
                                            </div>
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
                    {/* ============== DESC 1 ============== */}
                    <section className="relative pt-32 pb-48 flex content-center items-center justify-center bg-blue-900">
                        <div className="container max-w-6xl relative mx-auto">
                            <div className="grid grid-cols-3 mt-4 text-xl text-gray-300 leading-10 p-10 xl:p-1">
                                <div className="col-span-2 text-justify">
                                    <RichText render={description_1} htmlSerializer={htmlSerializer} />
                                </div>
                            </div>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: '70px', transform: 'translateZ(0)  scale(-1, 1)' }}
                        >
                            <Polygon fillColor="#13334e" />
                        </div>
                    </section>
                    {/* ============== DESC 2 ============== */}
                    <section className="relative pt-32 pb-48 flex content-center items-center justify-center bg-blue-800">
                        <div className="container max-w-6xl relative mx-auto">
                            <div className="grid grid-cols-3 mt-4 text-xl text-gray-300 leading-10 p-10 xl:p-1">
                                <div className="col-span-2 col-start-2 text-justify">
                                    <RichText render={description_2} htmlSerializer={htmlSerializer} />
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
                    {/* ============== SECTORS ============== */}
                    <section className="relative py-32 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-50 pb-56">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#1F2937" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 text-center">
                            <h2 className="text-5xl pb-5 uppercase font-light">
                                <RichText render={sector_title} />
                            </h2>
                            {sector_subtitle && (
                                <h4 className="font-semibold text-2xl py-3">
                                    <RichText render={sector_subtitle} />
                                </h4>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                {sectors.map((sector, i) => {
                                    return (
                                        <div
                                            className={classNames(
                                                'px-32 h-96 flex items-center justify-center flex-col space-y-5 border-gray-50 ',
                                                sectorsMap[i].classes
                                            )}
                                            key={i}
                                        >
                                            <div className="text-2xl uppercase">
                                                <RichText render={sector.sector_title} />
                                            </div>
                                            <div className="">
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
