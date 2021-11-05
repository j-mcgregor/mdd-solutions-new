import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Client } from '../prismic-configuration'
import Header from '../src/components/Header'
import Polygon from '../src/components/Polygon'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'

export async function getStaticProps() {
    const vacancies = await Client().query(Prismic.Predicates.at('document.type', 'vacancies'))
    const roles = await Client().query(Prismic.Predicates.at('document.type', 'role'), {
        orderings: '[document.last_publication_date desc]',
    })
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
    const [showNum, setShowNum] = useState(5)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setResults(roles.results.slice(0, showNum))
    }, [roles, showNum])

    const { title } = vacancies.results[0].data
    const { logo_inverse } = contact.results[0].data

    const handleShowMore = () => {
        setLoading(true)
        setTimeout(() => {
            setShowNum(showNum + 5)
            setLoading(false)
        }, 500)
    }

    const vacancyList = results?.map((v, i) => {
        return (
            <div
                key={i}
                className="bg-gray-100 overflow-hidden sm:rounded-lg mb-8 border-2 grid grid-cols-1 md:grid-cols-4 p-4 md:p-0 shadow-md border-primary-blue"
            >
                <div className="px-4 py-5 sm:px-6 col-span-3">
                    <div className="text-lg leading-6 font-medium text-dark pb-3 uppercase tracking-wider">
                        {RichText.render(v.data.title)}
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-8">{RichText.render(v.data.summary)}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Link href={`/vacancies/${v.id}`}>
                        <a className="px-4 py-3 rounded-md text-light bg-primary-yellow hover:bg-secondary-yellow">
                            See more
                        </a>
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
            <MainLayout contact={contact.results[0].data} logo={logo_inverse} invertNavLinks>
                <Header title={title} bgColor="bg-gradient-to-br from-primary-yellow to-secondary-yellow" />
                <section className="relative pt-10 bg-light">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                        style={{ height: '80px', transform: 'translateZ(0)' }}
                    >
                        <Polygon fillColor="#eeeeee" />
                    </div>
                </section>
                {vacancyList.length && (
                    <section className="relative bg-light">
                        <div className="container mx-auto max-w-5xl px-4">
                            <div className="text-gray-600 text-xl tracking-widest mb-4 uppercase ml-7">
                                Current openings
                            </div>
                            {vacancyList}
                        </div>
                    </section>
                )}
                <div className="container w-full mx-auto my-10 bg-light">
                    <button
                        className="mx-auto bg-secondary-blue w-40 text-center text-gray-50 py-4 rounded-lg hover:bg-primary-yellow duration-150 cursor-pointer block"
                        onClick={handleShowMore}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
                            </div>
                        ) : (
                            'Show Next 5'
                        )}
                    </button>
                </div>
            </MainLayout>
        </div>
    )
}

export default Contact
