import mongoose from 'mongoose'

export interface Collection extends mongoose.Document {
    name: string
    cover: string
    description: string
    products: Array<string>
}

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
})

export default mongoose.model<Collection>('Collection', collectionSchema)
