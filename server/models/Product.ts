import mongoose from 'mongoose'

export interface Product extends mongoose.Document {
    name: string
    url: string
    description: string
    stock: number
    price: number
    cod: string
    images: Array<string>
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cod: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
})

productSchema.index({ name: 'text', description: 'text' })

export default mongoose.model<Product>('Product', productSchema)
