import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'

import { Client } from '../prismic-configuration'
import Header from '../src/components/Header'
import ImgCard from '../src/components/ImgCard'
import Polygon from '../src/components/Polygon'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'

export async function getStaticProps() {
    const vacancies = await Client().query(Prismic.Predicates.at('document.type', 'vacancies'))
    const roles = await Client().query(Prismic.Predicates.at('document.type', 'role'))
    const contact = await Client().query(Prismic.Predicates.at('document.type', 'contact'))

    return {
        props: {
            vacancies,
            roles,
            contact,
        },
    }
}

export const Contact: NextPage<StaticPageProps<typeof getStaticProps>> = ({
    vacancies,
    contact,
    roles,
}): JSX.Element => {
    const { title, description, background_image } = vacancies.results[0].data
    const { logo } = contact.results[0].data

    const vacancyList = roles.results?.map((v, i) => (
        <div key={i} className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
                <Link href={`/vacancies/${v.uid}`}>
                    <a>
                        <h3 className="hover:text-yellow-400 text-lg leading-6 font-medium text-blue-900 pb-3">
                            {RichText.render(v.data.title)}
                        </h3>
                    </a>
                </Link>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-8">{RichText.render(v.data.summary)}</p>
                <div>
                    <p className="mt-1 max-w-2xl text-xs text-gray-500">
                        First Uploaded {moment(v.data.first_uploaded).format('LL')}
                    </p>
                    <p className="mt-1 max-w-2xl text-xs text-gray-500">
                        Start Date: {moment(v.data.start_date).format('LL')}
                    </p>
                </div>
            </div>
        </div>
    ))

    return (
        <div>
            <Head>
                <title>Contact | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo} invertNavLinks>
                <Header title={title} bgColor="bg-gradient-to-br from-yellow-400 to-yellow-300" />
                <section className="relative py-32">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#fff" />
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="items-center flex flex-row flex-wrap w-10/12 mx-auto text-sm leading-8 text-justify pt-8">
                            <ImgCard img={background_image.url} />
                            <div className="flex-1 pl-32">
                                <RichText render={description} />
                            </div>
                        </div>
                    </div>
                </section>
                {vacancyList.length && (
                    <section className="relative pb-32">
                        <div className="container mx-auto max-w-5xl px-4">
                            <h3 className="text-gray-600 text-sm tracking-widest mb-4 uppercase">Current openings</h3>
                            {vacancyList}
                        </div>
                    </section>
                )}
            </MainLayout>
        </div>
    )
}

export default Contact
