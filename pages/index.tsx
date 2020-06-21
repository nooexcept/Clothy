import React from 'react'
import { GetServerSideProps } from 'next'
import PublicLayout from '../components/PublicLayout'
import ShowcaseList from '../components/ShowcaseList'
import { IncomingMessage } from 'http'
import axios from 'axios'
import Showcase from '../components/Showcase'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Product } from '../src/types'
import RecentViewed from '../components/RecentViewed'

interface Collection {
    name: string
    cover: string
    description: string
    products: Array<string>
}

type SessionMessage = IncomingMessage & {
    session: Express.Session
    sessionID: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const recentProds = (context.req as SessionMessage).session.recentProducts

    const showcased = await axios(
        `http://localhost:${process.env.EXPRESS_PORT}/api/collections/showcases`
    ).then((res) => res.data)

    if (recentProds) {
        const products = await Promise.all(
            recentProds.map(
                async (url: string) =>
                    await axios(
                        `http://localhost:${process.env.EXPRESS_PORT}/api/products/${url}`
                    ).then((res) => res.data)
            )
        )

        return {
            props: { recentProducts: products, showcased },
        }
    }

    return {
        props: { recentProducts: null, showcased },
    }
}

const Index: React.SFC<{
    recentProducts: Array<Product> | null
    showcased: Array<Collection> | null
}> = ({
    recentProducts,
    showcased,
}: {
    recentProducts: Array<Product> | null
    showcased: Array<Collection> | null
}) => {
    return (
        <PublicLayout>
            <Grid container spacing={3}>
                {showcased && (
                    <Grid item xs={12}>
                        <ShowcaseList
                            showcases={showcased.map((coll, i) => (
                                <Showcase
                                    key={i}
                                    img={coll.cover}
                                    title={coll.name}
                                    description={coll.description}
                                />
                            ))}
                        />
                    </Grid>
                )}
                {recentProducts && recentProducts.length > 0 && (
                    <Grid item xs={12}>
                        <Box pl={6} pr={6}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Products you looked
                            </Typography>
                            <Grid container spacing={3}>
                                <RecentViewed recentProducts={recentProducts} />
                            </Grid>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </PublicLayout>
    )
}

export default Index
