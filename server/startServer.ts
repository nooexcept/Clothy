import next from 'next'
import app from './app'
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp
    .prepare()
    .then(async () => {
        const myApp = await app('redis', 'db')

        myApp.app.get('*', (req, res) => handle(req, res))

        myApp.app.listen(process.env.EXPRESS_PORT, (err) => {
            if (err) throw err
            console.log(`> Express ready on ${process.env.NEXT_PUBLIC_API_URL}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
    })
