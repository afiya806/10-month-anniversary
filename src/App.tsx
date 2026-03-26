/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

// --- Data ---

const MEMORIES = [
  { date: "3rd August 2024", text: "Met my pwincess for the very first time 🌸" },
  { date: "30th August 2024", text: "Talked on Instagram for the first time 💬" },
  { date: "5th September 2024", text: "Talked on Discord for the first time 🎮" },
  { date: "29th October 2024", text: "My wifey's birthday 🎂" },
  { date: "19th January 2025", text: "My wifey came to my house for the first time 🏠" },
  { date: "15th March 2025", text: "I went to my pwincess's house for the first time 💕" },
  { date: "29th April 2025", text: "Made my Instagram password her birthday 🔒" },
  { date: "1st May 2025", text: "Said \"I love you\" for the first time 💗" },
  { date: "4th May 2025", text: "Held hands for the first time 🤝" },
  { date: "16th May 2025", text: "Hugged for the first time 🤗" },
  { date: "30th May 2025", text: "Kissed for the first time 💋" },
  { date: "3rd June 2025", text: "Went to Japan together 🇯🇵✈️" },
  { date: "6th June 2025", text: "Went to her room for the first time 🚪" },
  { date: "8th June 2025", text: "Started dating officially 💑" },
  { date: "9th June 2025", text: "Did that for the first time 🌙" },
  { date: "10th June 2025", text: "Did that properly for the first time ✨" },
  { date: "27th June 2025", text: "Mommy sent a shirtless pic for the first time 📸" },
  { date: "25th August 2025", text: "My birthday 🎂🎉" },
  { date: "4th September 2025", text: "Teachers Day with my baby 🍎" },
  { date: "6th September 2025", text: "Mommy did that for the first time 💫" },
  { date: "30th September 2025", text: "Dandiya with my pwincess 🪅" },
  { date: "18th October 2025", text: "Diwali with my cutie patootie 🪔" },
  { date: "26th October 2025", text: "Baby's birthday party 🎈" },
  { date: "29th October 2025", text: "My BBG's birthday 🎂💝" },
  { date: "18th November 2025", text: "Tried to do THAT for the first time but failed 😅" },
  { date: "27th November 2025", text: "Waited with my pwincess 🌟" },
  { date: "28th November 2025", text: "Mommy did that for the first time at my house 🏡" },
  { date: "16th January 2026", text: "Tried to do THAT for the second time but failed again 😭" },
  { date: "18th January 2026", text: "WON at IIT Delhi with my pwincess 🏆🎉" },
  { date: "11th March 2026", text: "10th farewell with my pookie 🎓" },
  { date: "12th March 2026", text: "Finally met after a month and a half 🥹" },
  { date: "14th March 2026", text: "Was on a call with the LOML for the whole night 🌃📞" },
  { date: "15th March 2026", text: "Went to trampoline park together 🤸" },
  { date: "22nd March 2026", text: "We did THAT properly for the first time 🌹" },
];

// --- Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 5 + Math.random() * 5,
          size: 10 + Math.random() * 20
        }
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
          animate={{ y: "-10vh", opacity: [0, 0.6, 0], scale: [0.5, 1, 0.8] }}
          transition={{ duration: heart.duration, ease: "linear" }}
          style={{ left: `${heart.left}%`, position: 'absolute' }}
        >
          <Heart size={heart.size} fill="#f06292" color="#f06292" />
        </motion.div>
      ))}
    </div>
  );
};

