import React from 'react'
import { GetServerSideProps } from 'next'
import PublicLayout from '../components/PublicLayout'
import ShowcaseList from '../components/ShowcaseList'
import Link from 'next/link'
import { IncomingMessage } from 'http'
import Showcase from '../components/Showcase'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Product } from '../src/types'

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

    const showcasedRes = await fetch(
        `http://localhost:${process.env.EXPRESS_PORT}/api/collections/showcases`
    )

    const showcased = await showcasedRes.json()

    if (recentProds) {
        const products = await Promise.all(
            recentProds.map(async (url: string) => {
                const res = await fetch(
                    `http://localhost:${process.env.EXPRESS_PORT}/api/products/${url}`
                )
                return await res.json()
            })
        )

        return {
            props: { recentProducts: products, showcased },
        }
    }

    return {
        props: { recentProducts: null, showcased },
    }
}

interface RecentViewedProps {
    recentProducts: Array<Product>
}

const RecentViewed: React.SFC<RecentViewedProps> = ({ recentProducts }) => {
    return (
        <>
            {recentProducts.map((prod: Product) => {
                return (
                    <Grid item xs={3} key={prod.url}>
                        <Link href={`products/${prod.url}`}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={prod.name}
                                        image={prod.images[0]}
                                        title={prod.name}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {prod.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                )
            })}
        </>
    )
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
                {recentProducts && (
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
