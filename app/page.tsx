"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, GitBranch, Mail, User, Shield, Zap, Code, Database, Layout, Play } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Ahmad Khoerul Riski",
    nim: "231011400989",
    jerseyNo: "10",
    role: "-",
    bio: "-",
    icon: Zap,
    gridPos: { top: "15%", left: "50%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32120-large.mp4",
  },
  {
    id: 2,
    name: "Muhamad Fiqri Dwi Saputra",
    nim: "231011400959",
    jerseyNo: "11",
    role: "-",
    bio: "-",
    icon: Layout,
    gridPos: { top: "45%", left: "20%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-31911-large.mp4",
  },
  {
    id: 3,
    name: "Muhamad Pahri",
    nim: "231011400999",
    jerseyNo: "7",
    role: "-",
    bio: "-",
    icon: Code,
    gridPos: { top: "45%", left: "80%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-green-code-running-44825-large.mp4",
  },
  {
    id: 4,
    name: "Najmi Cipta Nugraha",
    nim: "231011401000",
    jerseyNo: "69",
    role: "-",
    bio: "-",
    icon: Database,
    gridPos: { top: "70%", left: "50%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tech-futuristic-lines-and-dots-background-32122-large.mp4",
  },
  {
    id: 5,
    name: "Zaki Arfa Mustafa",
    nim: "231011402066",
    jerseyNo: "666",
    role: "-",
    bio: "-",
    icon: Shield,
    gridPos: { top: "90%", left: "50%" },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-glowing-lines-background-32121-large.mp4",
  }
];

export default function PortofolioPortal() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="min-h-screen bg-cream text-darkGreen font-sans selection:bg-golden overflow-x-clip">
      <section className="min-h-screen bg-greenery flex flex-col items-center justify-center px-4 text-center border-b-8 border-darkGreen relative z-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="bg-cream border-4 border-darkGreen p-8 md:p-12 rounded-2xl shadow-solid max-w-2xl">
          <span className="bg-golden text-darkGreen px-4 py-1 rounded-full text-xs md:text-sm font-black border-2 border-darkGreen uppercase tracking-wider shadow-[2px_2px_0px_0px_#014231]">
            RPL MATCHDAY PORTAL
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-4 mb-4 tracking-tight uppercase">
            SQUAD <span className="text-greenery">LINE-UP</span>
          </h1>
          <p className="text-sm md:text-base font-medium leading-relaxed text-darkGreen/90">
            Selamat datang di portal formasi kelompok kami. Layaknya tim nasional di ajang turnamen besar, tiap anggota memegang peran taktis krusial demi menyukseskan proyek Rekayasa Perangkat Lunak ini.
          </p>
          <div className="inline-flex items-center gap-2 bg-golden text-darkGreen px-5 py-2.5 rounded-xl font-black border-2 border-darkGreen shadow-[4px_4px_0px_0px_#014231] animate-bounce mt-8 text-sm">
            SCROLL UNTUK ANALISI TAKTIK
            <ArrowDown className="w-4 h-4"/>
          </div>
        </motion.div>
      </section>
      <div className="relative min-h-[500vh] bg-golden w-full">
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 md:grid md:grid-cols-12 md:gap-6 items-start">
          <div className="col-span-12 md:col-span-7 grid grid-cols-12 gap-4 md:sticky md:top-6 md:h-[calc(100vh-3rem)] mb-6 md:mb-0 z-10">
            <div className="col-span-12 sm:col-span-5 flex flex-col bg-greenery border-4 border-darkGreen rounded-2xl p-4 shadow-solid h-fit sm:h-full justify-center">
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
                        <span className="truncate">
                          {m.name}
                        </span>
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
            <div className="col-span-12 sm:col-span-7 h-64 sm:h-full relative bg-[#00664a] border-4 border-darkGreen rounded-2xl shadow-solid overflow-hidden">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cream/20 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-cream/20 rounded-full" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-12 border-b-2 border-x-2 border-cream/20 rounded-b-2xl" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-12 border-t-2 border-x-2 border-cream/20 rounded-t-2xl" />
              {teamMembers.map((m, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <div key={m.id} style={{ top: m.gridPos.top, left: m.gridPos.left }} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                    <div className={`w-7 h-7 rounded-full border-2 border-cream flex items-center justify-center text-[10px] font-black transition-all duration-300 ${isCurrent ? "bg-golden text-darkGreen scale-125 ring-4 ring-golden/50 shadow-md" : "bg-darkGreen text-cream opacity-60"}`}>
                      {m.jerseyNo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-16 md:gap-32 relative z-0">
            {teamMembers.map((member, idx) => (
              <motion.div key={member.id} viewport={{ amount: 0.4, margin: "-10% 0px -10% 0px" }} onViewportEnter={() => setActiveIndex(idx)} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="min-h-[75vh] md:min-h-[85vh] flex flex-col justify-center">
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
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-darkGreen bg-black shadow-[3px_3px_0px_0px_#014231] group">
                    <video src={member.videoUrl} className="w-full h-full object-cover" autoPlay muted playsInline/>
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
                      <p className="text-xs md:text-sm font-medium leading-relaxed text-darkGreen/90">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 grid grid-cols-2 gap-3 border-t-2 border-darkGreen/10">
                    <button className="py-2 px-3 bg-greenery text-cream font-black text-xs rounded-xl border-2 border-darkGreen shadow-[2px_2px_0px_0px_#014231] active:translate-y-0.5 active:shadow-none transition-all">
                      VIEW PROFILE
                    </button>
                    <button className="py-2 px-3 bg-golden text-darkGreen font-black text-xs rounded-xl border-2 border-darkGreen shadow-[2px_2px_0px_0px_#014231] active:translate-y-0.5 active:shadow-none transition-all">
                      CONTACT PLAYER
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-darkGreen py-6 text-center text-cream border-t-4 border-cream text-xs font-bold uppercase tracking-wider">
        &copy; 2026 REKAYASA PERANGKAT LUNAK TIM • ALL RIGHTS RESERVED MATCHDAY PORTAL
      </footer>
    </div>
  )
}