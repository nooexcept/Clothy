import dotenv from 'dotenv'
dotenv.config()

import * as express from 'express'
import next from 'next'
import mongoose from 'mongoose'
import redis from 'redis'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'
import connectRedis from 'connect-redis'
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({ host: 'redis' })

import productRouter from './routes/product'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose
    .connect('mongodb://db:27017/clothy', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('> MongoDB ready')
    })
    .catch((error) => console.error(error))

mongoose.set('useCreateIndex', true)

app.prepare()
    .then(() => {
        const server = express.default()

        server.use(cors())
        server.use(helmet())

        server.use(
            session({
                store: new RedisStore({ client: redisClient }),
                secret: 'something very secret',
                resave: false,
                saveUninitialized: true,
                cookie: { maxAge: 3600000 },
            })
        )

        server.use('/api/products', productRouter)

        server.get('/products/:url', (req, res, next) => {
            if (req.session.recentProducts) {
                if (
                    req.session.recentProducts.every(
                        (prodURL: string) => prodURL !== req.params.url
                    )
                )
                    req.session.recentProducts.push(req.params.url)

                if (req.session.recentProducts.length === 5)
                    req.session.recentProducts.pop()
            } else {
                req.session.recentProducts = [req.params.url]
            }

            next()
        })

        server.get('*', (req, res) => handle(req, res))

        server.listen(process.env.EXPRESS_PORT, (err) => {
            if (err) throw err
            console.log(
                `> Express ready on http://localhost:${process.env.EXPRESS_PORT}`
            )
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
    })