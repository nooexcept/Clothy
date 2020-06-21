import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import axios from 'axios'
import PublicLayout from '../../components/PublicLayout'
import { Product as IProduct } from '../../src/types'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            minHeight: '80vh',
        },
        buyBtn: {
            background: `linear-gradient(
                            55deg,
                            rgba(235, 240, 54, 1) 0%,
                            rgba(228, 93, 34, 1) 48%,
                            rgba(255, 80, 157, 1) 100%)`,
            width: '100%',
            height: '4vh',
            minHeight: 50,
            boxShadow: '2px 4px 3px 4px rgba(235, 240, 54, .16)',
            '&:hover': {
                background: `linear-gradient(
                    62deg,
                    rgba(154, 93, 40, 1) 0%,
                    rgba(130, 42, 64, 1) 48%, 
                    rgba(66, 16, 63, 1) 100%)`,
            },
        },
        buyBtnLabel: {
            fontSize: '1.2rem',
            color: 'white',
        },
        priceTypo: {
            fontWeight: 'bold',
        },
        titleTypo: {
            textTransform: 'uppercase',
        },
        mainPic: {
            maxWidth: '98%',
            maxHeight: '85vh',
            width: 'auto',
            height: 'auto',
            margin: 'auto',
        },
        picWrapper: {
            display: 'flex',
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
    })
)

const Product: React.FC<{ product: IProduct }> = ({
    product,
}: {
    product: IProduct
}) => {
    const classes = useStyles()

    return (
        <PublicLayout>
            <div className={classes.root}>
                <Grid container spacing={5}>
                    <Grid item xs={8}>
                        <Box
                            className={classes.picWrapper}
                            height="100%"
                            borderRight={1}
                        >
                            <img
                                className={classes.mainPic}
                                src={product.images[0]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box m={2}>
                            <Box ml={1}>
                                <Typography variant="caption" gutterBottom>
                                    {product.cod}
                                </Typography>
                            </Box>
                            <Typography
                                className={classes.titleTypo}
                                variant="h2"
                                component="h3"
                                gutterBottom
                            >
                                {product.name}
                            </Typography>

                            <Typography
                                variant="h6"
                                className={classes.priceTypo}
                                gutterBottom
                            >
                                {`$${product.price}`}
                            </Typography>
                        </Box>
                        {product.stock < 10 && (
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <AnnouncementIcon color="secondary" />
                                <Typography
                                    display="inline"
                                    color="secondary"
                                    variant="body1"
                                    gutterBottom
                                >
                                    Almost out of stock
                                </Typography>
                            </Box>
                        )}
                        <Button
                            classes={{
                                root: classes.buyBtn,
                                label: classes.buyBtnLabel,
                            }}
                        >
                            Add to cart
                        </Button>
                        <Box mt={3} mb={3}>
                            <Divider />
                        </Box>
                        <Typography variant="subtitle1" gutterBottom>
                            {product.description}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </PublicLayout>
    )
}

interface ProdPathParam {
    params: {
        url: string
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await axios(
        `http://localhost:${process.env.EXPRESS_PORT}/api/products/`
    ).then((res) => res.data)

    const paths: Array<ProdPathParam> = products.map((product: IProduct) => ({
        params: {
            url: product.url,
        },
    }))

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({
    params,
}: ProdPathParam) => {
    const product = await axios(
        `http://localhost:${process.env.EXPRESS_PORT}/api/products/${params.url}`
    ).then((res) => res.data)

    return { props: { product } }
}

export default Product
