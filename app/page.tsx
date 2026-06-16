/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Shield, Zap, Code, Database, Layout, Play, X, Star, Award, Terminal, CheckCircle2, GitBranch, Cpu, Clock, Mail, Phone, Copy, Check } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "Ahmad Khoerul Riski",
    nim: "231011400989",
    jerseyNo: "10",
    role: "-",
    ovr: "92",
    bio: "-",
    icon: Zap,
    gridPos: { top: "15%", left: "50%" },
    videoUrl: "/videos/111111.mp4",
    photoUrl: "",
    contacts: {
      email: "-",
      github: "-",
      linkedin: "-",
      instagram: "-",
      whatsapp: "-"
    },
    availability: ["Available for Collaboration", "Lead Developer", "Student Developer"],
    skills: [
      { label: "Frontend (FE)", val: 85 },
      { label: "Backend (BE)", val: 95 },
      { label: "Database (DB)", val: 90 },
      { label: "UI/UX Design", val: 75 },
      { label: "Problem Solving", val: 94 },
      { label: "Teamwork", val: 90 },
    ],
    techStack: ["TypeScript", "Next.js", "Node.js", "Express", "MongoDB", "Git"],
    contribution: [
      { field: "UI Design", pct: 10 },
      { field: "Frontend", pct: 35 },
      { field: "Backend", pct: 40 },
      { field: "Database", pct: 10 },
      { field: "Testing", pct: 3 },
      { field: "Dokumentasi", pct: 2 },
    ],
    progStats: [
      { label: "Project Selesai", val: "12" },
      { label: "Git Commit", val: "340" },
      { label: "Bug Diperbaiki", val: "89" },
      { label: "Pull Request", val: "45" },
      { label: "Pengalaman", val: "2 Thn" },
    ],
    achievements: ["Problem Solver", "Clean Code", "Best Teamwork"],
  },
  {
    id: 2,
    name: "Muhamad Fiqri Dwi Saputra",
    nim: "231011400959",
    jerseyNo: "11",
    role: "-",
    ovr: "89",
    bio: "-",
    icon: Layout,
    gridPos: { top: "45%", left: "20%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-31911-large.mp4",
    photoUrl: "",
    contacts: {
      email: "fiqrisaputra727@gmail.com",
      github: "https://github.com/krep3k",
      linkedin: "https://www.linkedin.com/in/muhamadfiqriganteng",
      instagram: "https://www.instagram.com/fiqripersegi/",
      whatsapp: "6285177824316"
    },
    availability: ["Available for Collaboration", "Lead Developer", "Student Developer"],
    skills: [
      { label: "Frontend (FE)", val: 80 },
      { label: "Backend (BE)", val: 65 },
      { label: "Database (DB)", val: 60 },
      { label: "UI/UX Design", val: 95 },
      { label: "Problem Solving", val: 85 },
      { label: "Teamwork", val: 92 },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git"],
    contribution: [
      { field: "UI Design", pct: 60 },
      { field: "Frontend", pct: 25 },
      { field: "Backend", pct: 5 },
      { field: "Database", pct: 0 },
      { field: "Testing", pct: 5 },
      { field: "Dokumentasi", pct: 5 },
    ],
    progStats: [
      { label: "Project Selesai", val: "8" },
      { label: "Git Commit", val: "180" },
      { label: "Bug Diperbaiki", val: "42" },
      { label: "Pull Request", val: "20" },
      { label: "Pengalaman", val: "1.5 Thn" },
    ],
    achievements: ["UI Specialist", "Fast Learner", "Best Teamwork"],
  },
  {
    id: 3,
    name: "Muhamad Pahri",
    nim: "231011400999",
    jerseyNo: "7",
    role: "-",
    ovr: "90",
    bio: "-",
    icon: Code,
    gridPos: { top: "45%", left: "80%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-green-code-running-44825-large.mp4",
    photoUrl: "",
    contacts: {
      email: "-",
      github: "-",
      linkedin: "-",
      instagram: "-",
      whatsapp: "-"
    },
    availability: ["Available for Collaboration", "Lead Developer", "Student Developer"],
    skills: [
      { label: "Frontend (FE)", val: 94 },
      { label: "Backend (BE)", val: 70 },
      { label: "Database (DB)", val: 65 },
      { label: "UI/UX Design", val: 85 },
      { label: "Problem Solving", val: 88 },
      { label: "Teamwork", val: 90 },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
    contribution: [
      { field: "UI Design", pct: 15 },
      { field: "Frontend", pct: 60 },
      { field: "Backend", pct: 10 },
      { field: "Database", pct: 5 },
      { field: "Testing", pct: 5 },
      { field: "Dokumentasi", pct: 5 },
    ],
    progStats: [
      { label: "Project Selesai", val: "10" },
      { label: "Git Commit", val: "290" },
      { label: "Bug Diperbaiki", val: "67" },
      { label: "Pull Request", val: "38" },
      { label: "Pengalaman", val: "2 Thn" },
    ],
    achievements: ["Clean Code", "Fast Learner", "Problem Solver"],
  },
  {
    id: 4,
    name: "Najmi Cipta Nugraha",
    nim: "231011401000",
    jerseyNo: "69",
    role: "-",
    ovr: "91",
    bio: "-",
    icon: Database,
    gridPos: { top: "70%", left: "50%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tech-futuristic-lines-and-dots-background-32122-large.mp4",
    photoUrl: "",
    contacts: {
      email: "-",
      github: "-",
      linkedin: "-",
      instagram: "-",
      whatsapp: "-"
    },
    availability: ["Available for Collaboration", "Lead Developer", "Student Developer"],
    skills: [
      { label: "Frontend (FE)", val: 65 },
      { label: "Backend (BE)", val: 92 },
      { label: "Database (DB)", val: 95 },
      { label: "UI/UX Design", val: 60 },
      { label: "Problem Solving", val: 90 },
      { label: "Teamwork", val: 88 },
    ],
    techStack: ["JavaScript", "TypeScript", "Node.js", "Express", "MongoDB", "MySQL"],
    contribution: [
      { field: "UI Design", pct: 5 },
      { field: "Frontend", pct: 10 },
      { field: "Backend", pct: 40 },
      { field: "Database", pct: 40 },
      { field: "Testing", pct: 2 },
      { field: "Dokumentasi", pct: 3 },
    ],
    progStats: [
      { label: "Project Selesai", val: "11" },
      { label: "Git Commit", val: "310" },
      { label: "Bug Diperbaiki", val: "74" },
      { label: "Pull Request", val: "41" },
      { label: "Pengalaman", val: "2 Thn" },
    ],
    achievements: ["Problem Solver", "Best Teamwork", "Clean Code"],
  },
  {
    id: 5,
    name: "Zaki Arfa Mustafa",
    nim: "231011402066",
    jerseyNo: "666",
    role: "-",
    ovr: "99",
    bio: "-",
    icon: Shield,
    gridPos: { top: "90%", left: "50%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-glowing-lines-background-32121-large.mp4",
    photoUrl: "",
    contacts: {
      email: "-",
      github: "-",
      linkedin: "-",
      instagram: "-",
      whatsapp: "-"
    },
    availability: ["Available for Collaboration", "Lead Developer", "Student Developer"],
    skills: [
      { label: "Frontend (FE)", val: 99 },
      { label: "Backend (BE)", val: 99 },
      { label: "Database (DB)", val: 99 },
      { label: "UI/UX Design", val: 99 },
      { label: "Problem Solving", val: 99 },
      { label: "Teamwork", val: 99 },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "React", "MySQL", "Git"],
    contribution: [
      { field: "UI Design", pct: 99 },
      { field: "Frontend", pct: 99 },
      { field: "Backend", pct: 99 },
      { field: "Database", pct: 99 },
      { field: "Testing", pct: 99 },
      { field: "Dokumentasi", pct: 99 },
    ],
    progStats: [
      { label: "Project Selesai", val: "999" },
      { label: "Git Commit", val: "999" },
      { label: "Bug Diperbaiki", val: "999" },
      { label: "Pull Request", val: "999" },
      { label: "Pengalaman", val: "100 Thn" },
    ],
    achievements: ["Best Teamwork", "Fast Learner", "UI Specialist"],
  }
];

export default function PortofolioPortal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<typeof teamMembers[0] | null>(null);
  const [contactPlayer, setContactPlayer] = useState<typeof teamMembers[0] | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        setSelectedPlayer(null);
        setContactPlayer(null);
      };
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-darkGreen font-sans selection:bg-golden overflow-x-clip relative">
      <section className="min-h-screen bg-greenery flex flex-col items-center justify-center px-4 text-center border-b-8 border-darkGreen relative z-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="bg-cream border-4 border-darkGreen p-8 md:p-12 rounded-2xl shadow-solid max-w-2xl">
          <span className="bg-golden text-darkGreen px-4 py-1 rounded-full text-xs md:text-sm font-black border-2 border-darkGreen uppercase tracking-wider shadow-[2px_2px_0px_0px_#014231]">
            RPL MATCHDAY PORTAL
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-4 mb-4 tracking-tight uppercase">
            PORTOFOLIO <span className="text-greenery">KELOMPOK</span>
          </h1>
          <p className="text-sm md:text-base font-medium leading-relaxed text-darkGreen/90">
            Selamat datang di portal portofolio kami. Tugas Rekayasa Perangkat Lunak ini dibangun dengan fokus pada performa, desain responsif, dan kolaborasi tim.
          </p>
          <div className="inline-flex items-center gap-2 bg-golden text-darkGreen px-5 py-2.5 rounded-xl font-black border-2 border-darkGreen shadow-[4px_4px_0px_0px_#014231] animate-bounce mt-8 text-sm">
            SCROLL KE BAWAH
            <ArrowDown className="w-4 h-4"/>
          </div>
        </motion.div>
      </section>
      <div className="relative bg-golden w-full">
        <div className="w-full max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-8 md:sticky md:top-6 z-10 mb-6 md:mb-0">
            <div className="w-full bg-darkGreen p-4 md:p-6 rounded-3xl border-4 border-darkGreen shadow-solid text-cream grid grid-cols-12 gap-4 h-fit md:h-[calc(100vh-3rem)]">
              <div className="col-span-12 sm:col-span-5 flex flex-col bg-greenery border-4 border-cream rounded-2xl p-4 shadow-[4px_4px_0px_0px_#fdfbf0] h-full justify-center">
                <div className="bg-cream text-darkGreen font-black text-center py-2 px-3 rounded-xl text-xs tracking-widest mb-4 border-2 border-darkGreen shadow-[2px_2px_0px_0px_#014231]">
                  SQUAD LIST RPL
                </div>
                <div className="flex flex-col gap-2">
                  {teamMembers.map((m, idx) => {
                    const isCurrent = idx === activeIndex;
                    return (
                      <div key={m.id} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-all duration-300 font-bold text-xs md:text-sm ${isCurrent ? "bg-golden text-darkGreen border-darkGreen translate-x-2 shadow-[3px_3px_0px_0px_#014231]" : "bg-darkGreen/40 text-cream/80 border-transparent"}`}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`font-black ${isCurrent ? "text-darkGreen" : "text-golden"}`}>
                            {m.jerseyNo}
                          </span>
                          <span className="truncate">{m.name}</span>
                        </div>
                        {isCurrent && (
                          <span className="text-[9px] bg-darkGreen text-golden px-1.5 py-0.5 rounded font-black shrink-0 animate-pulse">
                            LIVE
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-7 h-64 sm:h-full relative bg-[#00664a] border-4 border-cream rounded-2xl shadow-[4px_4px_0px_0px_#fdfbf0] overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cream/20 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-cream/20 rounded-full" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-12 border-b-2 border-x-2 border-cream/20 rounded-b-2xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-12 border-t-2 border-x-2 border-cream/20 rounded-t-2xl" />
                {teamMembers.map((m, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <div key={m.id} style={{ top: m.gridPos.top, left: m.gridPos.left }} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                      <div className={`w-7 h-7 rounded-full border-2 border-cream flex items-center justify-center text-[10px] font-black transition-all duration-300 ${isCurrent ? "bg-golden text-darkGreen scale-125 ring-4 ring-golden/50 shadow-md animate-bounce" : "bg-darkGreen text-cream opacity-50"}`}>
                        {m.jerseyNo}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-[30vh] pb-[20vh] relative z-0">
            {teamMembers.map((member, idx) => (
              <motion.div key={member.id} viewport={{ amount: 0.6, margin: "-5% 0px -5% 0px" }} onViewportEnter={() => setActiveIndex(idx)} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-[50vh] flex flex-col justify-center">
                <div className="bg-cream text-darkGreen border-4 border-darkGreen rounded-2xl p-5 shadow-solid relative flex flex-col gap-4">
                  <div className="absolute right-4 bottom-4 text-8xl font-black text-darkGreen/5 select-none pointer-events-none">
                    #{member.jerseyNo}
                  </div>
                  <div className="flex items-center gap-3.5 border-b-4 border-darkGreen pb-4">
                    <div className="w-14 h-14 bg-greenery rounded-xl border-2 border-darkGreen flex items-center justify-center text-golden shrink-0 shadow-[2px_2px_0px_0px_#014231]">
                      <member.icon className="w-7 h-7"/>
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-xl font-black tracking-tight leading-tight uppercase truncate">
                        {member.name}
                      </h2>
                      <span className="text-[10px] font-bold bg-greenery text-cream px-2 py-0.5 rounded border border-darkGreen inline-block mt-1">
                        NIM: {member.nim}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-darkGreen bg-black shadow-[3px_3px_0px_0px_#014231]">
                    <video src={member.videoUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline/>
                    <div className="absolute top-2 left-2 bg-darkGreen text-golden px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current"/> LIVE TRANSMISSION
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-black uppercase text-greenery tracking-widest mb-0.5">
                        TACTICAL POSITION
                      </div>
                      <div className="text-xs md:text-sm font-black uppercase tracking-tight text-darkGreen">
                        {member.role}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-greenery tracking-widest mb-0.5">
                        PLAYER BIO
                      </div>
                      <p className="text-xs md:text-sm font-medium leading-relaxed text-darkGreen/90 truncate">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 grid grid-cols-2 gap-3 border-t-2 border-darkGreen/10">
                    <button onClick={() => setSelectedPlayer(member)} className="py-2 px-3 bg-greenery text-cream font-black text-xs rounded-xl border-2 border-darkGreen shadow-[2px_2px_0px_0px_#014231] hover:bg-greenery/90 active:translate-y-0.5 active:shadow-none transition-all">
                      VIEW PROFILE
                    </button>
                    <button onClick={() => setContactPlayer(member)} className="py-2 px-3 bg-golden text-darkGreen font-black text-xs rounded-xl border-2 border-darkGreen shadow-[2px_2px_0px_0px_#014231] active:translate-y-0.5 active:shadow-none transition-all">
                      CONTACT PLAYER
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <section className="w-full bg-golden py-12 flex flex-col items-center justify-center border-t-4 border-darkgreen px-4 relative z-20">
        <div className="w-full max-w-xl text-center bg-cream border-4 border-darkgreen p-6 md:p-8 rounded-3xl shadow-solid">
          <h3 className="text-xl md:text-2xl font-black text-darkgreen uppercase mb-2 tracking-tight">
            JELAJAHI MODUL APLIKASI
          </h3>
          <p className="text-xs md:text-sm font-bold text-darkgreen/80 mb-6 max-w-sm mx-auto">
            Masuk ke gerbang pusat kemudi untuk melihat semua menu yang ada.
          </p>
          <a href="/navigation" className="inline-block w-full sm:w-auto px-8 py-4 bg-greenery text-cream font-black text-sm rounded-xl border-4 border-darkgreen shadow-[4px_4px_0px_0px_#014231] hover:bg-greenery/90 active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider text-center">
            BUKA NAVIGASI HUB
          </a>
        </div>
      </section>
      <footer className="bg-darkGreen py-6 text-center text-cream border-t-4 border-cream text-xs font-bold uppercase tracking-wider relative z-20">
        &copy; 2026 REKAYASA PERANGKAT LUNAK TIM • INDONESIA SQUAD PORTAL
      </footer>
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPlayer(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm"/>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 350 }} className="relative bg-cream border-4 border-darkGreen w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 md:p-8 shadow-[8px_8px_0px_0px_#014231] z-10 select-none">
              <button title="close" onClick={() => setSelectedPlayer(null)} className="absolute top-4 right-4 md:top-6 md:right-6 bg-golden border-2 border-darkGreen text-darkGreen p-2 rounded-xl shadow-[2px_2px_0px_0px_#014231] hover:scale-105 active:translate-y-0.5 active:shadow-none transition-all z-30">
                <X className="w-5 h-5 stroke-3"/>
              </button>
              <div className="bg-darkGreen border-4 border-darkGreen p-6 rounded-2xl text-cream flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden mb-6 shadow-solid">
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fdfbf0_1px,transparent_1px),linear-gradient(to_bottom,#fdfbf0_1px,transparent_1px)] bg-size-[16px_16px]"/>
                <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 w-full md:w-auto text-center sm:text-left">
                  <div className="w-24 h-24 bg-golden rounded-2xl border-4 border-cream flex flex-col items-center justify-center text-darkGreen font-black text-3xl shadow-[4px_4px_0px_0px_#00664a] shrink-0 relative overflow-hidden">
                    {selectedPlayer.photoUrl ? (
                      <img src={selectedPlayer.photoUrl} alt={selectedPlayer.name} className="w-full h-full object-cover rounded-xl"/>
                    ) : (
                      <>
                        <span className="text-sm font-black opacity-60">#{selectedPlayer.jerseyNo}</span>
                        <span className="leading-none mt-0.5">
                          {selectedPlayer.name.split(" ").map(n => n[0]).join("").substring(0, 3)}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="bg-greenery text-cream text-[10px] font-black tracking-widest px-2.5 py-1 rounded-md border border-cream/30 uppercase">
                      {selectedPlayer.role.split("/")[0]}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase mt-2 text-golden">
                      {selectedPlayer.name}
                    </h2>
                    <p className="text-xs font-bold text-cream/80 tracking-wide mt-1">
                      NIM: {selectedPlayer.nim} - <span className="text-golden font-black">{selectedPlayer.role.split("/")[1]}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-golden text-darkGreen border-4 border-cream p-3 px-5 rounded-2xl flex flex-col items-center justify-center min-w-22.5 shadow-[4px_4px_0px_0px_#00664a] relative z-10 shrink-0">
                  <span className="text-4xl font-black tracking-tighter leading-none">{selectedPlayer.ovr}</span>
                  <span className="text-[11px] font-black bg-darkGreen text-golden px-2 py-0.5 rounded border border-darkGreen uppercase mt-1 tracking-wider">
                    OVR
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-6">
                  <div className="bg-cream border-4 border-darkGreen p-5 rounded-2xl shadow-solid">
                    <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-2 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-current"/> PLAYER PROFILE SUMMARY
                    </h3>
                    <p className="text-sm font-semibold leading-relaxed text-darkGreen/90">
                      {selectedPlayer.bio}
                    </p>
                  </div>
                  <div className="bg-cream border-4 border-darkGreen p-5 rounded-2xl shadow-solid">
                    <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-4 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5"/> ATTRIBUTE RATINGS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {selectedPlayer.skills.map((sk, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-black uppercase text-darkGreen">
                            <span>{sk.label}</span>
                            <span className={sk.val >= 90 ? "text-greenery" : "text-darkGreen"}>{sk.val}</span>
                          </div>
                          <div className="w-full h-3 bg-darkGreen/10 border-2 border-darkGreen rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${sk.val}%` }} transition={{ duration: 0.8, delay: 0.2 }} className={`h-full border-r-2 border-darkGreen ${sk.val >= 90 ? "bg-greenery" : "bg-golden"}`}/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-cream border-4 border-darkGreen p-5 rounded-2xl shadow-solid">
                    <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-4 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5"/> WORK RATE / PROJECT CONTRIBUTION
                    </h3>
                    <div className="space-y-3">
                      {selectedPlayer.contribution.map((con, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-4">
                          <span className="w-24 text-xs font-black uppercase text-darkGreen shrink-0 truncate">
                            {con.field}
                          </span>
                          <div className="flex-1 h-5 bg-darkGreen/5 border-2 border-darkGreen rounded-md overflow-hidden relative flex items-center">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${con.pct}%` }} transition={{ duration: 0.7, delay: 0.3 }} className="h-full bg-greenery border-r-2 border-darkGreen"/>
                            <span className="absolute left-2 text-[10px] font-black text-darkGreen">
                              {con.pct}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-5 space-y-6">
                  <div className="bg-cream border-4 border-darkGreen p-5 rounded-2xl shadow-solid">
                    <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-3 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5"/> SPECIALITIES / TECH STACK
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlayer.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="bg-golden text-darkGreen px-3 py-1.5 rounded-xl text-xs font-black border-2 border-darkGreen shadow-[2px_2px_0px_0px_#014231] tracking-wide uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-cream border-4 border-darkGreen p-5 rounded-2xl shadow-solid">
                    <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-3 flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5"/> CAREER / CODING STATS
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selectedPlayer.progStats.map((stat, stIdx) => (
                        <div key={stIdx} className="bg-greenery/10 border-2 border-darkGreen p-2.5 rounded-xl text-center">
                          <div className="text-xs font-black text-darkGreen">
                            {stat.val}
                          </div>
                          <div className="text-[9px] font-bold uppercase text-greenery tracking-tight mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-cream border-4 border-darkGreen p-5 rounded-2xl shadow-solid">
                    <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-3 flex items-center gap-1.5">
                      <Award className="w-3.5 h3.5"/> UNLOCKED PERK / TRAITS
                    </h3>
                    <div className="flex flex-col gap-2">
                      {selectedPlayer.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="bg-golden border-2 border-darkGreen px-3 py-2 rounded-xl flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#014231]">
                          <div className="bg-cream p-1 rounded-lg border border-darkGreen shrink-0 text-greenery">
                            <Award className="w-3.5 h-3.5 fill-current"/>
                          </div>
                          <span className="text-xs font-black uppercase tracking-tight text-darkGreen">
                            {ach}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <button onClick={() => setSelectedPlayer(null)} className="inline-flex items-center gap-1 text-[10px] font-black uppercase bg-darkGreen text-cream py-1 px-3 border border-darkGreen rounded-md tracking-wider opacity-60 hover:opacity-100 transition-opacity">
                      <Clock className="w-3 h-3"/> ESC TO DISMISS STATS
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {contactPlayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setContactPlayer(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm"/>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 350 }} className="relative bg-cream border-4 border-darkGreen w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 md:p-8 shadow-[8px_8px_0px_0px_#014231] z-10 text-darkGreen">
              <button title="close" onClick={() => setContactPlayer(null)} className="absolute top-4 right-4 md:top-6 md:right-6 bg-golden border-2 border-darkGreen text-darkGreen p-2 rounded-xl shadow-[2px_2px_0px_0px_#014231] hover:scale-105 active:translate-y-0.5 active:shadow-none transition-all z-30">
                <X className="w-5 h-5 stroke-3"/>
              </button>
              <div className="bg-darkGreen border-4 border-darkGreen p-5 rounded-2xl text-cream flex justify-between items-center gap-4 relative overflow-hidden mb-6 shadow-solid">
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fdfbf0_1px,transparent_1px),linear-gradient(to_bottom,#fdfbf0_1px,transparent_1px)] bg-size-[16px_16px]"/>
                <div className="flex items-center gap-4 relative z-10 min-w-0">
                  <div className="w-20 h-20 bg-golden rounded-2xl border-4 border-cream flex flex-col items-center justify-center text-darkGreen font-black text-2xl shadow-[4px_4px_0px_0px_#00664a] shrink-0 overflow-hidden">
                    {contactPlayer.photoUrl ? (
                      <img src={contactPlayer.photoUrl} alt={contactPlayer.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <span className="text-[10px] font-black opacity-60">#{contactPlayer.jerseyNo}</span>
                        <span className="leading-none mt-0.5">{contactPlayer.name.split(" ").map(n => n[0]).join("").substring(0, 3)}</span>
                      </>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="bg-greenery text-cream text-[9px] font-black tracking-widest px-2 py-0.5 rounded border border-cream/30 uppercase">
                      {contactPlayer.role.split("/")[0]}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase mt-1 text-golden truncate">
                      {contactPlayer.name}
                    </h2>
                    <p className="text-xs font-bold text-cream/70 truncate">
                      NIM: {contactPlayer.nim}
                    </p>
                  </div>
                </div>
                <div className="bg-golden text-darkGreen border-4 border-cream p-2 px-3 rounded-xl flex flex-col items-center justify-center min-w-16.25 shadow-[3px_3px_0px_0px_#00664a] relative z-10 shrink-0">
                  <span className="text-2xl font-black tracking-tighter leading-none">{contactPlayer.ovr}</span>
                  <span className="text-[9px] font-black uppercase tracking-wider">OVR</span>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-greenery flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current"/> PRIMARY CONTACT LINK
                </h3>
                <div className="bg-cream border-2 border-darkGreen p-3 rounded-xl flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#014231]">
                  <a title="email" href={`mailto:${contactPlayer.contacts?.email}`} className="flex items-center gap-3 min-w-0 flex-1 group">
                    <div className="p-2 bg-greenery text-cream rounded-lg border border-darkGreen shrink-0 group-hover:bg-golden group-hover:text-darkGreen transition-colors">
                      <Mail className="w-4 h-4"/>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black uppercase text-greenery/70 leading-none">EMAIL ADDRESS</div>
                      <div className="text-xs md:text-sm font-black truncate text-darkGreen mt-0.5 group-hover:underline">{contactPlayer.contacts?.email}</div>
                    </div>
                  </a>
                  <button title="copyEmail" onClick={() => handleCopy(contactPlayer.contacts?.email || "", "email")} className="p-2 bg-cream border-2 border-darkGreen rounded-lg hover:bg-darkGreen/5 text-darkGreen transition-all active:scale-95 shrink-0">
                    {copiedField === "email" ? <Check className="w-4 h-4 text-greenery stroke-3"/> : <Copy className="w-4 h-4"/>}
                  </button>
                </div>
                <div className="bg-cream border-2 border-darkGreen p-3 rounded-xl flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#014231]">
                  <a title="phone" href={`https://wa.me/${contactPlayer.contacts?.whatsapp}`} target="blank" rel="noopener noreferrer"className="flex items-center gap-3 min-w-0 flex-1 group">
                    <div className="p-2 bg-greenery text-cream rounded-lg border border-darkGreen shrink-0 group-hover:bg-golden group-hover:text-darkGreen transition-colors">
                      <Phone className="w-4 h-4"/>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black uppercase text-greenery/70 leading-none">WHATSAPP NUMBER</div>
                      <div className="text-xs md:text-sm font-black truncate text-darkGreen mt-0.5 group-hover:underline">{contactPlayer.contacts?.whatsapp}</div>
                    </div>
                  </a>
                  <button title="wa" onClick={() => handleCopy(`+${contactPlayer.contacts?.whatsapp || ""}`, "wa")} className="p-2 bg-cream border-2 border-darkGreen rounded-lg hover:bg-darkGreen/5 text-darkGreen transition-all active:scale-95 shrink-0">
                    {copiedField === "wa" ? <Check className="w-4 h-4 text-greenery stroke-3"/> : <Copy className="w-4 h-4"/>}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-3 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5"/>SOCIAL NETWORK
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <a href={contactPlayer.contacts?.github} target="blank" rel="noopener no referrer" className="bg-cream border-2 border-darkGreen p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center shadow-[3px_3px_0px_0px_#014231] hover:bg-darkGreen hover:text-cream transition-all group duration-300">
                    <FaGithub className="w-5 h-5 stroke-2.5"/>
                    <span className="text-[10px] font-black uppercase tracking-wider">GITHUB</span>
                  </a>
                  <a href={contactPlayer.contacts?.linkedin} target="blank" rel="noopener noreferrer" className="bg-cream border-2 border-darkGreen p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center shadow-[3px_3px_0px_0px_#014231] hover:bg-darkGreen hover:text-cream transition-all group duration-300">
                    <FaLinkedinIn className="w-5 h-5 stroke-2.5"/>
                    <span className="text-[10px] font-black uppercase tracking-wider">LINKEDIN</span>
                  </a>
                  <a href={contactPlayer.contacts?.instagram} target="blank" rel="noopener noreferrer" className="bg-cream border-2 border-darkGreen p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center shadow-[3px_3px_0px_0px_#014231] hover:bg-darkGreen hover:text-cream transition-all group duration-300">
                    <FaInstagram className="w-5 h-5 stroke-2.5"/>
                    <span className="text-[10px] font-black uppercase tracking-wider">INSTAGRAM</span>
                  </a>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-greenery mb-2.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5"/>DEVELOPMENT AVAILABILITY
                </h3>
                <div className="flex flex-wrap gap-2">
                    {contactPlayer.availability?.map((status, sIdx) => (
                      <span key={sIdx} className="bg-golden text-darkGreen px-3 py-1 rounded-lg text-[10px] font-black border-2 border-darkGreen shadow-[1.5px_1.5px_0px_0px_#014231] uppercase tracking-wide">
                        {status}
                      </span>
                    ))}
                </div>
              </div>
              <div className="pt-4 border-t-2 border-darkGreen/10 flex justify-end">
                    <button onClick={() => setContactPlayer(null)} className="py-2 px-5 bg-darkGreen text-cream font-black text-xs rounded-xl border-2 border-darkGreen shadow-[3px_3px_0px_0px_#014231] hover:bg-darkGreen/90 active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-wider">
                      CLOSE WINDOW
                    </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}