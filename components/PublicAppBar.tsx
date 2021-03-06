import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import GitHubIcon from '@material-ui/icons/GitHub'
import ProductSearch from './ProductSearch'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        section: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: 'none',
        },
        appBarShift: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    })
)

interface PublicAppBarProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

const PublicAppBar: React.SFC<PublicAppBarProps> = ({
    setOpen,
    open,
}: PublicAppBarProps) => {
    const classes = useStyles()

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    return (
        <div className={classes.grow}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        id="open-drawer"
                        className={classes.menuButton}
                        onClick={handleDrawerOpen}
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Clothy
                    </Typography>
                    <ProductSearch />
                    <div className={classes.grow} />
                    <div className={classes.section}>
                        <IconButton aria-label="show 4 items" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="go to the github page"
                            color="inherit"
                            id="git-icon"
                            onClick={() =>
                                window.open(
                                    'https://github.com/nooexcept/Clothy',
                                    '_blank'
                                )
                            }
                        >
                            <GitHubIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default PublicAppBar
