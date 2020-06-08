import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: '100%',
        },
    })
)

interface ShowcaseListProps {
    showcases: Array<React.ReactElement>
}

export default function ShowcaseList(
    props: ShowcaseListProps
): React.ReactElement {
    const classes = useStyles()

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {props.showcases.map((showcase, i) => (
                        <Zoom
                            in
                            key={i}
                            style={{
                                transitionDelay: `${100 + 100 * i}ms`,
                            }}
                        >
                            <Grid item>{showcase}</Grid>
                        </Zoom>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
