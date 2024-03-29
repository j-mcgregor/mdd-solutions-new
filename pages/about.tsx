import { Disclosure, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import { Client } from '../prismic-configuration'
import { AnimateIn } from '../src/components/AnimateIn'
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
    const { title, subtitle, description, list_items, about_image } = about.results[0].data
    const { logo } = contact.results[0].data

    return (
        <div>
            <Head>
                <title>About | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <section className="relative py-5 sm:py-32 flex content-center items-center justify-center">
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
                            <div className="w-full lg:w-8/12 px-6 sm:px-12 pt-8 pb-12 text-center bg-gray-800 bg-opacity-70 rounded-xl shadow-xl">
                                <AnimateIn animateIn triggerOnce className="font-semibold py-3 text-left">
                                    <div className="text-2xl sm:text-4xl text-yellow-400 uppercase py-4">
                                        <RichText render={title} />
                                    </div>
                                    <div className="text-base sm:text-xl mt-4 text-gray-50 leading-6 sm:leading-8 font-light">
                                        <RichText render={description} />
                                    </div>
                                </AnimateIn>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="md:p-20">
                    <div className="container max-w-7xl mx-auto">
                        <div className="text-xl sm:text-3xl font-bold py-5 text-center sm:text-left">
                            <RichText render={subtitle} />
                        </div>
                        <div className="leading-8">
                            {list_items.map((li, i) => (
                                <Disclosure key={i}>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button
                                                className={classNames(
                                                    'flex justify-between w-full px-4 py-5 text-lg sm:text-xl text-left text-primary-yellow bg-primary-blue hover:bg-primary-yellow hover:text-primary-blue duration-100 font-light tracking-wider focus:outline-none',
                                                    {
                                                        'sm:rounded-t-xl': i === 0,
                                                        'sm:rounded-b-xl': i === list_items.length - 1,
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
                                                <Disclosure.Panel className="px-4 py-10 text-base sm:text-lg text-gray-500">
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
