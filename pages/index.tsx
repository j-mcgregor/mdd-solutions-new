import { faAward, faBookmark, faUpload, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'

import { Client } from '../prismic-configuration'
import Form from '../src/components/Form'
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
        cta,
        sectors,
        sector_title,
        sector_subtitle,
    } = homepage?.results[0].data
    const { logo } = contact?.results[0].data

    const servicesMap = {
        candidate: { icon: faAward, color: 'bg-red-400', href: '/candidates' },
        clients: { icon: faUserFriends, color: 'bg-blue-400', href: '/clients' },
        vacancies: { icon: faBookmark, color: 'bg-green-400', href: '/vacancies' },
        upload_cv: { icon: faUpload, color: 'bg-yellow-400', href: '/upload_cv' },
    }

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
                    <div
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
                                        <h1 className="text-white font-semibold text-8xl py-10">
                                            <span className="text-yellow-400">New</span> Beginnings.
                                        </h1>
                                        <p className="mt-4 text-lg text-gray-300">
                                            <RichText render={description} />
                                        </p>
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
                    </div>

                    <section className="pt-20 pb-40 bg-blue-900">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-4 gap-4">
                                {cta?.map((c, i) => (
                                    <Link key={i} href={servicesMap[c.id].href}>
                                        <a className="">
                                            <InfoCard
                                                title={<RichText render={c.service_title} />}
                                                color={servicesMap[c.id].color}
                                                description={<RichText render={c.service_summary} />}
                                                icon={servicesMap[c.id].icon}
                                                classNames="transform hover:-translate-y-2 transition duration-300 ease-in-out"
                                            />
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* SECTORS */}
                    <section className="relative py-32">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#fff" />
                        </div>

                        <div className="container mx-auto w-1/2 px-4 text-center">
                            <h2 className="font-semibold text-5xl py-10">
                                <RichText render={sector_title} />
                            </h2>
                            <h4 className="font-semibold text-2xl py-10">
                                <RichText render={sector_subtitle} />
                            </h4>
                            <div className="grid grid-cols-2  gap-4">
                                {sectors?.map((c, i) => (
                                    <InfoCard
                                        key={i}
                                        title={<RichText render={c.sector_title} />}
                                        color="bg-white"
                                        description={<RichText render={c.sector_summary} />}
                                        icon={sectorsMap[c.id]?.icon}
                                        descriptionSize="small"
                                        uppercaseTitle
                                        titleClasses="text-gray-400 font-light"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* MEET THE FOUNDER */}
                    {/* <section className="relative pt-20 pb-48 bg-yellow-400">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon color="text-yellow-400" />
                        </div>
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap justify-center text-center mb-24">
                                <div className="w-full lg:w-6/12 px-4">
                                    <h2 className="text-4xl font-semibold">Meet our founder</h2>
                                    <p className="text-lg leading-relaxed m-4 text-gray-600">
                                        According to the National Oceanic and Atmospheric Administration, Ted, Scambos,
                                        NSIDClead scentist, puts the potentially record maximum.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full mb-12 px-4">
                                    <div className="px-6">
                                        <img
                                            alt="..."
                                            src={profile_pic?.url}
                                            className="shadow-lg rounded-full max-w-full mx-auto"
                                            style={{ maxWidth: '280px' }}
                                        />
                                        <div className="pt-6 text-center">
                                            <h5 className="text-xl font-bold">Michael Dalton</h5>
                                            <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                                                Lion tamer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                    {/* CONTACT */}
                    <section className="pb-20 relative block bg-yellow-400">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon fillColor="#FBBF24" />
                        </div>

                        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                            <div className="flex flex-wrap text-center justify-center">
                                <div className="w-full lg:w-6/12 px-4">
                                    <h2 className="text-4xl font-semibold text-white">Get in touch</h2>
                                    <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                                        Put the potentially record low maximum sea ice extent tihs year down to low ice.
                                        According to the National Oceanic and Atmospheric Administration, Ted, Scambos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative block py-24 lg:pt-0 bg-yellow-400">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-900">
                                        <Form />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </MainLayout>
        </div>
    )
}

export default Home
