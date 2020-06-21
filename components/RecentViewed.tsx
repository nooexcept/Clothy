import React from 'react'
import Link from 'next/link'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Product } from '../src/types'

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

export default RecentViewed
