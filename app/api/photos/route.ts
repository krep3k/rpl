import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Photo from "@/lib/models/Photo";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// READ: Ambil semua foto
export async function GET() {
    await dbConnect();
    const photos = await Photo.find({}).sort({ createdAt: -1 });
    return NextResponse.json(photos);
}

// CREATE: Simpan data setelah upload sukses
export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const photo = await Photo.create(body);
    return NextResponse.json(photo);
}

// UPDATE: Edit nama/judul foto
export async function PUT(req: Request) {
    await dbConnect();
    const body = await req.json();
    const { id, title } = body;
    const photo = await Photo.findByIdAndUpdate(id, { title }, { new: true });
    return NextResponse.json(photo);
}

// DELETE: Hapus dari DB dan Cloud Storage UploadThing
export async function DELETE(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    try {
        const photo = await Photo.findById(id);
        if (photo) {
            // Hapus file fisik dari server UploadThing
            await utapi.deleteFiles(photo.fileKey);
            // Hapus dokumen dari MongoDB
            await Photo.findByIdAndDelete(id);
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}