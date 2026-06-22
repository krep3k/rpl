/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/purity */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, X, Music4, ListMusic, Disc3, ArrowLeft, Heart, Search, Volume2, Plus, FolderPlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const songList = [
    {
        id: 1,
        title: "samba",
        artist: "RPL Team...",
        cover: "/picture/jeki.jpg",
        src: "/audio/samba.mp3",
    },
    {
        id: 2,
        title: "lofi",
        artist: "RPL Team...",
        cover: "/picture/pahri.jpg",
        src: "/audio/noCopyright.mp3",
    },
];

interface Playlist {
    id: number;
    name: string;
    songId: number[];
};

export default function MusicPage() {
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement>(null);

    const [playlist, setPlaylist] = useState<Playlist[]>([
        {id: 1, name: "Playlist 1", songId: [1]}
    ]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [currentQueue, setCurrentQueue] = useState(songList);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPopUoOpen, setIsPopUpOpen] = useState(false);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeDropdownSongId, setActiveDropdownSongId] = useState<number | null>(null);

    const currentSong = useMemo(() => currentQueue[currentSongIndex], [currentQueue, currentSongIndex]);

    const filteredSongs = useMemo(() => {
        return songList.filter(song => song.title.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLocaleLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;
        if(isPlaying) {
            audio.play().catch(() => setIsPlaying(false));
        } else {
            audio.pause();
        }
    }, [isPlaying, currentSongIndex, currentSong.src]);

    const onTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
        setDuration(audioRef.current?.duration || 0);
    };

    const handlePlayPause = () => {
        if(!hasPlayedOnce) setHasPlayedOnce(true);
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        setCurrentSongIndex((prev) => (prev + 1) % currentQueue.length);
        setIsPlaying(true);
    };

    const playPrev = () => {
        setCurrentSongIndex((prev) => (prev - 1 + currentQueue.length) % currentQueue.length);
        setIsPlaying(true);
    };

    const playSpecificSong = (songlist: typeof songList, index: number) => {
        setCurrentQueue(songlist);
        setCurrentSongIndex(index);
        setHasPlayedOnce(true);
        setIsPlaying(true);
        setIsPopUpOpen(true);
    };

    const playPlayList = (songIds: number[]) => {
        const playlistSongs = songList.filter(song => songIds.includes(song.id));
        if(playlistSongs.length > 0) {
            playSpecificSong(playlistSongs, 0);
        }
    };

    const handleCreatePlaylist = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newPlaylistName.trim()) return;
        const newPlaylist: Playlist = {
            id: Date.now(),
            name: newPlaylistName.trim(),
            songId: [],
        };
        setPlaylist([...playlist, newPlaylist]);
        setNewPlaylistName("");
    };

    const handleAddSongToPlaylist = (playlistId: number, songIds: number) => {
        setPlaylist(prevPlaylist => prevPlaylist.map(pl => {
            if(pl.id === playlistId) {
                if(pl.songId.includes(songIds)) return pl;
                return {...pl, songId: [...pl.songId, songIds]};
            }
            return pl;
        }));
        setActiveDropdownSongId(null);
    };

    const handleDeletePlaylist = (playlistId: number) => {
        setPlaylist(playlist.filter(pl => pl.id !== playlistId));
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    };

    const progressPercentage = duration ? (currentTime/duration) * 100 : 0;

    return (
        <div className="min-h-screen bg-cream text-darkgreen font-sans p-4 md:p-8 pb-32 relative overflow-hidden selection:bg-golden">
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
                            className="absolute bg-greenery/30 border-2 border-darkgreen rounded-full flex items-center justify-center text-darkgreen"
                            style={{ padding: `${size * 3}px`, width: 'fit-content', height: 'fit-content' }}
                        >
                            <Disc3 className={`w-${size} h-${size}`}/>
                        </motion.div>
                    );
                })}
            </div>
            <audio ref={audioRef} src={currentSong.src} onTimeUpdate={onTimeUpdate} onEnded={playNext}/>
            <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative z-10">
                <button onClick={() => router.push("/navigation")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-cream text-darkgreen font-black text-xs rounded-xl border-4 border-darkgreen shadow-[4px_4px_0px_0px_#014231] hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-wide">
                    <ArrowLeft className="w-4 h-4"/> KEMBALI
                </button>
                <div className="bg-cream border-4 border-darkgreen p-5 rounded-2xl shadow-solid flex items-center gap-4 w-full md:max-w-xl">
                    <div className="p-3 bg-greenery text-cream rounded-xl border-2 border-darkgreen shrink-0 shadow-[2px_2px_0px_0px_#014231]">
                        <ListMusic className="w-6 h-6"/>
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none text-greenery">
                            LOCKER ROOM MUSIC
                        </h1>
                        <p className="text-xs md:text-sm font-bold text-darkgreen/80 leading-snug mt-1">
                            Buat tactical playlist kustom sesukamu langsung dari ruang ganti tim.
                        </p>
                    </div>
                </div>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                <div className="md:col-span-7">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 bg-greenery text-cream p-4 rounded-xl border-4 border-darkgreen shadow-[4px_4px_0px_0px_#014231]">
                        <h2 className="text-sm md:text-base font-black uppercase flex items-center gap-2">
                            <Music4 className="w-5 h-5"/> MASTER TRACK LIST ({filteredSongs.length})
                        </h2>
                        <div className="relative">
                            <label htmlFor="new"></label>
                            <input type="text" id="new" placeholder="Cari judul / musisi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-cream text-darkgreen text-xs p-2 pl-8 rounded-lg border-2 border-darkgreen focus:ring-0 w-full sm:w-48 placeholder:text-darkgreen/50 font-bold" />
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-darkgreen"/>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {filteredSongs.map((song) => {
                            const isSelected = currentSong.id === song.id && hasPlayedOnce;
                            const globalIndex = songList.findIndex(s => s.id === song.id);
                            return (
                                <div key={song.id} className={`bg-cream border-4 p-3.5 rounded-2xl flex items-center justify-between gap-4 relative shadow-[4px_4px_0px_0px_#014231] ${isSelected ? "border-golden bg-golden/5" : "border-darkgreen"}`}>
                                    <div onClick={() => playSpecificSong(songList, globalIndex)} className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                                        <div className="w-12 h-12 rounded-xl border-2 border-darkgreen overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_#014231] relative">
                                            <img src={song.cover} alt={song.title} className="w-full h-full object-cover"/>
                                            {isSelected && isPlaying && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-cream">
                                                    <Pause className="w-4 h-4 fill-current"/>
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className={`text-xs md:text-sm font-black uppercase truncate ${isSelected ? "text-greenery" : "text-darkgreen"}`}>
                                                {song.title}
                                            </h3>
                                            <p className="text-[10px] md:text-xs font-bold text-darkgreen/60 truncate">
                                                {song.artist}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 relative shrink-0">
                                        <button title="Tambah Ke Playlist" onClick={() => setActiveDropdownSongId(activeDropdownSongId === song.id ? null : song.id)} className="p-2 bg-golden text-darkgreen rounded-lg border-2 border-darkgreen hover:bg-golden/80 font-black text-xs flex items-center gap-1 shadow-[2px_2px_0px_0px_#014231] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer">
                                            <Plus className="w-4 h-4 stroke-3"/>
                                        </button>
                                        <AnimatePresence>
                                            {activeDropdownSongId === song.id && (
                                                <>
                                                    <div onClick={() => setActiveDropdownSongId(null)} className="fixed inset-0 z-20">
                                                        <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} className="absolute right-0 top-12 w-56 bg-cream border-4 border-darkgreen rounded-xl shadow-[4px_4px_0px_0px_#014231] z-30 p-2 text-left">
                                                            <p className="text-[10px] font-black uppercase text-darkgreen/60 px-2 pb-1.5 border-b-2 border-darkgreen/10 mb-1">
                                                                Pilih playlist
                                                            </p>
                                                            {playlist.length === 0 ? (
                                                                <p className="text-[10px] font-bold text-darkgreen/50 p-2 italic">Belum ada playlist</p>
                                                            ) : (
                                                                <div className="max-h-40 overflow-y-auto space-y-1">
                                                                    {playlist.map((pl) => (
                                                                        <button key={pl.id} onClick={() => handleAddSongToPlaylist(pl.id, song.id)} className="w-full text-left text-[11px] font-black uppercase p-2 hover:bg-greenery hover:text-cream rounded-md transition-colors truncate block">
                                                                            + {pl.name}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    </div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                        <button title="play" onClick={() => playSpecificSong(songList, globalIndex)} className="p-2 bg-greenery text-cream rounded-lg border-2 border-darkgreen shadow-[2px_2px_0px_0px_#014231] cursor-pointer">
                                            <Play className="w-4 h-4 fill-current"/>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="md:col-span-5 space-y-6">
                    <div className="bg-cream border-4 border-darkgreen p-5 rounded-2xl shadow-[4px_4px_0px_0px_#014231]">
                        <h2 className="text-xs md:text-sm font-black uppercase flex items-center gap-2 text-greenery mb-4">
                            <FolderPlus className="w-5 h-5"/> PLAYLIST KUSTOMTAMBAH PLAYLIST BARU
                        </h2>
                        <form onSubmit={handleCreatePlaylist} className="flex flex-col gap-3">
                            <input type="text" placeholder="Nama Playlist" value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} maxLength={30} className="bg-cream text-darkgreen border-4 border-darkgreen p-2.5 rounded-xl text-xs font-black uppercase tracking-wide focus:ring-0 placeholder:text-darkgreen/40 shadow-[2px_2px_0px_0px_#014231]" />
                            <button type="submit" className="w-full py-2.5 bg-golden text-darkgreen font-black text-xs rounded-xl border-4 border-darkgreen shadow-[3px_3px_0px_0px_#014231] hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-wider cursor-pointer">
                                + Create Playlist
                            </button>
                        </form>
                    </div>
                    <div className="bg-golden text-darkgreen p-3 px-5 rounded-xl border-4 border-darkgreen shadow-[4px_4px_0px_0px_#014231] mb-4">
                        <h2 className="text-sm font-black uppercase flex items-center gap-2">
                            <Disc3 className="w-5 h-5 animate-spin-slow"/> Playlist anda {playlist.length}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {playlist.map((pl) => (
                            <div key={pl.id} className="bg-cream border-4 border-darkgreen p-4 rounded-2xl shadow-[4px_4px_0px_0px_#014231] relative">
                                <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b-2 border-darkgreen/10">
                                    <div className="min-w-0">
                                        <h3 className="text-xs md:text-sm font-black uppercase text-darkgreen leading-tight truncate">
                                            {pl.name}
                                        </h3>
                                        <p className="text-[10px] font-bold text-darkgreen/60 mt-0.5">
                                            {pl.songId.length} Track Terpilih
                                        </p>
                                    </div>
                                    <button onClick={() => handleDeletePlaylist(pl.id)} title="hapus playlist" className="text-darkgreen/50 hover:text-red-600 transition-colors p-1">
                                        <Trash2 className="w-4 h-4"/>
                                    </button>
                                </div>
                                <div className="flex items-center gap-1.5 mb-4 overflow-hidden h-6">
                                    {pl.songId.length === 0 ? (
                                        <span className="text-[10px] text-darkgreen/40 font-bold italic">Playlist kosong</span>
                                    ) : (
                                        pl.songId.map((sid) => {
                                            const songObj = songList.find(s => s.id === sid);
                                            return songObj ? (
                                                <img key={sid} src={songObj.cover} alt="" className="w-6 h-6 rounded border border-darkgreen object-cover shrink-0"/>
                                            ) : null;
                                        })
                                    )}
                                </div>
                                <button onClick={() => playPlayList(pl.songId)} disabled={pl.songId.length === 0} className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-greenery text-cream font-black text-xs rounded-xl border-2 border-darkgreen shadow-[3px_3px_0px_0px_#014231] hover:translate-y-0.5 hover:shadow-none disabled:opacity-40 disabled:pointer-events-none transition-all uppercase tracking-wider cursor-pointer">
                                    <Play className="w-3.5 h-3.5 fill-current"/> Putar Playlist
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <AnimatePresence>
                {hasPlayedOnce && (
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-cream border-t-4 border-darkgreen shadow-[0_-4px_0px_0px_#014231]">
                        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                            <div onClickCapture={() => setIsPopUpOpen(true)} className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 group">
                                <div className={`w-10 h-10 rounded-lg border-2 border-darkgreen overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_#014231] ${isPlaying ? "animate-pulse" : ""}`}>
                                    <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase text-darkgreen truncate group-hover:text-greenery">
                                        {currentSong.title}
                                    </p>
                                    <p className="text-[9px] font-bold text-darkgreen/70 truncate leading-tight">
                                        {currentSong.artist}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:flex flex-col items-center flex-1 max-w-sm gap-1">
                                <div className="w-full h-1.5 bg-darkgreen/10 rounded-full border border-darkgreen overflow-hidden">
                                    <div style={{ width: `${progressPercentage}%` }} className="h-full bg-greenery"/>
                                </div>
                                <div className="text-[9px] font-bold text-darkgreen">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button title="prev" onClick={playPrev} className="p-1.5 text-darkgreen hover:scale-110"><SkipBack className="w-4 h-4 fill-current"/></button>
                                <button title="playPause" onClick={handlePlayPause} className="p-2 bg-greenery text-cream rounded-full border border-darkgreen shadow-[2px_2px_0px_0px_#014231] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer">
                                    {isPlaying ? <Pause className="w-4 h-4 fill-current"/> : <Play className="w-4 h-4 fill-current"/>}
                                </button>
                                <button title="next" onClick={playNext} className="p-1.5 text-darkgreen hover:scale-110"><SkipForward className="w-4 h-4 fill-current"/></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isPopUoOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPopUpOpen(false)} className="absolute inset-0 bg-darkgreen/90"/>
                        <motion.div initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative bg-cream border-8 border-darkgreen p-6 md:p-8 rounded-3xl shadow-[10px_10px_0px_0px_#f8c828] w-full max-w-lg z-10 text-center">
                            <button title="closePopup" onClick={() => setIsPopUpOpen(false)} className="absolute top-4 right-4 bg-golden border-2 border-darkgreen text-darkgreen p-1.5 rounded-lg shadow-[3px_3px_0px_0px_#014231] hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer">
                                <X className="w-5 h-5 stroke-3"/>
                            </button>
                            <Volume2 className="w-10 h-10 mx-auto text-greenery mb-5 animate-pulse"/>
                            <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full border-8 border-darkgreen shadow-[8px_8px_0px_0px_#007e5d] overflow-hidden mb-6 relative">
                                <img src={currentSong.cover} alt={currentSong.title} className={`w-full h-full object-cover ${isPlaying ? "animate-[spin_20s_linear_infinite]" : ""}`} />
                                <div className="absolute inset-0 rounded-full border-4 border-cream/25 pointer-events-none"/>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-xl md:text-2xl font-black uppercase text-darkgreen tracking-tight leading-tight truncate">
                                    {currentSong.title}
                                </h2>
                                <p className="text-xs md:text-sm font-bold text-greenery tracking-wide mt-1">
                                    {currentSong.artist}
                                </p>
                                <span className="inline-block mt-3 text-[10px] font-black bg-golden text-darkgreen px-2.5 py-1 rounded-md border border-darkgreen uppercase tracking-wider">
                                    TACTICAL TRACK PLAYING
                                </span>
                            </div>
                            <div className="mb-6 space-y-2">
                                <div className="w-full h-3 bg-darkgreen/10 rounded-full border-2 border-darkgreen overflow-hidden relative cursor-pointer">
                                    <div style={{ width: `${progressPercentage}%` }} className="h-full bg-greenery"/>
                                </div>
                                <div className="flex justify-between items-center text-xs font-black text-darkgreen">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-2 items-center bg-darkgreen/5 border-2 border-darkgreen p-2 rounded-2xl shadow-[4px_4px_0px_0px_#014231]">
                                <button title="like" className="flex justify-center text-darkgreen/40 hover:text-greenery"><Heart className="w-5 h-5"/></button>
                                <button title="prev" onClick={playPrev} className="flex justify-center text-darkgreen hover:scale-110 transition-transform"><SkipBack className="w-5 h-5 fill-current"/></button>
                                <button title="playPause" onClick={handlePlayPause} className="flex justify-center py-3 bg-golden text-darkgreen rounded-xl border-4 border-darkgreen shadow-[4px_4px_0px_0px_#014231] hover:translate-y-0.5 hover:shadow-none transition-all">
                                    {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
                                </button>
                                <button title="next" onClick={playNext} className="flex justify-center text-darkgreen hover:scale-110 transition-transform"><SkipForward className="w-6 h-6 fill-current"/></button>
                                <button title="volume" className="flex justify-center text-darkgreen/40 hover:text-greenery"><Volume2 className="2-5 h-5"/></button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <footer className="fixed bottom-0 left-0 right-0 py-3 bg-darkgreen text-center text-cream text-[10px] font-bold uppercase tracking-wider z-30 border-t-2 border-cream/20">
                &copy; 2026 karya kelompok...
            </footer>
        </div>
    )
}