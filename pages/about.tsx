import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import { Disclosure } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'
import classNames from 'classnames'

import { Client } from '../prismic-configuration'
import ImgCard from '../src/components/ImgCard'
import ListInfoCard from '../src/components/ListInfoCard'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'

export async function getStaticProps() {
    const about = await Client().query(Prismic.Predicates.at('document.type', 'about'))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            about,
            contact,
        },
    }
}

export const About: NextPage<StaticPageProps<typeof getStaticProps>> = ({ about, contact }): JSX.Element => {
    const { title, description, list_items, about_image } = about.results[0].data
    const { logo } = contact.results[0].data

    return (
        <div>
            <Head>
                <title>About | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <section className="relative max-w-7xl mx-auto pt-16 pb-16 grid grid-cols-1 xl:grid-cols-2 ">
                    <div className="flex flex-col items-start justify-start py-20 leading-9">
                        <ListInfoCard title={title} description={description} bgColor="bg-yellow-400" />
                    </div>
                    <div className="bg-white py-20">
                        <ImgCard img={about_image.url} />
                    </div>
                </section>
                <section className="bg-yellow-500 p-20">
                    <div className="container max-w-7xl mx-auto">
                        <div className="text-4xl py-5">Why choose us?</div>
                        <div className="leading-8 divide-y-2 divide-gray-800 divide-opacity-50">
                            {list_items.map((li, i) => (
                                <div className="py-8" key={i}>
                                    <div className="text-3xl tracking-widest py-3">
                                        <RichText render={li.list_title} />
                                    </div>
                                    <div className="text-xl leading-9">
                                        <RichText render={li.item} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default About
