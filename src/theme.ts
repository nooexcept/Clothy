import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#fbd46d',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        text: {
            primary: '#000',
            secondary: '#545454',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },
    },
})

export default theme
