import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import { Client } from '../prismic-configuration'
import Banner from '../src/components/Banner'
import ImgCard from '../src/components/ImgCard'
import ListInfoCard from '../src/components/ListInfoCard'
import Polygon from '../src/components/Polygon'
import MainLayout from '../src/MainLayout'
import { StaticPageProps } from '../types'

const StyledAbout = styled.section`
    width: 100%;
    height: 100%;
`

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
    const { title, description } = about.results[0].data
    const { logo } = contact.results[0].data

    return (
        <div>
            <Head>
                <title>About | MDD Solutions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout contact={contact.results[0].data} logo={logo}>
                <section className="relative py-32">
                    <div className="container mx-auto px-4">
                        <div className="items-center flex flex-wrap">
                            <ListInfoCard
                                title={RichText.asText(title)}
                                description={RichText.asText(description)}
                                icon={faRocket}
                                color="blue"
                                listItems={[
                                    {
                                        label: 'Tailored Approach',
                                    },
                                    {
                                        label: 'Reliable Service',
                                    },
                                    {
                                        label: 'Unique',
                                    },
                                    {
                                        label: 'Specialists',
                                    },
                                ]}
                            />
                            <ImgCard img="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    )
}

export default About
