import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Zoom from '@material-ui/core/Zoom'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '17vh',
            minHeight: '100px',
            overflow: 'hidden',
        },
        cardRoot: {
            display: 'flex',
            height: '100%',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
    })
)

interface ProductPreviewProps {
    name: string
    desc: string
    url: string
    img: string
}

const ProductPreview: React.SFC<ProductPreviewProps> = ({
    name,
    desc,
    url,
    img,
}: ProductPreviewProps) => {
    const classes = useStyles()

    return (
        <Zoom in>
            <Paper
                onClick={() => (window.location.href = `/products/${url}`)}
                className={classes.root}
                elevation={3}
            >
                <CardActionArea className={classes.cardRoot}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h6" variant="h6">
                                {name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {desc}
                            </Typography>
                        </CardContent>
                    </div>
                    <CardMedia
                        style={{ width: 250, height: '100%' }}
                        image={img}
                        title={name}
                    />
                </CardActionArea>
            </Paper>
        </Zoom>
    )
}

export default ProductPreview
