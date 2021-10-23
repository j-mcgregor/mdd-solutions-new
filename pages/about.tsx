import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import { Client } from '../prismic-configuration'
import ImgCard from '../src/components/ImgCard'
import ListInfoCard from '../src/components/ListInfoCard'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'
import classNames from 'classnames'
import { AnimateIn } from '../src/components/AnimateIn'
import Polygon from '../src/components/Polygon'

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
                <section
                    className="relative py-32 flex content-center items-center justify-center"
                    // style={{
                    //     minHeight: '45vh',
                    // }}
                >
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover bg-fixed"
                        style={{
                            backgroundImage: `url('${about_image?.url}')`,
                        }}
                    >
                        <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-blue-900"></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-start flex flex-wrap justify-start">
                            <div className="w-full lg:w-8/12 p-12 text-center bg-gray-800 bg-opacity-70 rounded-xl shadow-xl">
                                <div className="pr-12">
                                    <AnimateIn animateIn triggerOnce className="font-semibold py-10 text-left">
                                        <div className="text-4xl text-yellow-400 uppercase py-4">
                                            <RichText render={title} />
                                        </div>
                                        <div className="text-xl mt-4 text-gray-50 leading-8 font-light">
                                            <RichText render={description} />
                                        </div>
                                    </AnimateIn>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="md:p-20">
                    <div className="container max-w-7xl mx-auto">
                        <div className="text-3xl font-bold py-5">Why choose us?</div>
                        <div className="leading-10 divide-y-2 divide-gray-800 divide-opacity-50">
                            {list_items.map((li, i) => (
                                <Disclosure key={i}>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button
                                                className={classNames(
                                                    'flex justify-between w-full px-4 py-5 text-xl text-left text-gray-100 bg-blue-900 hover:bg-yellow-500 font-light tracking-wider focus:outline-none',
                                                    {
                                                        'rounded-t-xl': i === 0,
                                                        'rounded-b-xl': i === list_items.length - 1,
                                                    }
                                                )}
                                            >
                                                <RichText render={li.list_title} />
                                                {open ? <BsChevronUp /> : <BsChevronDown />}
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-200 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-200 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel className="px-4 py-10 text-lg text-gray-500">
                                                    <RichText render={li.item} />
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default About
