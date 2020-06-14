import * as express from 'express'
import Product from '../models/Product'

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (e) {
        console.error(e)
    }
})

productRouter.get('/:url', async (req, res) => {
    try {
        const product = await Product.findOne({ url: req.params.url })
        res.json(product)
    } catch (e) {
        console.error(e)
    }
})

productRouter.get('/search/:text/:skip/:limit', async (req, res) => {
    const searchText = req.params.text

    if (searchText.length > 50) {
        res.json([])
        return
    }

    try {
        const searchedProducts = await Product.find({
            $text: { $search: searchText },
        })
            .skip(parseInt(req.params.skip))
            .limit(parseInt(req.params.limit))

        res.json(searchedProducts)
    } catch (e) {
        console.error(e)
    }
})

export default productRouter
