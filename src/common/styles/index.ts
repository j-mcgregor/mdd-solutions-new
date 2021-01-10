import { css } from 'styled-components'

// FONTS
export const primaryFont = css`
    font-family: 'Arimo Regular', 'Times New Roman', Times, serif;
`

// BACKGROUND
export const backgroundCommon = css`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`

// FLEX
export const flexRow = css`
    display: flex;
    flex-direction: row;
`

export const flexColumn = css`
    display: flex;
    flex-direction: column;
`

export const flexColumnCenter = css`
    ${flexColumn};
    align-items: center;
    justify-content: center;
`

export const flexRowCenter = css`
    ${flexRow};
    align-items: center;
    justify-content: center;
`

export const flexColumnStart = css`
    ${flexColumn};
    align-items: flex-start;
    justify-content: center;
`
