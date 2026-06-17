"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Users, Music, Film, Folder, ArrowLeft, Compass, Code } from "lucide-react";

interface SignItem {
    id: number;
    title: string;
    description: string;
    destination: string;
    icon: React.ComponentType<{className?: string}>;
    rotation: number;
    side: "right" | "left";
}

const navigationSign: SignItem[] = [
    {
        id: 1,
        title: "👥 Gallery Tim",
        description: "Dokumentasi keseruan perjalanan dan kolaborasi projek tim.",
        destination: "/content/gallery",
        icon: Users,
        rotation: -3,
        side: "left",
    },
    {
        id: 2,
        title: "🎵 Music Playlist",
        description: "Lagu-lagu penambah fokus yang menemani kami saat ngoding.",
        destination: "/content/music",
        icon: Music,
        rotation: 4,
        side: "right",
    },
    {
        id: 3,
        title: "🎬 Random Video",
        description: "Koleksi video receh penurun tingkat stress dan hiburan tim.",
        destination: "/content/videos",
        icon: Film,
        rotation: -2,
        side: "left",
    },
    {
        id: 4,
        title: "📂 Behind The Scene",
        description: "Intip proses pengerjaan di balik layar pembuatan aplikasi ini.",
        destination: "/bts",
        icon: Folder,
        rotation: 3,
        side: "right",
    },
    {
        id: 5,
        title: "💻 Developer Setup",
        description: "Lingkungan koding dan tools yang kami gunakan.",
        destination: "/setup",
        icon: Code,
        rotation: -4,
        side: "left",
    }
];

export default function NavigationHub() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-golden text-darkgreen font-sans selection:bg-greenery selection:text-cream p-4 md:p-8 overflow-x-hidden relative flex flex-col items-center justify-between">
            <header className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8 z-30">
                <button onClick={() => router.push("/")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-cream text-darkgreen font-black text-xs rounded-xl border-4 border-darkgreen shadow-[3px_3px_0px_0px_#014231] hover:bg-greenery hover:text-cream active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-wide shrink-0">
                    <ArrowLeft className="w-4 h-4 stroke-3" /> KEMBALI KE HALAMAN AWAL
                </button>
                <div className="bg-cream border-4 border-darkgreen p-4 rounded-2xl shadow-[4px_4px_0px_0px_#014231] flex items-center gap-3 w-full md:max-w-md">
                    <div className="p-2 bg-greenery text-cream rounded-xl border-2 border-darkgreen shrink-0">
                        <Compass className="w-5 h-5 animate-spin-fast"/>
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm font-black uppercase tracking-tight leading-none text-greenery">
                            PUSAT KENDALI SISTEM
                        </h2>
                        <p className="text-[11px] font-bold text-darkgreen/70 truncate mt-1">
                            Silahkan pilih rute berikutnya berdasarkan pada tiang penunjuk
                        </p>
                    </div>
                </div>
            </header>
            <main className="relative w-full max-w-3xl flex-1 flex justify-center py-12 my-auto min-h-137.5">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-greenery border-4 border-darkgreen rounded-t-full shadow-[4px_0px_0px_0px_rgba(1,66,49,0.2)] z-10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-cream rounded-full border-4 border-darkgreen shadow-[2px_2px_0px_0px_#014231] flex items-center justify-center">
                        <div className="w-3 h-3 bg-greenery rounded-full"/>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-darkgreen rounded-t-md"/>
                </div>
                <div className="w-full flex flex-col gap-10 relative z-20 pt-8">
                    {navigationSign.map((sign, index) => {
                        const IconComponent = sign.icon;
                        const isLeft = sign.side === "left";
                        return (
                            <div key={sign.id} className={`w-full flex items-center ${isLeft ? "justify-end pr-[50%] md:pr-[47%]" : "justify-start pl-[50%] md:pl-[47%]"}`}>
                                <motion.div style={{ rotate: sign.rotation }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }} whileHover={{ scale: 1.05, rotate: sign.rotation + (isLeft ? -2 : 2), zIndex: 40 }} whileTap={{ scale: 0.97 }} onClick={() => router.push(sign.destination)} className={`w-[16rem] sm:w-[20rem] md:w-92 bg-cream border-4 border-darkgreen p-4 shadow-[5px_5px_0px_0px_#014231] relative group cursor-pointer transition-shadow duration-150 hover:shadow-[8px_8px_0px_0px_#014231] ${isLeft ? "rounded-l-2xl rounded-br-2xl border-r-12 origin-right" : "rounded-r-2xl rounded-bl-2xl border-l-12 origin-left"}`} >
                                    <div className="flex items-start gap-3 select-none">
                                        <div className="p-2.5 bg-golden border-2 border-darkgreen rounded-xl text-darkgreen shrink-0 shadow-[2px_2px_0px_0px_#014231] group-hover:bg-greenery group-hover:text-cream transition-colors duration-200">
                                            <IconComponent className="w-5 h-5 stroke-2.5"/>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-darkgreen group-hover:text-greenery transition-colors">
                                                {sign.title}
                                            </h3>
                                            <p className="text-[10px] md:text-xs font-bold text-darkgreen/70 leading-tight mt-0.5 group-hover:text-darkgreen transition-colors">
                                                {sign.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-golden border-2 border-darkgreen rounded-full ${isLeft ? "-right-2" : "-left-2"}`}></div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </main>
            <footer className="w-full text-center py-4 border-t-4 border-darkgreen text-[10px] font-black uppercase tracking-wider mt-8 text-darkgreen/60">
                &copy; 2026 TIM RISKI
            </footer>
        </div>
    )
}