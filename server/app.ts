import * as express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'
import connectRedis from 'connect-redis'
import redis from 'redis'

import productRouter from './routes/product'
import collectionsRouter from './routes/collections'

export default async (
    redisHost: string,
    mongoHost: string
): Promise<{ app: express.Express; clear: () => void }> => {
    const redisClient = redis.createClient({ host: redisHost })
    const RedisStore = connectRedis(session)

    mongoose.set('useCreateIndex', true)

    await mongoose
        .connect(`mongodb://${mongoHost}:27017/clothy`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('> MongoDB ready')
        })
        .catch((error) => console.error(error))

    const app = express.default()

    app.use(cors())
    app.use(helmet())

    const sessionStore = new RedisStore({ client: redisClient })

    app.use(
        session({
            store: sessionStore,
            secret: 'something very secret',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 3600000 },
        })
    )

    app.use('/api/products', productRouter(redisClient))
    app.use('/api/collections', collectionsRouter)

    app.get('/products/:url', (req, res, next) => {
        if (
            req.session.recentProducts &&
            Array.isArray(req.session.recentProducts)
        ) {
            if (req.session.recentProducts.length === 5)
                req.session.recentProducts.pop()

            if (
                req.session.recentProducts.every(
                    (prodURL: string) => prodURL !== req.params.url
                )
            )
                req.session.recentProducts.push(req.params.url)
        } else {
            req.session.recentProducts = [req.params.url]
        }

        redisClient.hincrby('productUrls', req.params.url, 1)
        next()
    })

    return {
        app,
        clear: async () => {
            sessionStore.clear()
            redisClient.del('productUrls')
            redisClient.quit()
            await mongoose.connection.close()
        },
    }
}
