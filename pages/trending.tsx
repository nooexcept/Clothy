import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import PublicLayout from '../components/PublicLayout'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TrendingList from '../components/TrendingList'

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
