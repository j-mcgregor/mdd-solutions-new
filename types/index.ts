import { GetStaticProps } from 'next'
import { RichTextBlock } from 'prismic-reactjs'

export interface ImageProps {
    dimensions: {
        width: number
        height: number
    }
    alt: string
    copyright: string
    url: string
}

export interface ContactLinkProps {
    source: {
        link_type: string
        url: string
    }
    source_name: string
}

export interface ContactDataProps {
    links: ContactLinkProps[]
    footnote: RichTextBlock[]
}

export interface LandingDataProps {
    title: RichTextBlock[]
    description: RichTextBlock[]
    background_image: ImageProps
    logo_full: ImageProps
}

export interface DataProps extends LandingDataProps, ContactDataProps {}

export interface ResultProps {
    id: string
    uid: string
    type: string
    href: string
    tags: []
    first_publication_date: string
    last_publication_date: string
    slugs: string[]
    linked_documents: []
    lang: string
    alternate_languages: []
    data: DataProps
}

export interface MainProps {
    page: number
    results_per_page: number
    results_size: number
    total_results_size: number
    total_pages: number
    next_page: null
    prev_page: null
    results: ResultProps[]
    version: string
    license: string
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown
}
    ? U
    : T

export type ExtractProps<T> = T extends { props: infer P } ? P : never

export type StaticPageProps<T> = T extends GetStaticProps ? ExtractProps<Await<ReturnType<T>>> : never
