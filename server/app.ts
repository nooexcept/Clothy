import * as express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let port = 8080
if (process.argv[2]) {
    const portArg = process.argv[2].split('=')
    if (portArg[1]) port = parseInt(portArg[1])
}

app.prepare()
    .then(() => {
        const server = express.default()

        server.get('*', (req, res) => handle(req, res))

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
    })
