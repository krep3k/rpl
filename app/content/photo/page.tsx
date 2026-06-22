/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast, Toaster } from "react-hot-toast";
import { Image as ImageIcon, Trash2, Edit3, X, ArrowLeft, Loader2, Save, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PhotoData {
    _id: string;
    title: string;
    imageUrl: string;
    fileKey: string;
}

export default function PhotoGalleryPage() {
    const router = useRouter();
    const [photos, setPhotos] = useState<PhotoData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // State Modal View & Modifikasi Data
    const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const fetchPhoto = async() => {
        try {
            const res = await fetch("/api/photos");
            const data = await res.json();
            setPhotos(data);
        } catch(error) {
            toast.error("Gagal memuat galeri foto");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPhoto();
    }, []);

    const handleUploadComplete = async(res: any) => {
        if (!res || res.length === 0) return;
        const file = res[0];
        const newPhoto = {
            title: file.name.split('.').slice(0, -1).join('.'), // Ambil nama asli tanpa ekstensi
            imageUrl: file.ufsUrl || file.appUrl || file.serverData?.fileUrl || file.url,
            fileKey: file.key || file.serverData?.fileKey,
        };
        if (!newPhoto.imageUrl || !newPhoto.fileKey) {
            toast.error("Gagal mendapatkan response data dari UploadThing v7");
            return;
        };
        const loadingToast = toast.loading("Menyimpan foto ke database...");
        try {
            const response = await fetch("/api/photos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPhoto),
            });
            if (!response.ok) throw new Error();
            toast.success("Foto berhasil ditambahkan!", { id: loadingToast });
            fetchPhoto();
        } catch(error) {
            toast.error("Gagal sinkronisasi database", { id: loadingToast });
        }
    };
    const handleUpdate = async(id: string) => {
        if (!editTitle.trim()) return toast.error("Nama foto tidak boleh kosong!");
        const loadingToast = toast.loading("Mengubah nama...");
        try {
            await fetch("/api/photos", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, title: editTitle }),
            });
            toast.success("Nama berhasil diubah!", { id: loadingToast });
            setEditingId(null);
            fetchPhoto();
        } catch(error) {
            toast.error("Gagal mengubah nama", { id: loadingToast });
        }
    };

    const showConfirmToast = (message: string) => {
        return new Promise<boolean>((resolve) => {
            const toastId = toast.custom((t) => (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -20 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="max-w-sm rounded-2xl border-4 border-[#014231] bg-[#fdfbf0] p-4 shadow-[4px_4px_0px_0px_#014231] text-[#014231]">
                    <p className="font-black text-sm mb-3">{message}</p>
                    <div className="flex gap-2">
                        <button onClick={() => { toast.dismiss(toastId); resolve(false); }} className="flex-1 rounded-xl border-2 border-[#014231] bg-[#fdfbf0] px-3 py-2 text-xs font-black uppercase text-[#014231] hover:bg-[#007e5d]/10 transition">Batal</button>
                        <button onClick={() => { toast.dismiss(toastId); resolve(true); }} className="flex-1 rounded-xl bg-[#007e5d] px-3 py-2 text-xs font-black uppercase text-[#fdfbf0] hover:bg-[#00573f] transition">Hapus</button>
                    </div>
                </motion.div>
            ), {
                duration: Infinity,
                position: 'top-center',
                style: { padding: 0, background: 'transparent', boxShadow: 'none' },
            });
        });
    };

    const handleDelete = async(e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Mencegah modal terbuka saat tombol hapus diklik
        const confirmDelete = await showConfirmToast("Hapus foto ini secara permanen?");
        if (!confirmDelete) return;
        const loadingToast = toast.loading("Menghapus file di cloud storage...");
        try {
            await fetch(`/api/photos?id=${id}`, { method: "DELETE" });
            toast.success("Foto berhasil terhapus!", { id: loadingToast });
            fetchPhoto();
        } catch(error) {
            toast.error("Gagal menghapus foto", { id: loadingToast });
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfbf0] text-[#014231] font-sans p-4 md:p-8 relative overflow-hidden selection:bg-[#f8c828]">
            <div className="absolute inset-0 pointer-events-none opacity-60 z-0 overflow-hidden">
                {[...Array(16)].map((_, i) => {
                    const size = [6, 8, 10, 12, 14][i % 5];
                    const paths = [
                        { startX: "0%", startY: "10%", midX: "50%", midY: "15%", endX: "100%", endY: "8%" },
                        { startX: "100%", startY: "20%", midX: "50%", midY: "22%", endX: "0%", endY: "18%" },
                        { startX: "15%", startY: "0%", midX: "12%", midY: "50%", endX: "18%", endY: "100%" },
                        { startX: "85%", startY: "100%", midX: "88%", midY: "50%", endX: "82%", endY: "0%" },
                        { startX: "0%", startY: "0%", midX: "40%", midY: "40%", endX: "85%", endY: "90%" },
                        { startX: "10%", startY: "5%", midX: "45%", midY: "45%", endX: "90%", endY: "95%" },
                        { startX: "100%", startY: "0%", midX: "60%", midY: "40%", endX: "15%", endY: "90%" },
                        { startX: "95%", startY: "5%", midX: "55%", midY: "45%", endX: "10%", endY: "95%" },
                        { startX: "0%", startY: "100%", midX: "40%", midY: "60%", endX: "85%", endY: "10%" },
                        { startX: "5%", startY: "95%", midX: "45%", midY: "55%", endX: "90%", endY: "5%" },
                        { startX: "100%", startY: "100%", midX: "60%", midY: "60%", endX: "15%", endY: "10%" },
                        { startX: "95%", startY: "95%", midX: "55%", midY: "55%", endX: "10%", endY: "5%" },
                        { startX: "0%", startY: "50%", midX: "50%", midY: "48%", endX: "100%", endY: "52%" },
                        { startX: "100%", startY: "45%", midX: "50%", midY: "45%", endX: "0%", endY: "48%" },
                        { startX: "50%", startY: "50%", midX: "25%", midY: "25%", endX: "5%", endY: "10%" },
                        { startX: "50%", startY: "50%", midX: "75%", midY: "75%", endX: "95%", endY: "90%" },
                    ];
                    const path = paths[i];
                    return (
                        <motion.div key={i} initial={{ left: path.startX, top: path.startY }} animate={{ left: [path.startX, path.midX, path.endX, path.startX], top: [path.startY, path.midY, path.endY, path.startY], rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 100 + i * 12, repeat: Infinity, ease: "linear" }} className="absolute bg-[#007e5d]/30 border-2 border-[#014231] rounded-2xl flex items-center justify-center text-[#014231]" style={{ padding: `${size * 3}px`, width: 'fit-content', height: 'fit-content' }}>
                            <ImageIcon className={`w-${size} h-${size}`}/>
                        </motion.div>
                    );
                })}
            </div>
            <Toaster position="top-center" toastOptions={{ duration: 3500, style: { border: '4px solid #014231', background: '#fdfbf0', color: '#014231', fontWeight: '900', borderRadius: '12px', boxShadow: '4px 4px 0px 0px #014231' } }}/>
            <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative z-10">
                <button onClick={() => router.push("/navigation")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#fdfbf0] text-[#014231] font-black text-xs rounded-xl border-4 border-[#014231] shadow-[4px_4px_0px_0px_#014231] hover:translate-y-0.5 hover:shadow-none transition-all uppercase">
                    <ArrowLeft className="w-4 h-4"/> Kembali
                </button>
                <div className="bg-[#f8c828] border-4 border-[#014231] p-4 rounded-2xl shadow-[6px_6px_0px_0px_#014231] flex items-center gap-3">
                    <ImageIcon className="w-8 h-8 text-[#014231]"/>
                    <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">RPL Media Gallery</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                <div className="lg:col-span-4">
                    <div className="bg-[#fdfbf0] border-4 border-[#014231] p-5 rounded-2xl shadow-[6px_6px_0px_0px_#014231] sticky top-8">
                        <h2 className="text-sm font-black uppercase mb-4 text-[#007e5d] flex items-center gap-2 border-b-4 border-[#014231] pb-2">
                            <ImageIcon className="w-5 h-5"/> Unggah Foto Baru
                        </h2>
                        <UploadDropzone endpoint="imageUploader" onClientUploadComplete={handleUploadComplete} onUploadError={(error: Error) => {toast.error(`Error: ${error.message}`)}} appearance={{
                            container: "border-4 border-dashed border-[#014231] bg-[#007e5d]/5 rounded-xl p-6 hover:bg-[#007e5d]/10 transition-colors cursor-pointer",
                            label: "text-[#014231] font-black uppercase text-xs mt-4",
                            button: "bg-[#014231] text-[#fdfbf0] font-black uppercase text-xs px-4 py-2 rounded-lg mt-4 w-full shadow-[3px_3px_0px_0px_#007e5d]",
                            allowedContent: "text-[#014231]/60 font-bold text-[10px] mt-2",
                        }}/>
                    </div>
                </div>
                <div className="lg:col-span-8">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-20 border-4 border-[#014231] border-dashed rounded-2xl bg-[#fdfbf0]">
                            <Loader2 className="w-12 h-12 animate-spin text-[#007e5d]"/>
                            <p className="font-black mt-4 animate-pulse">Menghubungkan Database Gallery</p>
                        </div>
                    ) : photos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-20 border-4 border-[#014231] border-dashed rounded-2xl bg-[#fdfbf0] text-center shadow-[4px_4px_0px_0px_#014231]/10">
                            <ImageIcon className="w-16 h-16 text-[#014231]/30 mb-4"/>
                            <h2 className="text-xl font-black uppercase text-[#014231]">Belum Ada Foto di Gallery</h2>
                            <p className="font-bold text-[#014231]/60 mt-2 text-sm max-w-sm">Silahkan Upload Foto Lewat Panel di Sebelah Kiri</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {photos.map((photo) => (
                                <motion.div key={photo._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -4, transition: { duration: 0.1 } }} onClick={() => setSelectedPhoto(photo)} className="bg-[#fdfbf0] border-4 border-[#014231] rounded-2xl shadow-[4px_4px_0px_0px_#014231] overflow-hidden flex flex-col cursor-pointer relative group">
                                    <div className="aspect-square bg-slate-100 border-b-4 border-[#014231] relative overflow-hidden">
                                        <img src={photo.imageUrl} alt={photo.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                        <div className="absolute inset-0 bg-[#014231]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="p-2.5 bg-[#fdfbf0] border-2 border-[#014231] rounded-lg shadow-[2px_2px_0px_0px_#014231]">
                                                <Maximize2 className="w-5 h-5 text-[#014231]"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white flex-1 flex flex-col justify-between gap-2">
                                        {editingId === photo._id ? (
                                            <div className="flex items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                                                <label htmlFor="edit"></label>
                                                <input type="text" id="edit" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} autoFocus className="w-full bg-white border-2 border-[#014231] rounded px-2 py-1 text-xs font-black text-[#014231]" />
                                                <button title="save" onClick={() => handleUpdate(photo._id)} className="p-1.5 bg-[#007e5d] text-white rounded border border-[#014231]"><Save className="w-3.5 h-3.5" /></button>
                                                <button title="X" onClick={() => setEditingId(null)} className="p-1.5 bg-red-500 text-white rounded border border-[#014231]"><X className="w-3.5 h-3.5" /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-xs font-black uppercase text-[#014231] truncate leading-tight">
                                                    {photo.title}
                                                </p>
                                            </div>
                                        )}
                                        {editingId !== photo._id && (
                                            <div className="flex items-center gap-2 mt-1 pt-2 border-t border-[#014231]/10">
                                                <button onClick={(e) => { e.stopPropagation(); setEditingId(photo._id); setEditTitle(photo.title); }} className="px-2 py-1 bg-[#fdfbf0] text-[#007e5d] font-black text-[9px] uppercase rounded border-2 border-[#014231] shadow-[1px_1px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1">
                                                    <Edit3 className="w-2.5 h-2.5"/> Rename
                                                </button>
                                                <button onClick={(e) => handleDelete(e, photo._id)} className="px-2 py-1 bg-[#fdfbf0] text-red-600 font-black text-[9px] uppercase rounded border-2 border-[#014231] shadow-[1px_1px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 ml-auto">
                                                    <Trash2 className="w-2.5 h-2.5"/> Hapus
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <AnimatePresence>
                {selectedPhoto && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)} className="absolute inset-0 bg-[#014231]/90 backdrop-blur-sm"/>
                        <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ type: "spring", damping: 25 }} className="relative bg-[#fdfbf0] border-8 border-[#014231] rounded-2xl shadow-[8px_8px_0px_0px_#f8c828] w-full max-w-4xl z-10 overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between p-3 border-b-4 border-[#014231] bg-[#f8c828]">
                                <span className="text-xs md:text-sm font-black uppercase text-[#014231] truncate flex-1 pr-4">
                                    Viewing: {selectedPhoto.title}
                                </span>
                                <button title="X" onClick={() => setSelectedPhoto(null)} className="bg-[#fdfbf0] border-2 border-[#014231] text-[#014231] p-1 rounded shadow-[2px_2px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all">
                                    <X className="w-4 h-4 stroke-3"/>
                                </button>
                            </div>
                            <div className="w-full bg-stone-900 max-h-[75vh] overflow-hidden flex items-center justify-center">
                                <img src={selectedPhoto.imageUrl} alt={selectedPhoto.title} className="w-full h-full max-h-[75vh] object-contain"/>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}