const MemoryCard = ({ memory, index }: { memory: typeof MEMORIES[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex-shrink-0 w-56 h-64 mx-4 relative group perspective-1000">
      <motion.div
        className="w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg border border-romantic-blush p-4 flex flex-col justify-between">
          <div>
            <span className="text-romantic-deep font-bold text-[9px] uppercase tracking-widest">
              {memory.date}
            </span>
            <div className="w-6 h-0.5 bg-romantic-blush mt-1 mb-2 rounded-full" />
            <p className="font-serif text-sm text-gray-700 leading-snug">
              {memory.text}
            </p>
          </div>
          <div className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart size={16} fill="#f8bbd0" color="#f06292" />
            </motion.div>
          </div>
          <div className="absolute bottom-2 right-3 text-[8px] text-romantic-deep/40 italic">
            Click to see photo
          </div>
        </div>

        {/* Back Side (Placeholder Image) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-romantic-blush rounded-xl shadow-lg border border-romantic-deep overflow-hidden flex items-center justify-center">
          <div className="text-center p-2">
            <div className="w-full aspect-square bg-romantic-pink/50 rounded-lg flex items-center justify-center mb-2 border border-dashed border-romantic-deep/30">
              <span className="text-romantic-deep font-mono text-[9px]">memory-{index + 1}.jpg</span>
            </div>
            <p className="text-romantic-deep font-medium text-[9px]">Our Beautiful Moment</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState<'landing' | 'timeline'>('landing');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (page === 'timeline' && scrollRef.current) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [page]);

  return (
    <div className="min-h-screen bg-romantic-pink selection:bg-romantic-blush selection:text-romantic-deep">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {page === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
          >
            {/* Hero Background Placeholder */}
            <div className="absolute inset-0 z-[-1]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-romantic-pink/40 to-romantic-pink z-10" />
              <div className="w-full h-full bg-romantic-blush flex items-center justify-center">
                <span className="text-romantic-deep/20 font-mono text-4xl">hero-photo.jpg</span>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="z-20"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-romantic-deep mb-8 drop-shadow-sm">
                Happy 10 Months <br /> My Pwincess 🤍
              </h1>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ["0 0 0px rgba(240, 98, 146, 0.4)", "0 0 20px rgba(240, 98, 146, 0.6)", "0 0 0px rgba(240, 98, 146, 0.4)"] 
                }}
                transition={{ 
                  boxShadow: { repeat: Infinity, duration: 2 }
                }}
                onClick={() => setPage('timeline')}
                className="bg-romantic-deep text-white px-8 py-4 rounded-full text-xl font-medium flex items-center gap-2 transition-colors hover:bg-romantic-deep/90 shadow-lg"
              >
                View Our Memories 💫
                <ChevronRight size={24} />
              </motion.button>
            </motion.div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 opacity-40">
              <Sparkles className="text-romantic-deep animate-pulse" />
              <Sparkles className="text-romantic-deep animate-pulse delay-75" />
              <Sparkles className="text-romantic-deep animate-pulse delay-150" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="h-screen flex flex-col pt-4 pb-4"
          >
            <div className="px-8 mb-4 flex items-center justify-between">
              <button
                onClick={() => setPage('landing')}
                className="flex items-center gap-2 text-romantic-deep hover:text-romantic-deep/70 transition-colors font-medium text-sm"
              >
                <ChevronLeft size={16} />
                Back to Home
              </button>
              <h2 className="font-serif text-2xl text-romantic-deep">Our Journey Together</h2>
              <div className="w-24" /> {/* Spacer */}
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-x-auto overflow-y-hidden timeline-scroll flex items-center relative px-[10vw]"
            >
              {/* Timeline Path */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-romantic-blush to-transparent z-0" />
              
              <div className="flex items-center relative z-10">
                {MEMORIES.map((memory, index) => (
                  <div key={index} className="relative flex flex-col items-center">
                    {/* Connector Dot */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-romantic-deep rounded-full border border-romantic-pink z-20" />
                    
                    {/* Vertical Line to Card */}
                    <div className={`absolute w-0.5 bg-romantic-blush ${index % 2 === 0 ? 'h-4 bottom-1/2' : 'h-4 top-1/2'}`} />
                    
                    {/* Card Container */}
                    <div className={`${index % 2 === 0 ? 'mb-8' : 'mt-8'}`}>
                      <MemoryCard memory={memory} index={index} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-2 text-romantic-deep/60 text-xs animate-bounce">
              Scroll right to see more memories →
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
