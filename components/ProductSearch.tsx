import React, { useState } from 'react'
import axios, { CancelTokenSource } from 'axios'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import ProductPreview from './ProductPreview'
import { withLimitedWords } from '../src/util'
import { Product } from '../src/types'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.black, 0.1),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.black, 0.15),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        suggestions: {
            position: 'absolute',
            width: '80%',
            marginLeft: '24px',
            marginRight: '16px',
            marginTop: '8px',
        },
    })
)

const ProductSearch: React.FC = () => {
    const classes = useStyles()

    const [searchText, setSearchText] = useState('')
    const [suggestions, setSuggestions] = useState({ display: false, data: [] })

    const CancelToken = axios.CancelToken

    let source: CancelTokenSource | null = null

    const OnSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const textVal = e.target.value
        setSearchText(textVal)

        if (!!source) {
            source.cancel()
        }

        if (textVal && textVal.length > 2) {
            source = CancelToken.source()

            try {
                const suggested = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/search/${textVal}/0/3`,
                    {
                        cancelToken: source.token,
                    }
                )

                setSuggestions({
                    display: true,
                    data: suggested.data.map((prod: Product) => ({
                        ...prod,
                        description: `${withLimitedWords(
                            prod.description,
                            12
                        )}...`,
                    })),
                })
            } catch (e) {
                source = null
                setSuggestions({ display: false, data: [] })
            }
        } else {
            source = null
            setSuggestions({ display: false, data: [] })
        }
    }

    return (
        <ClickAwayListener
            onClickAway={() =>
                setSuggestions({ ...suggestions, display: false })
            }
        >
            <Box className={classes.root}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchText}
                        onChange={OnSearch}
                        onClick={() =>
                            setSuggestions({ ...suggestions, display: true })
                        }
                    />
                </div>
                {suggestions.display && suggestions.data.length > 0 && (
                    <div id="suggestions" className={classes.suggestions}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}
                        >
                            {suggestions.data.map((prod: Product) => (
                                <Grid item key={prod.url}>
                                    <ProductPreview
                                        name={prod.name}
                                        desc={prod.description}
                                        url={prod.url}
                                        img={prod.images[0]}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
            </Box>
        </ClickAwayListener>
    )
}

export default ProductSearch
