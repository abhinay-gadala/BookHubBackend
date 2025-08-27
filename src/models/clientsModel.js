import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    status: { type: String, enum: ['Love', 'Horror', 'Psychology', 'Rich'], default: 'wishlist' },
})

const clientModel = mongoose.model("Client", clientSchema);
export default clientModel;