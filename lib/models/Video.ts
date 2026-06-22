import mongoose, { Schema } from "mongoose";

const VideoSchema = new Schema ({
    title: {type: String, required: true},
    videoUrl: { type: String, required: true },
    fileKey: { type: String, required: true }, // Digunakan untuk menghapus file di UploadThing
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);