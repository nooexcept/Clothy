import mongoose from 'mongoose'

export interface Showcase extends mongoose.Document {
    collId: string
}

const showcaseSchema = new mongoose.Schema({
    collId: {
        type: String,
        required: true,
    },
})

export default mongoose.model<Showcase>('Showcase', showcaseSchema)
