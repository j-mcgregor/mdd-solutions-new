import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import { flexColumnStart } from '../common/styles'

const StyledBanner = styled.header`
    background: ${({ theme }) => theme.colors.lightBlue};
    ${flexColumnStart};
    min-height: 30vh;
`

const Banner: React.FC<{ title: RichTextBlock[] }> = ({ title }) => {
    return (
        <StyledBanner>
            <h1 className="p-3 text-white text-4xl max-w-4xl mx-auto uppercase">{RichText.asText(title)}</h1>
        </StyledBanner>
    )
}

export default Banner
