import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'

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
                <section className="relative pt-48 pb-56">
                    <div className="container mx-auto px-4">
                        <div className="items-center flex flex-wrap">
                            <ListInfoCard
                                title={RichText.asText(title)}
                                description={RichText.asText(description)}
                                bgColor="bg-yellow-400"
                                textColor="text-blue-600"
                                listItems={list_items?.map((li) => ({ label: RichText.asText(li.item) }))}
                            />
                            <ImgCard img={about_image.url} />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default About
