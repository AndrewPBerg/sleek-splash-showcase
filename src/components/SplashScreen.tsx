
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [characters, setCharacters] = useState<string[]>([]);
  
  // Split the text into characters on mount
  useEffect(() => {
    setCharacters("Build Cool Shit".split(''));
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || !textContainerRef.current || characters.length === 0) return;
    
    const charElements = textContainerRef.current.querySelectorAll('.char');
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Start exit animation after main animation completes
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsVisible(false);
            onComplete();
          }
        });
        
        exitTl.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        });
      }
    });
    
    // Initial state - hide everything
    gsap.set(containerRef.current, { autoAlpha: 1 });
    gsap.set(charElements, { y: 100, opacity: 0 });
    
    // Animation sequence
    tl.to(charElements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.7)"
    })
    .to(charElements, {
      y: -5,
      yoyo: true,
      repeat: 1,
      duration: 0.2,
      stagger: 0.03,
      ease: "power1.inOut"
    }, "+=0.3")
    .to(charElements, {
      y: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: "power1.in"
    }, "-=0.1");
    
    return () => {
      tl.kill();
    };
  }, [onComplete, characters]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div 
        ref={textContainerRef}
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter overflow-hidden flex"
      >
        {characters.map((char, index) => (
          <span key={index} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
