import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Video from "@/lib/models/Video";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// READ (Ambil Data)
export async function GET() {
    await dbConnect();
    const videos = await Video.find({}).sort({ createdAt: -1 });
    return NextResponse.json(videos);
}

// CREATE (Simpan ke DB setelah upload)
export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const video = await Video.create(body);
    return NextResponse.json(video);
}

// UPDATE (Edit Judul)
export async function PUT(req: Request) {
    await dbConnect();
    const body = await req.json();
    const { id, title } = body;
    const video = await Video.findByIdAndUpdate(id, { title }, { new: true });
    return NextResponse.json(video);
}

// DELETE (Hapus dari DB dan Cloud Storage)
export async function DELETE(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    try {
        const video = await Video.findById(id);
        if (video) {
          // Hapus file fisiknya dari UploadThing
            await utapi.deleteFiles(video.fileKey);
          // Hapus datanya dari MongoDB
            await Video.findByIdAndDelete(id);
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}   