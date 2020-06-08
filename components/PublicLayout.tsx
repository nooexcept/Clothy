import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import PublicDrawer from './PublicDrawer'
import PublicAppBar from './PublicAppBar'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        grow: {
            flexGrow: 1,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -240,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    })
)

const PublicLayout: React.FC = ({
    children,
}: {
    children: React.ReactChildren
}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
            <div className={classes.root}>
                <PublicAppBar setOpen={setOpen} open={open} />
                <PublicDrawer setOpen={setOpen} open={open} />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <Box paddingTop={8}>{children}</Box>
                </main>
            </div>
        </React.Fragment>
    )
}

export default PublicLayout
