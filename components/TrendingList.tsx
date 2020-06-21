import React from 'react'
import ProductPreview from '../components/ProductPreview'
import Grid from '@material-ui/core/Grid'
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

export default TrendingList
