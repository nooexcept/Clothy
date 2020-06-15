import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import PublicLayout from '../components/PublicLayout'
import ProductPreview from '../components/ProductPreview'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Product } from '../src/types'

interface TrendingListProps {
    list: Array<Product> | null | undefined
    error: boolean
}

const TrendingList: React.SFC<TrendingListProps> = ({
    list,
    error,
}: TrendingListProps) => {
    if (error)
        return (
            <Typography gutterBottom variant="h6" component="h6">
                An error occurred while getting trending products, try again
                later.
            </Typography>
        )

    if (!list)
        return (
            <Typography gutterBottom variant="h6" component="h6">
                Loading trending products...
            </Typography>
        )

    if (list.length === 0)
        return (
            <Typography gutterBottom variant="h6" component="h6">
                Nothing is trending right now
            </Typography>
        )

    return (
        <>
            {list.map((prod: Product) => (
                <Grid item key={prod.url}>
                    <ProductPreview
                        name={prod.name}
                        desc={prod.description}
                        url={prod.url}
                        img={prod.images[0]}
                    />
                </Grid>
            ))}
        </>
    )
}

const Trending: React.SFC = () => {
    const { data: trendingList, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/trending`,
        axios
    )

    return (
        <PublicLayout>
            <Grid container alignItems="center" direction="column" spacing={3}>
                <Grid item>
                    <Box>
                        <Typography gutterBottom variant="h5" component="h2">
                            Trending 🔥
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={3}
                    >
                        <TrendingList
                            list={trendingList && trendingList.data}
                            error={!!error}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </PublicLayout>
    )
}

export default Trending
