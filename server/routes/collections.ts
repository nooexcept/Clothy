import * as express from 'express'
import Showcase from '../models/Showcase'
import Collection from '../models/Collection'

const collectionsRouter = express.Router()

collectionsRouter.get('/showcases', async (req, res) => {
    try {
        const showcases = await Showcase.find()

        const showcasedCollections = await Promise.all(
            showcases.map(
                async (showcase) =>
                    await Collection.findOne({ _id: showcase.collId })
            )
        )

        res.json(showcasedCollections)
    } catch (e) {
        console.error(e)
    }
})

export default collectionsRouter
