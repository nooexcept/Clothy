import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'

interface AppProps {
    Component: React.ElementType
    pageProps: Record<string, unknown>
}

export default function MyApp(props: AppProps): React.ReactElement {
    const { Component, pageProps } = props

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>Clothy</title>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    )
}
