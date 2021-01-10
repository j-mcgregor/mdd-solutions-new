import '../src/common/styles/index.css'
import '../src/common/styles/main.scss'

import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const rootTheme = {
    colors: {
        blue: '#143959',
        darkBlue: '#69b8f8',
        lightBlue: '#7ba7bc',
        yellow: '#f4bd1a',
        // opacity
        opacity: {
            blue: (o = '1') => `rgba(20, 57, 89, ${o})`,
        },
    },
}

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={rootTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

export default MyApp
