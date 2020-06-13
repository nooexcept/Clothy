import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'

interface ShowcaseListProps {
    showcases: Array<React.ReactElement>
}

export default function ShowcaseList(
    props: ShowcaseListProps
): React.ReactElement {
    return (
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
    )
}
