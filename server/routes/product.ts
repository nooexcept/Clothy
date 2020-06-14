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

export default productRouter
