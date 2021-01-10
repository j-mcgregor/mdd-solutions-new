import Prismic from 'prismic-javascript'
import { ApiOptions } from 'prismic-javascript/types/Api'

export const apiEndpoint = 'https://mdd-recruitment.cdn.prismic.io/api/v2'
export const accessToken =
    'MC5YOUdFY1JBQUFDUUFTT0Nr.77-977-977-9STgx77-9dO-_vQzvv70z77-977-977-9Ee-_vSsB77-977-9E--_vRI8UO-_vRjvv73vv70DaQ'

// Client method to query documents from the Prismic repo
export const Client = (req = null) => Prismic.client(apiEndpoint, createClientOptions(req, accessToken) as ApiOptions)

const createClientOptions = (req = null, prismicAccessToken = null) => {
    const reqOption = req ? { req } : {}
    const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
    return {
        ...reqOption,
        ...accessTokenOption,
    }
}
