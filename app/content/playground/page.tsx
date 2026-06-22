/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Sparkles, HelpCircle, RefreshCw, Layers } from "lucide-react";
import { useRouter } from "next/navigation";

interface ThemeStyle {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    glow: string;
    bgCard: string;
    text: string;
    desc: string;
}

interface PhysicsItem {
    id: string;
    type: "preset" | "preview";
    themeId?: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    w: number;
    h: number;
    mass: number;
    angle: number;
    va: number; // Angular Velocity (Kecepatan Rotasi)
    isDragging: boolean;
}

const THEME_PRESETS: Record<string, ThemeStyle> = {
    nebula: {
        id: "nebula",
        name: "Nebula Cosmic",
        primary: "#d442f5",
        secondary: "#4a154b",
        accent: "#00ffff",
        border: "#d442f5",
        glow: "rgba(212, 66, 245, 0.6)",
        bgCard: "#130924",
        text: "#ffffff",
        desc: "Energi plasma galaksi ungu & cyan."
    },
    ocean: {
        id: "ocean",
        name: "Abyssal Ocean",
        primary: "#0ea5e9",
        secondary: "#1e3a8a",
        accent: "#38bdf8",
        border: "#0ea5e9",
        glow: "rgba(14, 165, 233, 0.6)",
        bgCard: "#0b1329",
        text: "#f8fafc",
        desc: "Kedalaman palung laut yang tenang."
    },
    sunset: {
        id: "sunset",
        name: "Solar Sunset",
        primary: "#f97316",
        secondary: "#7c2d12",
        accent: "#facc15",
        border: "#f97316",
        glow: "rgba(249, 115, 22, 0.6)",
        bgCard: "#1c1412",
        text: "#fafaf9",
        desc: "Pendaran hangat horizon bintang redup."
    },
    emerald: {
        id: "emerald",
        name: "Cyber Emerald",
        primary: "#10b981",
        secondary: "#064e3b",
        accent: "#34d399",
        border: "#10b981",
        glow: "rgba(16, 185, 129, 0.6)",
        bgCard: "#051e17",
        text: "#f0fdf4",
        desc: "Matriks lab bio-futuristik fusi hijau."
    },
    mars: {
        id: "mars",
        name: "Crimson Mars",
        primary: "#ef4444",
        secondary: "#7f1d1d",
        accent: "#f97316",
        border: "#ef4444",
        glow: "rgba(239, 68, 68, 0.6)",
        bgCard: "#1a1010",
        text: "#f4f4f5",
        desc: "Gurun berkarat dengan radiasi tinggi."
    },
    aurora: {
        id: "aurora",
        name: "Neon Aurora",
        primary: "#22c55e",
        secondary: "#14532d",
        accent: "#a855f7",
        border: "#22c55e",
        glow: "rgba(34, 197, 94, 0.6)",
        bgCard: "#071a10",
        text: "#f0fdf4",
        desc: "Anomali tirai magnetik kutub utara."
    },
    void: {
        id: "void",
        name: "Absolute Void",
        primary: "#ffffff",
        secondary: "#27272a",
        accent: "#a1a1aa",
        border: "#ffffff",
        glow: "rgba(255, 255, 255, 0.3)",
        bgCard: "#09090b",
        text: "#fafafa",
        desc: "Ketiadaan materi masif, gelap murni."
    }
}

