import { faAward, faFingerprint, faRetweet, faRocket, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'

import { Client } from '../prismic-configuration'
import CtaCard from '../src/components/CtaCard'
import CtaInfo from '../src/components/CtaInfo'
import Form from '../src/components/Form'
import ImgCard from '../src/components/ImgCard'
import InfoCard from '../src/components/InfoCard'
import ListInfoCard from '../src/components/ListInfoCard'
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
    const { title, description, background_image } = homepage?.results[0].data
    const { logo, profile_pic } = contact?.results[0].data

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
                            <Polygon />
                        </div>
                    </div>

                    <section className="pb-20 bg-blue-900 -mt-24">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap">
                                <InfoCard
                                    title="Building Contracting"
                                    color="red"
                                    description="Vacancies, comprising of general build, regional build, residential and major contractors. Covering Sales, Commercial and Operations positions."
                                    icon={faAward}
                                />
                                <InfoCard
                                    title="Building Services Design"
                                    color="yellow"
                                    description="Vacancies Comprising of MEP design roles for consultancies, contractors and client professional teams."
                                    icon={faRetweet}
                                />
                                <InfoCard
                                    title="M&E Contracting"
                                    color="green"
                                    description="Vacancies, comprising of mechanical engineering, electrical engineering and public health (MEP) engineering."
                                    icon={faFingerprint}
                                />
                            </div>

                            <div className="flex flex-wrap items-center mt-32">
                                <CtaInfo
                                    title="Working with us is a pleasure"
                                    description="Don't let your uses guess by attaching tooltips and popoves to any element. Just make sure you enable them first via JavaScript."
                                    color="pink"
                                    link={{ to: '/', label: 'See more' }}
                                    icon={faUserFriends}
                                />

                                <CtaCard
                                    title="Top Notch Services"
                                    description="The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever happens."
                                    img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                                    color="pink"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="relative py-32">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon color="text-white" />
                        </div>

                        <div className="container mx-auto px-4">
                            <div className="items-center flex flex-wrap">
                                <ImgCard img="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                                <ListInfoCard
                                    title="A growing company"
                                    description="The extension comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go."
                                    icon={faRocket}
                                    color="yellow"
                                    listItems={[
                                        {
                                            label: 'Carefully crafted components',
                                        },
                                        {
                                            label: 'Amazing page examples',
                                        },
                                        {
                                            label: 'Dynamic components',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="relative pt-20 pb-48 bg-yellow-400">
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
                    </section>

                    <section className="pb-20 relative block bg-blue-900">
                        <div
                            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                            style={{ height: '80px', transform: 'translateZ(0)' }}
                        >
                            <Polygon color="text-blue-900" />
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

                    <section className="relative block py-24 lg:pt-0 bg-blue-900">
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
