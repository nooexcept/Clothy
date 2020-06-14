import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        width: '30vw',
        minWidth: 200,
        background: '#000',
    },
    media: {
        height: '55vh',
        minHeight: 150,
    },
    content: {
        backgroundColor: '#fbd46d',
    },
    actions: {
        backgroundColor: '#fbd46d',
    },
})

interface ShowcaseProps {
    img: string
    title: string
    description: string
}

export default function Showcase(props: ShowcaseProps): React.ReactElement {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.img}
                    title={props.title}
                />
                <CardContent className={classes.content}>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                        noWrap
                    >
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions} disableSpacing>
                <Button size="small">
                    <Typography color="textPrimary" variant="body1">
                        Share
                    </Typography>
                </Button>
                <Button size="small">
                    <Typography color="textPrimary" variant="body1">
                        Browse
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    )
}
