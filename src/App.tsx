/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronRight, ChevronLeft, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';

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

const CardDecorations = ({ index }: { index: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            y: [0, -15, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{
            top: i === 0 ? '-20px' : i === 1 ? '40%' : '90%',
            left: i === 0 ? '10%' : i === 1 ? '-30px' : '80%',
          }}
        >
          {i === 0 ? (
            <Sparkles size={16} className="text-romantic-deep opacity-40" />
          ) : (
            <Heart size={12} fill="#f06292" color="#f06292" className="opacity-30" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

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

const MemoryCard = ({ 
  memory, 
  index, 
  image, 
  onImageUpload 
}: { 
  memory: typeof MEMORIES[0]; 
  index: number;
  image?: string;
  onImageUpload: (file: File) => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: index % 2 === 0 ? -100 : 100, scale: 0.5, rotate: index % 2 === 0 ? -10 : 10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.05 
      }}
      className="flex-shrink-0 w-64 h-72 mx-20 relative group perspective-1000"
    >
      <motion.div
        className="w-full h-full preserve-3d cursor-pointer"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          y: [0, index % 2 === 0 ? -10 : 10, 0]
        }}
        transition={{
          rotateY: { duration: 0.15, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 4 + (index % 3), ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.1, rotateZ: index % 2 === 0 ? 3 : -3, z: 50 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* External Decorations */}
        <CardDecorations index={index} />

        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-2xl border-2 border-romantic-blush p-5 flex flex-col justify-between overflow-hidden">
          {/* Decorative Corner Glow */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-romantic-deep/10 blur-xl rounded-full" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-romantic-deep font-black text-[10px] uppercase tracking-widest bg-romantic-pink/50 px-2 py-0.5 rounded-full">
                {memory.date}
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-romantic-deep" />
              </motion.div>
            </div>
            <div className="w-10 h-1 bg-gradient-to-r from-romantic-deep to-transparent mb-4 rounded-full" />
            <p className="font-serif text-base text-gray-800 leading-relaxed font-medium">
              {memory.text}
            </p>
          </div>
          
          <div className="flex justify-center items-center relative z-10">
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                filter: ["drop-shadow(0 0 0px #f06292)", "drop-shadow(0 0 8px #f06292)", "drop-shadow(0 0 0px #f06292)"]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart size={24} fill="#f06292" color="#f06292" className="opacity-80" />
            </motion.div>
          </div>
          
          <div className="text-center text-[10px] text-romantic-deep font-bold tracking-tighter animate-pulse relative z-10">
            TAP TO REVEAL PHOTO ✨
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-romantic-blush rounded-2xl shadow-2xl border-2 border-romantic-deep overflow-hidden flex items-center justify-center p-4">
          <div className="text-center w-full h-full flex flex-col items-center justify-center">
            <div className="w-full h-full bg-white/60 rounded-xl flex items-center justify-center border-2 border-dashed border-romantic-deep/30 relative overflow-hidden">
              {image ? (
                <img src={image} alt="Memory" className="w-full h-full object-cover" />
              ) : (
                <div 
                  className="flex flex-col items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-romantic-deep/10 flex items-center justify-center text-romantic-deep hover:bg-romantic-deep/20 transition-colors">
                    <Plus size={24} />
                  </div>
                  <span className="text-romantic-deep font-mono text-[10px] font-bold">Add Photo</span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ZigzagLine = ({ count }: { count: number }) => {
  // Each card is w-64 (256px) + mx-20 (80px each side = 160px) = 416px total per slot
  const slotWidth = 416;
  const height = 240;
  const points = [];
  
  for (let i = 0; i < count; i++) {
    const x = i * slotWidth + slotWidth / 2;
    const y = i % 2 === 0 ? height * 0.2 : height * 0.8;
    points.push(`${x},${y}`);
  }
  
  const pathData = `M ${points.join(' L ')}`;
  
  return (
    <svg 
      className="absolute top-1/2 -translate-y-1/2 left-[15vw] z-0 pointer-events-none" 
      width={count * slotWidth} 
      height={height}
      viewBox={`0 0 ${count * slotWidth} ${height}`}
    >
      {/* Main Path */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="#f8bbd0"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="15, 20"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      
      {/* Traveling Glow Effect */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="50, 400"
        animate={{ strokeDashoffset: [0, -450] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#f06292" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Animated nodes */}
      {points.map((p, i) => {
        const [x, y] = p.split(',').map(Number);
        return (
          <g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r="8"
              fill="#f06292"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                scale: { repeat: Infinity, duration: 2, delay: i * 0.2 },
                initial: { delay: i * 0.1 }
              }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="15"
              stroke="#f06292"
              strokeWidth="1"
              fill="none"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default function App() {
  const [page, setPage] = useState<'landing' | 'timeline'>('landing');
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [memoryImages, setMemoryImages] = useState<Record<number, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  // Load images from localStorage
  useEffect(() => {
    const savedHero = localStorage.getItem('heroImage');
    const savedMemories = localStorage.getItem('memoryImages');
    if (savedHero) setHeroImage(savedHero);
    if (savedMemories) setMemoryImages(JSON.parse(savedMemories));
  }, []);

  const handleHeroUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setHeroImage(result);
        localStorage.setItem('heroImage', result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleMemoryUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const newImages = { ...memoryImages, [index]: result };
      setMemoryImages(newImages);
      localStorage.setItem('memoryImages', JSON.stringify(newImages));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (page === 'timeline' && scrollRef.current) {
        // Only horizontal scroll
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          scrollRef.current.scrollLeft += e.deltaY;
        }
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
    <div className="bg-romantic-pink selection:bg-romantic-blush selection:text-romantic-deep min-h-screen overflow-hidden">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {page === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-y-auto"
          >
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-[-1]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-romantic-pink/40 to-romantic-pink z-10" />
              {heroImage ? (
                <motion.img 
                  src={heroImage}
                  alt="Us"
                  referrerPolicy="no-referrer"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full object-cover opacity-80"
                />
              ) : (
                <div className="w-full h-full bg-romantic-blush flex items-center justify-center">
                  <ImageIcon size={100} className="text-romantic-deep/10" />
                </div>
              )}
              <div className="absolute inset-0 bg-romantic-blush -z-10" />
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="z-20 flex flex-col items-center max-w-4xl w-full"
            >
              {/* Central Framed Photo - Adjusted to fit the whole image */}
              <motion.div
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 2, scale: 1 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="mb-10 p-4 bg-white shadow-2xl rounded-sm border border-gray-200 relative group cursor-pointer w-full max-w-[320px] md:max-w-[500px]"
                onClick={() => heroInputRef.current?.click()}
              >
                <div className="w-full h-auto min-h-[200px] overflow-hidden relative bg-romantic-pink/5 flex items-center justify-center">
                  {heroImage ? (
                    <img 
                      src={heroImage} 
                      alt="Us" 
                      className="w-full h-auto object-contain max-h-[70vh]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 py-20">
                      <div className="w-16 h-16 rounded-full bg-romantic-deep/10 flex items-center justify-center text-romantic-deep group-hover:bg-romantic-deep/20 transition-colors">
                        <Plus size={32} />
                      </div>
                      <p className="text-romantic-deep font-serif italic text-lg">Click to add hero photo</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={heroInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleHeroUpload}
                  />
                  <div className="absolute inset-0 bg-romantic-pink/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="pt-4 pb-2 text-center">
                  <p className="font-serif text-romantic-deep text-xl italic">Our Forever 🤍</p>
                </div>
                
                {/* Decorative Sparkle on Frame */}
                <motion.div 
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 text-romantic-deep"
                >
                  <Sparkles size={32} />
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-romantic-deep mb-8 drop-shadow-[0_4px_12_rgba(240,98,146,0.5)] leading-tight">
                  Happy 10 Months <br /> <span className="italic text-romantic-deep/80">My Pwincess</span> 🤍
                </h1>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  boxShadow: ["0 0 0px rgba(240, 98, 146, 0.4)", "0 0 30px rgba(240, 98, 146, 0.8)", "0 0 0px rgba(240, 98, 146, 0.4)"] 
                }}
                transition={{ 
                  boxShadow: { repeat: Infinity, duration: 2 }
                }}
                onClick={() => setPage('timeline')}
                className="bg-romantic-deep text-white px-10 py-5 rounded-full text-2xl font-bold flex items-center gap-3 transition-all hover:bg-romantic-deep/90 shadow-2xl group"
              >
                View Our Memories 💫
                <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 opacity-60">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="text-romantic-deep" size={32} />
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="text-romantic-deep" size={24} />
              </motion.div>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="text-romantic-deep" size={28} />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="h-screen flex flex-col pt-6 pb-6"
          >
            <div className="px-12 mb-6 flex items-center justify-between">
              <motion.button
                whileHover={{ x: -5 }}
                onClick={() => setPage('landing')}
                className="flex items-center gap-2 text-romantic-deep hover:text-romantic-deep/70 transition-colors font-bold text-base bg-white/50 px-4 py-2 rounded-full shadow-sm"
              >
                <ChevronLeft size={20} />
                Back to Home
              </motion.button>
              <h2 className="font-serif text-3xl md:text-4xl text-romantic-deep font-bold italic">Our Journey Together</h2>
              <div className="w-32" /> {/* Spacer */}
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-x-auto overflow-y-hidden timeline-scroll flex items-center relative px-[15vw]"
            >
              <ZigzagLine count={MEMORIES.length} />
              
              <div className="flex items-center relative z-10 h-full">
                {MEMORIES.map((memory, index) => (
                  <div key={index} className="relative flex flex-col items-center h-full justify-center">
                    {/* Card Container with alternating position */}
                    <div className={`${index % 2 === 0 ? 'mb-40' : 'mt-40'}`}>
                      <MemoryCard 
                        memory={memory} 
                        index={index} 
                        image={memoryImages[index]}
                        onImageUpload={(file) => handleMemoryUpload(index, file)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-center mt-4 text-romantic-deep font-bold text-sm flex items-center justify-center gap-2"
            >
              Scroll to explore our story <ChevronRight size={16} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
