"use client";

import { motion } from "framer-motion";
import { ArrowDown, GitBranch, Mail, User } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Ahmad Khoerul Riski",
    nim: "231011400989",
    bio: "-"
  },
  {
    id: 2,
    name: "Muhamad Fiqri Dwi Saputra",
    nim: "231011400959",
    bio: "-"
  },
  {
    id: 3,
    name: "Muhamad Pahri",
    nim: "231011400999",
    bio: "-"
  },
  {
    id: 4,
    name: "Najmi Cipta Nugraha",
    nim: "231011401000",
    bio: "-"
  },
  {
    id: 5,
    name: "Zaki Arfa Mustafa",
    nim: "231011402066",
    bio: "-"
  }
];

const FloatingBackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center z-0">
      <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{repeat: Infinity, duration: 6, ease: "easeInOut"}} className="absolute top-20 left-4 md:left-20 w-16 h-16 md:w-32 md:h-32 bg-golden border-4 border-darkGreen rounded-full shadow-solid"/>
      <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-60 right-4 md:right-32 w-20 h-20 md:w-24 md:h-24 bg-greenery border-4 border-darkGreen shadow-solid"/>
      <motion.div animate={{ x: [0, 20, 0], y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="absolute bottom-40 left-10 md:left-40 w-24 h-8 md:w-40 md:h-12 bg-golden border-4 border-darkGreen rounded-full shadow-solid"/>
      <motion.div animate={{ y: [0, -50, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }} className="absolute top-1/2 right-10 md:right-20 w-12 h-12 md:w-16 md:h-16 bg-cream border-4 border-darkGreen rotate-45 shadow-solid"/>
    </div>
  );
};

export default function PortofolioPortal() {
  return (
    <div className="min-h-screen bg-cream font-sans text-darkGreen selection:bg-golden selection:text-darkGreen relative">
      <FloatingBackgroundShapes/>
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center border-b-8 border-darkGreen bg-greenery">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }} className="bg-cream p-8 md:p-12 rounded-3xl border-4 border-darkGreen shadow-solid max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight text-darkGreen">
            Portofolio <span className="text-greenery">Kelompok</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-darkGreen mb-6">
            Selamat datang di portal portofolio kami. Tugas Rekayasa Perangkat Lunak ini dibangun dengan fokus pada performa, desain responsif, dan kolaborasi tim.
          </p>
          <div className="inline-block bg-golden text-darkGreen px-6 py-3 rounded-full font-bold border-2 border-darkGreen shadow-[4px_4px_0px_0px_#014231] animate-bounce mt-4">
            <ArrowDown className="inline ml-2 w-5 h-5"/>
          </div>
        </motion.div>
      </section>
      <section className="relative z-10 bg-golden py-20 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} className="text-3xl md:text-5xl font-black text-center mb-16 uppercase text-darkGreen bg-cream inline-block px-8 py-4 border-4 border-darkGreen shadow-solid transform -rotate-2">
            Anggota
          </motion.h2>
          <div className="space-y-8 md:space-y-12">
            {teamMembers.map((member, index) => (
              <motion.div key={member.id} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.6, type: "spring", bounce: 0.4 }} className="bg-greenery border-4 border-darkGreen rounded-2xl p-6 md:p-8 shadow-solid flex flex-col md:flex-row items-center md:items-start gap-6 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-cream border-4 border-darkGreen rounded-full flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_#014231]">
                  <User className="w-12 h-12 text-golden"/>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl md:text-4xl font-black text-golden mb-1">
                    {member.name}
                  </h3>
                  <div className="inline-block bg-cream text-darkGreen px-4 py-1 rounded-full font-bold text-sm md:text-base border-2 border-darkGreen mb-4 shadow-[2px_2px_0px_0px_#014231]">
                    NIM: {member.nim}
                  </div>
                  <p className="text-cream text-base md:text-lg font-medium leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <button className="flex items-center gap-2 bg-golden text-darkGreen font-bold px-6 py-2 rounded-lg border-2 border-darkGreen hover:bg-cream transition-colors shadow-[4px_4px_0px_0px_#014231]">
                      <GitBranch className="w-5 h-5"/>
                      Detail
                    </button>
                    <button className="flex items-center gap-2 bg-cream text-darkGreen font-bold px-6 py-2 rounded-lg border-2 border-darkGreen hover:bg-golden transition-colors shadow-[4px_4px_0px_0px_#014231]">
                      <Mail className="w-5 h-5"/>
                      Kontak
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-darkGreen py-8 text-center text-cream border-t-8 border-golden relative z-10">
        <p className="font-bold">© 2026 Tugas Rekayasa Perangkat Lunak. Dibuat dengan semangat.</p>
      </footer>
    </div>
  )
}