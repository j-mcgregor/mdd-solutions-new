import classNames from 'classnames'
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
    const { title } = vacancies.results[0].data
    const { logo } = contact.results[0].data

    const vacancyList = roles.results?.map((v, i) => {
        const borderColor = i % 2 === 0 ? 'border-blue-400' : 'border-yellow-400'
        const buttonColor = i % 2 === 0 ? 'bg-blue-400 hover:bg-blue-300' : 'bg-yellow-400 hover:bg-yellow-300'
        return (
            <div
                key={i}
                className={classNames(
                    'bg-white shadow overflow-hidden sm:rounded-lg mb-8 border-2 grid grid-cols-1 md:grid-cols-4 p-4 md:p-0',
                    borderColor
                )}
            >
                <div className="px-4 py-5 sm:px-6 col-span-3">
                    <div className="text-lg leading-6 font-medium text-blue-900 pb-3 uppercase tracking-wider">
                        {RichText.render(v.data.title)}
                    </div>
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
                <div className="flex flex-col items-center justify-center">
                    <Link href={`/vacancies/${v.id}`}>
                        <a className={classNames(buttonColor, 'px-4 py-3 rounded-md text-white')}>Apply now</a>
                    </Link>
                </div>
            </div>
        )
    })

    return (
        <div>
            <Head>
                <title>Contact | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo} invertNavLinks>
                <Header title={title} bgColor="bg-gradient-to-br from-yellow-500 to-yellow-300" />
                <section className="relative py-10">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#fff" />
                    </div>
                </section>
                {vacancyList.length && (
                    <section className="relative">
                        <div className="container mx-auto max-w-5xl px-4">
                            <div className="text-gray-600 text-xl tracking-widest mb-4 uppercase">Current openings</div>
                            {vacancyList}
                        </div>
                    </section>
                )}
            </MainLayout>
        </div>
    )
}

export default Contact