export default function ThemePlaygroundPage() {
    const router = useRouter();
    const [currentTheme, setCurrentTheme] = useState<ThemeStyle>(THEME_PRESETS.nebula);
    // State Interaktif untuk Komponen di Live Preview
    const [previewCheckbox, setPreviewCheckbox] = useState(true);
    const [previewSwitch, setPreviewSwitch] = useState(false);
    const [previewProgress, setPreviewProgress] = useState(45);
    const [previewInputValue, setPreviewInputValue] = useState("Zero Gravity Labs");
    // Ref Kontainer Utama Ruangan dan Item Fisik
    const roomRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<PhysicsItem[]>([]);
    const domRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const dragTracker = useRef({
        itemId: null as string | null,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        startTime: 0,
        hasMoved: false
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setPreviewProgress((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(!roomRef.current) return;
        const roomWidth = roomRef.current.clientWidth || window.innerWidth;
        const roomHeight = roomRef.current.clientHeight || window.innerHeight;

        const itemsData: PhysicsItem[] = [
            {
                id: "live-preview",
                type: "preview",
                x: roomWidth / 2 - 180,
                y: roomHeight / 2 - 200,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                w: 360,
                h: 400,
                mass: 2.5,
                angle: (Math.random() - 0.5) * 10,
                va: (Math.random() - 0.5) * 0.5,
                isDragging: false
            },
            ...Object.values(THEME_PRESETS).map((theme, index) => {
                const anglePos = (index / Object.keys(THEME_PRESETS).length) * Math.PI * 2;
                const radius = Math.min(roomWidth, roomHeight) * 0.3;
                const initialX = roomWidth / 2 + Math.cos(anglePos) * radius - 110;
                const initialY = roomHeight / 2 + Math.sin(anglePos) * radius - 60;
                return {
                    id: theme.id,
                    type: "preset" as const,
                    themeId: theme.id,
                    x: initialX,
                    y: initialY,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    w: 220,
                    h: 120,
                    mass: 1.0,
                    angle: (Math.random() - 0.5) * 20,
                    va: (Math.random() - 0.5) * 1.5,
                    isDragging: false
                };
            })
        ];

        itemsRef.current = itemsData;

        let animationFrameId: number;
        const friction = 0.992;      // Hambatan udara ruang hampa lab
        const wallRestitution = 0.75; // Kekenyalan pantulan dinding kontainer
        const cardRestitution = 0.65;

        const updatePhysics = () => {
            if (!roomRef.current) return;
            const currentWidth = roomRef.current.clientWidth;
            const currentHeight = roomRef.current.clientHeight;
            const items = itemsRef.current;

            for(let i=0; i<items.length; i++) {
                const itemA = items[i];
                if(!itemA.isDragging) {
                    itemA.x += itemA.vx;
                    itemA.y += itemA.vy;
                    itemA.angle += itemA.va;

                    // Reduksi kecepatan perlahan (Efek Friksi Ruangan)
                    itemA.vx *= friction;
                    itemA.vy *= friction;
                    itemA.va *= 0.98; // Hambatan rotasi

                    // Tambahkan sedikit dorongan random ambient kecil untuk efek melayang abadi
                    itemA.vx += (Math.random() - 0.5) * 0.02;
                    itemA.vy += (Math.random() - 0.5) * 0.02;

                    // --- DETEKSI & RESPONS TABRAKAN DINDING ---
                    if (itemA.x < 10) {
                        itemA.x = 10;
                        itemA.vx *= -wallRestitution;
                        itemA.va += itemA.vy * 0.1; // Rotasi akibat gesekan dinding
                    } else if (itemA.x + itemA.w > currentWidth - 10) {
                        itemA.x = currentWidth - itemA.w - 10;
                        itemA.vx *= -wallRestitution;
                        itemA.va -= itemA.vy * 0.1;
                    }
                    if (itemA.y < 10) {
                        itemA.y = 10;
                        itemA.vy *= -wallRestitution;
                        itemA.va -= itemA.vx * 0.1;
                    } else if (itemA.y + itemA.h > currentHeight - 10) {
                        itemA.y = currentHeight - itemA.h - 10;
                        itemA.vy *= -wallRestitution;
                        itemA.va += itemA.vx * 0.1;
                    }
                }
                
                for(let j = i+1; j < items.length; j++) {
                    const itemB = items[j];

                    // Hitung pusat massa masing-masing card
                    const cxA = itemA.x + itemA.w / 2;
                    const cyA = itemA.y + itemA.h / 2;
                    const cxB = itemB.x + itemB.w / 2;
                    const cyB = itemB.y + itemB.h / 2;

                    const dx = cxB - cxA;
                    const dy = cyB - cyA;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Pendekatan radius aman untuk mencegah penumpukan overlap
                    const minDistance = (itemA.w + itemB.w) / 3.8;

                    if (distance < minDistance && distance > 0) {
                        const overlap = minDistance - distance;
                        const nx = dx / distance;
                        const ny = dy / distance;
                        
                        // Deteksi collision dan ganti tema instan saat live-preview bertabrakan dengan theme
                        if ((itemA.type === "preview" && itemB.type === "preset") || 
                            (itemA.type === "preset" && itemB.type === "preview")) {
                            const themeItem = itemA.type === "preset" ? itemA : itemB;
                            if (themeItem.themeId) {
                                setCurrentTheme(THEME_PRESETS[themeItem.themeId]);
                            }
                        }
                        
                        // Pisahkan kedua komponen agar tidak tersangkut berdempetan
                        if (!itemA.isDragging) {
                            itemA.x -= nx * overlap * 0.5;
                            itemA.y -= ny * overlap * 0.5;
                        }
                        if (!itemB.isDragging) {
                            itemB.x += nx * overlap * 0.5;
                            itemB.y += ny * overlap * 0.5;
                        }
                    
                        // Hitung transfer momentum momentum elastis beralih arah kecepatan
                        const kx = itemA.vx - itemB.vx;
                        const ky = itemA.vy - itemB.vy;
                        const impulse = (2 * (nx * kx + ny * ky)) / (itemA.mass + itemB.mass);
                        
                        if (!itemA.isDragging) {
                            itemA.vx -= impulse * itemB.mass * nx * cardRestitution;
                            itemA.vy -= impulse * itemB.mass * ny * cardRestitution;
                            itemA.va += (itemB.vx - itemA.vx) * 0.05;
                        }
                        if (!itemB.isDragging) {
                            itemB.vx += impulse * itemA.mass * nx * cardRestitution;
                            itemB.vy += impulse * itemA.mass * ny * cardRestitution;
                            itemB.va += (itemA.vx - itemB.vx) * 0.05;
                        }
                    }
                }
                const domEl = domRefs.current[itemA.id];
                if(domEl) {
                    domEl.style.transform = `translate3d(${itemA.x}px, ${itemA.y}px, 0px) rotate(${itemA.angle}deg)`;
                }
            }
            animationFrameId = requestAnimationFrame(updatePhysics);
        };
        animationFrameId = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handlePointerDown = (e: React.PointerEvent, id: string) => {
        // Abaikan jika mengklik input atau interactive element
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'LABEL' || target.closest('label') || target.getAttribute('role') === 'switch') {
            return;
        }
        
        const item = itemsRef.current.find((i) => i.id === id);
        if (!item) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        item.isDragging = true;
        item.vx = 0;
        item.vy = 0;

        dragTracker.current = {
            itemId: id,
            startX: e.clientX,
            startY: e.clientY,
            lastX: e.clientX,
            lastY: e.clientY,
            startTime: Date.now(),
            hasMoved: false
        };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        const tracker = dragTracker.current;
        if (!tracker.itemId) return;
        const item = itemsRef.current.find((i) => i.id === tracker.itemId);
        if (!item) return;
        const deltaX = e.clientX - tracker.lastX;
        const deltaY = e.clientY - tracker.lastY;
        // Geser posisi koordinat objek langsung mengikuti kursor
        item.x += deltaX;
        item.y += deltaY;
        // Kalkulasi kalkulasi instant velocity instan saat dilempar
        item.vx = deltaX;
        item.vy = deltaY;
        // Deteksi jika pointer benar-benar digeser secara signifikan atau sekadar diam pasif
        if (Math.abs(e.clientX - tracker.startX) > 4 || Math.abs(e.clientY - tracker.startY) > 4) {
            tracker.hasMoved = true;
        }
        tracker.lastX = e.clientX;
        tracker.lastY = e.clientY;
    };

    const handlePointerUp = (e: React.PointerEvent, id: string) => {
        const tracker = dragTracker.current;
        const item = itemsRef.current.find((i) => i.id === id);

        if (item) {
            item.isDragging = false;
            // Berikan efek torsi putaran acak saat dilepaskan/dilempar dari genggaman kursor
            if (tracker.hasMoved) {
                item.va = (item.vx * Math.random() - item.vy * Math.random()) * 0.2;
            }
            // AKSI KLIK VALID: Jika kursor tidak bergeser jauh, eksekusi pemilihan tema secara instan
            if (!tracker.hasMoved && item.type === "preset" && item.themeId) {
                setCurrentTheme(THEME_PRESETS[item.themeId]);
            }
        }
        tracker.itemId = null;
    };

    const resetRoomPhysics = () => {
        if (!roomRef.current) return;
        const w = roomRef.current.clientWidth;
        const h = roomRef.current.clientHeight;
        itemsRef.current.forEach((item) => {
          item.vx = (Math.random() - 0.5) * 6;
          item.vy = (Math.random() - 0.5) * 6;
          item.va = (Math.random() - 0.5) * 3;
        });
    };

    return (
        <div ref={roomRef} onPointerMove={handlePointerMove} style={{
            backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                radial-gradient(circle at 75% 60%, rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px),
                radial-gradient(circle at 50% 85%, rgba(255, 255, 255, 0.03) 2px, transparent 2px),
                radial-gradient(100% 100% at 50% 50%, #0c0d19 0%, #030307 100%)
            `,
            backgroundSize: "250px 250px, 400px 400px, 300px 300px, 100% 100%",
            // VARIABEL CSS SCOPE LOKAL: Mengontrol visual hanya sebatas elemen di dalam halaman ini!
            ["--p-color" as any]: currentTheme.primary,
            ["--s-color" as any]: currentTheme.secondary,
            ["--a-color" as any]: currentTheme.accent,
            ["--b-color" as any]: currentTheme.border,
            ["--g-color" as any]: currentTheme.glow,
            ["--bg-card" as any]: currentTheme.bgCard,
            ["--text-color" as any]: currentTheme.text,
        }} className="w-screen h-screen overflow-hidden bg-[#05050a] text-white font-sans relative select-none">
            <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between z-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <button onClick={() => router.push("/navigation")} className="inline-flex items-center gap-2 px-3 py-2 bg-[#090a14] text-gray-400 font-bold text-xs uppercase rounded-xl border-2 border-gray-800 shadow-[3px_3px_0px_0px_#111] hover:text-white hover:border-gray-600 transition-all active:translate-y-0.5 active:shadow-none">
                        <ArrowLeft className="w-4 h-4"/> Kembali
                    </button>
                    <div className="hidden md:flex items-center gap-2 bg-[#090a14]/90 border-2 border-gray-800 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                            Physics Core Active
                    </div>
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                    <button onClick={resetRoomPhysics} title="Kacaukan" className="p-2.5 bg-[#090a14] border-2 border-gray-800 text-gray-400 hover:text-white rounded-xl transition-all shadow-[3px_3px_0px_0px_#111] active:translate-y-0.5 active:shadow-none">
                        <RefreshCw className="w-4 h-4"/>
                    </button>
                    <div className="bg-[#090a14]/90 border-2 border-gray-800 p-3 rounded-xl flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                        <Layers className="w-5 h-5 text-sky-400 animate-bounce"/>
                        <div>
                            <h1 className="text-xs font-black uppercase tracking-tight text-white leading-none">Theme Room</h1>
                            <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">Active: {currentTheme.name}</p>
                        </div>
                    </div>
                </div>
            </header>
            <footer className="absolute bottom-4 left-4 right-4 pointer-events-none z-40 flex justify-center">
                <div className="bg-black/70 backdrop-blur-md border border-gray-800 rounded-full px-4 py-1.5 text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wide flex items-center gap-2 shadow-2xl">
                    <HelpCircle className="w-3.5 h-3.5 text-yellow-400"/>
                    Lempar atau benturkan card preset untuk mengubah tema secara instant!
                </div>
            </footer>
            <div className="w-full h-full relative z-20">
                {Object.values(THEME_PRESETS).map((theme) => {
                    const isSelected = currentTheme.id === theme.id;
                    return (
                        <div key={theme.id} ref={(el) => { domRefs.current[theme.id] = el; }} onPointerDown={(e) => handlePointerDown(e, theme.id)} onPointerUp={(e) => handlePointerUp(e, theme.id)} className={`absolute select-none rounded-xl p-4 border-4 flex flex-col justify-between cursor-grab active:cursor-grabbing text-left transition-all duration-300 touch-none ${isSelected ? "z-40" : "z-10"}`} style={{
                            width: "220px",
                            height: "125px",
                            backgroundColor: theme.bgCard,
                            borderColor: isSelected ? "var(--p-color)" : theme.border,
                            color: theme.text,
                            boxShadow: isSelected 
                                ? `0px 20px 30px rgba(0,0,0,0.7), 0px 0px 20px ${theme.glow}` 
                                : "0px 10px 20px rgba(0,0,0,0.4)",
                        }}>
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 pointer-events-none">
                                <h3 className="text-xs font-black uppercase tracking-wider">{theme.name}</h3>
                                <div className="w-2.5 h-2.5 rounded-full border shadow-inner" style={{ backgroundColor: theme.primary, borderColor: theme.accent }}/>
                            </div>
                            <p className="text-[10px] font-medium opacity-70 leading-relaxed my-1.5 pointer-events-none">
                                {theme.desc}
                            </p>
                            <div className="flex items-center justify-between text-[9px] font-black uppercase pt-1 border-t border-white/5 pointer-events-none">
                                <span style={{ color: theme.accent }}>{theme.id} core</span>
                                {isSelected && (
                                    <span className="animate-pulse bg-white/20 px-1.5 py-0.2 rounded border border-white/30 text-[8px]">
                                        ENGAGED
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={(el) => { domRefs.current["live-preview"] = el; }} onPointerDown={(e) => handlePointerDown(e, "live-preview")} onPointerUp={(e) => handlePointerUp(e, "live-preview")} style={{
                    width: "360px",
                    height: "410px",
                    borderColor: "var(--b-color)",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px var(--g-color)",
                }} className="absolute select-none bg-[var(--bg-card)] text-[var(--text-color)] rounded-2xl p-6 flex flex-col justify-between border-4 transition-colors duration-300 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing group touch-none z-50">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"/>
                    <div className="relative z-10 flex items-center justify-between border-b-2 pb-3" style={{ borderColor: "var(--b-color)" }}>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 animate-spin" style={{ color: "var(--p-color)" }}/>
                            <span className="text-xs font-black tracking-widest uppercase">SYSTEM PREVIEW</span>
                        </div>
                        <div className="text-[9px] font-black px-2 py-0.5 rounded border" style={{ borderColor: "var(--b-color)", backgroundColor: "var(--s-color)" }}>
                            {currentTheme.id.toLocaleUpperCase()}
                        </div>
                    </div>
                    <div className="relative z-10 flex-1 my-4 flex flex-col gap-4 text-left pointer-events-auto select-text">
                        <div className="pointer-events-auto">
                            <label htmlFor="previewInput" className="block text-[10px] font-black uppercase mb-1 opacity-70 pointer-events-auto">Laboratory Token</label>
                            <input type="text" id="previewInput" value={previewInputValue} onChange={(e) => setPreviewInputValue(e.target.value)} style={{ borderColor: "var(--b-color)", }} className="w-full bg-black/40 border-2 rounded px-2.5 py-1.5 text-xs font-bold outline-none transition-all focus:ring-2 pointer-events-auto" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 pointer-events-auto">
                            <label htmlFor="cekbok" className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5 cursor-pointer hover:bg-black/30 pointer-events-auto">
                                <input type="checkbox" checked={previewCheckbox} onChange={(e) => setPreviewCheckbox(e.target.checked)} className="w-4 h-4 rounded cursor-pointer accent-[var(--p-color)] pointer-events-auto"/>
                                <span className="text-[11px] font-black uppercase pointer-events-none">Ignition</span>
                            </label>
                            <div onClick={() => setPreviewSwitch(!previewSwitch)} className="flex items-center justify-between bg-black/20 p-2 rounded border border-white/5 cursor-pointer hover:bg-black/30 pointer-events-auto">
                                <span className="text-[11px] font-black uppercase pointer-events-none">Thruster</span>
                                <div className="w-8 h-4 rounded-full p-0.5 transition-colors pointer-events-none" style={{ backgroundColor: previewSwitch ? "var(--p-color)" : "#3f3f46" }}>
                                    <div className="w-3 h-3 bg-white rounded-full transition-transform" style={{ transform: previewSwitch ? "translateX(16px)" : "translateX(0)" }}/>
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-auto">
                            <div className="flex justify-between text-[9px] font-black uppercase opacity-70 mb-1 pointer-events-none">
                                <span>Core Hyperdrive Fluid</span>
                                <span>{previewProgress}%</span>
                            </div>
                            <div className="w-full h-3 bg-black/50 border-2 rounded-full overflow-hidden pointer-events-none" style={{ borderColor: "var(--b-color)" }}>
                                <div className="h-full transition-all duration-150 ease-out" style={{ 
                                    width: `${previewProgress}%`,
                                    backgroundColor: "var(--p-color)",
                                    boxShadow: "0 0 8px var(--g-color)"
                                }}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1 pointer-events-none">
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border bg-transparent" style={{ borderColor: "var(--b-color)" }}>
                                Stabilizer: OK
                            </span>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-black" style={{ backgroundColor: "var(--a-color)" }}>
                                Friction: 0.99
                            </span>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "var(--s-color)" }}>
                                Mass 2.5kg
                            </span>
                        </div>
                    </div>
                    <div className="relative z-10 flex gap-2 pt-2 border-t pointer-events-auto" style={{ borderColor: "var(--b-color)" }}>
                        <button style={{ backgroundColor: "var(--p-color)", borderColor: "var(--b-color)", boxShadow: "2px 2px 0px 0px var(--b-color)" }} className="flex-1 py-2 text-xs font-black uppercase rounded-lg border-2 text-black transition-transform active:scale-95 pointer-events-auto">Execute Matrix</button>
                        <button className="px-3 py-2 text-xs font-black uppercase rounded-lg border-2 bg-transparent transition-transform active:scale-95 pointer-events-auto" style={{ borderColor: "var(--b-color)", color: "var(--p-color)" }}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}