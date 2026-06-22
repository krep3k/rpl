import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fileKey: { type: String, required: true }, // Digunakan untuk menghapus file di UploadThing v7
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);