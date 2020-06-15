import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import List from '@material-ui/core/List'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: 240,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 240,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    })
)

interface PublicDrawerProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

const PublicDrawer: React.SFC<PublicDrawerProps> = ({
    setOpen,
    open,
}: PublicDrawerProps) => {
    const classes = useStyles()

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={() => (window.location.href = `/trending`)}
                >
                    <ListItemIcon>
                        <WhatshotIcon />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'textSecondary',
                        }}
                        primary={'Trending'}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ViewCarouselIcon />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'textSecondary',
                        }}
                        primary={'Collections'}
                    />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'textSecondary',
                        }}
                        primary={'Browse'}
                    />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default PublicDrawer
