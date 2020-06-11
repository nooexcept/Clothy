import * as express from 'express'
import Product from '../models/Product'

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

productRouter.get('/:url', async (req, res) => {
    const product = await Product.findOne({ url: req.params.url })
    res.json(product)
})

export default productRouter
