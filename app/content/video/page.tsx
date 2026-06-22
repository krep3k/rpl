/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast, Toaster } from "react-hot-toast";
import { PlayCircle, Trash2, Edit3, X, Video as VideoIcon, ArrowLeft, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoData {
    _id: string;
    title: string;
    videoUrl: string;
    fileKey: string;
}

export default function VideoManagerPage() {
    const router = useRouter();
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // State untuk Modal Player
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
    
    // State untuk Edit (Update)
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const fetchVideo = async() => {
        try {
            const res = await fetch("/api/videos");
            const data = await res.json();
            setVideos(data);
        } catch (error) {
            toast.error("Gagal mengambil data video");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchVideo();
    }, []);

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

    const handleUploadComplete = async(res: any) => {
        if (!res || res.length === 0) return;
        const file = res[0];
        const newVideo = {
            title: file.name.replace(".mp4", ""),
            videoUrl: file.ufsUrl,
            fileKey: file.key,
        };
        const loadingToast = toast.loading("Menyimpan ke database...");
        try {
            await fetch("/api/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVideo),
            });
            toast.success("Video berhasil diunggah!", { id: loadingToast });
            fetchVideo();
        } catch (error) {
            toast.error("Gagal menyimpan data", { id: loadingToast });
        }
    };

    const handleUpdate = async(id: string) => {
        if(!editTitle.trim()) return toast.error("Judul tidak boleh kosong!");
        const loadingToast = toast.loading("Memperbarui judul...");
        try {
            await fetch("/api/videos", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, title: editTitle }),
            });
            toast.success("Judul diperbarui!", { id: loadingToast });
            setEditingId(null);
            fetchVideo();
        } catch(error) {
            toast.error("Gagal memperbarui judul", { id: loadingToast });
        }
    };

    const handleDelete = async(id: string) => {
        const confirmDelete = await showConfirmToast("Yakin ingin menghapus video ini secara permanen?");
        if (!confirmDelete) return;
        const loadingToast = toast.loading("Menghapus video dan file di cloud...");
        try {
            await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
            toast.success("Video berhasil dihapus!", { id: loadingToast });
            fetchVideo();
        } catch(error) {
            toast.error("Gagal menghapus video", { id: loadingToast });
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfbf0] text-[#014231] font-sans p-4 md:p-8 relative overflow-hidden selection:bg-[#f8c828]">
            <Toaster position="top-center" toastOptions={{ duration: 3500, style: { border: '4px solid #014231', background: '#fdfbf0', color: '#014231', fontWeight: '900', borderRadius: '12px', boxShadow: '4px 4px 0px 0px #014231' } }}/>
            <div className="absolute inset-0 pointer-events-none opacity-60 z-10 overflow-hidden">
                {[...Array(16)].map((_, i) => {
                    const size = [6, 8, 10, 12, 14][i % 5];
                    
                    // 16 posisi dengan gerakan ke berbagai arah
                    const paths = [
                        // Horizontal (left-right)
                        { startX: "0%", startY: "10%", midX: "50%", midY: "15%", endX: "100%", endY: "8%" },
                        { startX: "100%", startY: "20%", midX: "50%", midY: "22%", endX: "0%", endY: "18%" },
                        
                        // Vertical (top-bottom)
                        { startX: "15%", startY: "0%", midX: "12%", midY: "50%", endX: "18%", endY: "100%" },
                        { startX: "85%", startY: "100%", midX: "88%", midY: "50%", endX: "82%", endY: "0%" },
                        
                        // Diagonal top-left to bottom-right
                        { startX: "0%", startY: "0%", midX: "40%", midY: "40%", endX: "85%", endY: "90%" },
                        { startX: "10%", startY: "5%", midX: "45%", midY: "45%", endX: "90%", endY: "95%" },
                        
                        // Diagonal top-right to bottom-left
                        { startX: "100%", startY: "0%", midX: "60%", midY: "40%", endX: "15%", endY: "90%" },
                        { startX: "95%", startY: "5%", midX: "55%", midY: "45%", endX: "10%", endY: "95%" },
                        
                        // Diagonal bottom-left to top-right
                        { startX: "0%", startY: "100%", midX: "40%", midY: "60%", endX: "85%", endY: "10%" },
                        { startX: "5%", startY: "95%", midX: "45%", midY: "55%", endX: "90%", endY: "5%" },
                        
                        // Diagonal bottom-right to top-left
                        { startX: "100%", startY: "100%", midX: "60%", midY: "60%", endX: "15%", endY: "10%" },
                        { startX: "95%", startY: "95%", midX: "55%", midY: "55%", endX: "10%", endY: "5%" },
                        
                        // Middle horizontal paths
                        { startX: "0%", startY: "50%", midX: "50%", midY: "48%", endX: "100%", endY: "52%" },
                        { startX: "100%", startY: "45%", midX: "50%", midY: "45%", endX: "0%", endY: "48%" },
                        
                        // Center-outward paths
                        { startX: "50%", startY: "50%", midX: "25%", midY: "25%", endX: "5%", endY: "10%" },
                        { startX: "50%", startY: "50%", midX: "75%", midY: "75%", endX: "95%", endY: "90%" },
                    ];
                    
                    const path = paths[i];
                    
                    return (
                        <motion.div 
                            key={i} 
                            initial={{ left: path.startX, top: path.startY }} 
                            animate={{ 
                                left: [path.startX, path.midX, path.endX, path.startX],
                                top: [path.startY, path.midY, path.endY, path.startY],
                                rotate: [0, 90, 180, 270, 360] 
                            }} 
                            transition={{ duration: 100 + i * 15, repeat: Infinity, ease: "linear" }} 
                            className="absolute bg-[#007e5d]/30 border-2 border-[#014231] rounded-2xl flex items-center justify-center text-[#014231]"
                            style={{ padding: `${size * 3}px`, width: 'fit-content', height: 'fit-content' }}
                        >
                            <VideoIcon className={`w-${size} h-${size}`}/>
                        </motion.div>
                    );
                })}
            </div>
            <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative z-20">
                <button onClick={() => router.push("/navigation")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#fdfbf0] text-[#014231] font-black text-xs rounded-xl border-4 border-[#014231] shadow-[4px_4px_0px_0px_#014231] hover:translate-y-0.5 hover:shadow-none transition-all uppercase">
                    <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <div className="bg-[#f8c828] border-4 border-[#014231] p-4 rounded-2xl shadow-[6px_6px_0px_0px_#014231] flex items-center gap-3">
                    <PlayCircle className="w-8 h-8 text-[#014231] animate-pulse"/>
                    <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">RPL Video Hub</h1>
                </div>
            </header>
            <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                <div className="md:col-span-4">
                    <div className="bg-[#fdfbf0] border-4 border-[#014231] p-5 rounded-2xl shadow-[6px_6px_0px_0px_#014231] sticky top-8">
                        <h2 className="text-sm font-black uppercase mb-4 text-[#007e5d] flex items-center gap-2 border-b-4 border-[#014231] pb-2">
                            <VideoIcon className="w-5 h-5"/> Unggah Vidio Baru
                        </h2>
                        <UploadDropzone endpoint="videoUploader" onClientUploadComplete={handleUploadComplete} onUploadError={(error: Error) => {toast.error(`Gagal: ${error.message}`)}} appearance={{
                            container: "border-4 border-dashed border-[#014231] bg-[#007e5d]/5 rounded-xl p-8 hover:bg-[#007e5d]/10 transition-colors cursor-pointer",
                            label: "text-[#014231] font-black uppercase text-xs mt-4",
                            button: "bg-[#014231] text-[#fdfbf0] font-black uppercase text-xs px-4 py-2 rounded-lg mt-4 w-full shadow-[3px_3px_0px_0px_#007e5d]",
                            allowedContent: "text-[#014231]/60 font-bold text-[10px] mt-2",
                        }}/>
                    </div>
                </div>
                <div className="md:col-span-8 space-y-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-10 border-4 border-[#014231] border-dashed rounded-2xl bg-[#fdfbf0]">
                            <Loader2 className="w-10 h-10 animate-spin text-[#007e5d]"/>
                            <p className="font-black mt-4 animate-pulse">Memuat database...</p>
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-16 border-4 border-[#014231] border-dashed rounded-2xl bg-[#fdfbf0] text-center shadow-[4px_4px_0px_0px_#014231]/20">
                            <VideoIcon className="w-16 h-16 text-[#014231]/30 mb-4"/>
                            <h2 className="text-xl font-black uppercase text-[#014231]">Belum ada video</h2>
                            <p className="font-bold text-[#014231]/60 mt-2 text-sm">Upload vidio kamu di panel sebelah kiri</p>
                        </div>
                    ) : (
                        videos.map((video) => (
                            <motion.div key={video._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#fdfbf0] border-4 border-[#014231] p-4 rounded-2xl shadow-[4px_4px_0px_0px_#014231] flex flex-col sm:flex-row items-center gap-4 hover:bg-[#007e5d]/5 transition-colors group">
                                <div onClick={() => setSelectedVideo(video)} className="w-full sm:w-40 h-28 bg-[#014231] rounded-xl border-4 border-[#014231] shadow-[2px_2px_0px_0px_#014231] flex items-center justify-center cursor-pointer relative overflow-hidden group-hover:border-[#f8c828] transition-colors shrink-0">
                                    <video src={video.videoUrl} className="absolute inset-0 w-full h-full object-cover opacity-50"/>
                                    <PlayCircle className="w-12 h-12 text-[#fdfbf0] z-10 group-hover:scale-110 transition-transform"/>
                                </div>
                                <div className="flex-1 min-w-0 w-full">
                                    {editingId === video._id ? (
                                        <div className="flex items-center gap-2 mb-2">
                                            <label htmlFor="edit"></label>
                                            <input id="edit" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-white border-4 border-[#014231] rounded-lg px-3 py-2 text-sm font-black text-[#014231] focus:ring-0 focus:outline-none" autoFocus />
                                            <button title="save" onClick={() => handleUpdate(video._id)} className="p-2.5 bg-[#007e5d] text-white rounded-lg border-2 border-[#014231] hover:scale-105 active:scale-95"><Save className="w-4 h-4"/></button>
                                            <button title="X" onClick={() => setEditingId(null)} className="p-2.5 bg-red-500 text-white rounded-lg border-2 border-[#014231] hover:scale-105 active:scale-95"><X className="w-4 h-4"/></button>
                                        </div>
                                    ) : (
                                        <h3 className="text-lg font-black uppercase text-[#014231] truncate mb-2 leading-tight">
                                            {video.title}
                                        </h3>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <button title="play" onClick={() => setSelectedVideo(video)} className="px-3 py-1.5 bg-[#f8c828] text-[#014231] font-black text-[10px] uppercase rounded-md border-2 border-[#014231] shadow-[2px_2px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1">
                                            <PlayCircle className="w-3 h-3"/>
                                        </button>
                                        <button onClick={() => {setEditingId(video._id); setEditTitle(video.title)}} className="px-3 py-1.5 bg-[#fdfbf0] text-[#007e5d] font-black text-[10px] uppercase rounded-md border-2 border-[#014231] shadow-[2px_2px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1">
                                            <Edit3 className="w-3 h-3"/> Edit
                                        </button>
                                        <button onClick={() => handleDelete(video._id)} className="px-3 py-1.5 bg-[#fdfbf0] text-red-600 font-black text-[10px] uppercase rounded-md border-2 border-[#014231] shadow-[2px_2px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 ml-auto sm:ml-0">
                                            <Trash2 className="w-3 h-3"/> Hapus
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </main>
            <AnimatePresence>
                {selectedVideo && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedVideo(null)} className="absolute inset-0 bg-[#014231]/95"/>
                        <motion.div initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative bg-[#fdfbf0] border-8 border-[#014231] rounded-3xl shadow-[12px_12px_0px_0px_#f8c828] w-full max-w-4xl z-10 overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between p-4 border-b-4 border-[#014231] bg-[#f8c828]">
                                <h2 className="text-sm md:text-base font-black uppercase text-[#014231] truncate flex-1 pr-4">
                                    {selectedVideo.title}
                                </h2>
                                <button title="X" onClick={() => setSelectedVideo(null)} className="bg-[#fdfbf0] border-2 border-[#014231] text-[#014231] p-1.5 rounded-lg shadow-[3px_3px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all shrink-0">
                                    <X className="w-5 h-5 stroke-3"/>
                                </button>
                            </div>
                            <div className="w-full bg-black aspect-video relative">
                                <video src={selectedVideo.videoUrl} controlsList="nodownload" controls autoPlay className="w-full h-full object-contain"/>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}