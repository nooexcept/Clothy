import Head from 'next/head'
import React from 'react'

const Index: React.FC = () => (
    <div>
        <Head>
            <title>Clothy</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <meta name="description" content="The best in clothing" />
        </Head>
        <section>
            <h1>Hello world!</h1>
            <p>From the boilerplate</p>
        </section>
    </div>
)

export default Index
