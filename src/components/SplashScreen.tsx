
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP TextPlugin
gsap.registerPlugin(TextPlugin);

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (!containerRef.current || !textContainerRef.current) return;
    
    // Create a simple split text effect manually instead of using SplitText plugin
    const text = textContainerRef.current.textContent || "";
    textContainerRef.current.innerHTML = "";
    
    // Create character spans
    const chars = text.split("").map(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("char");
      return span;
    });
    
    // Create word spans with characters inside
    const words: HTMLSpanElement[] = [];
    let currentWord: HTMLSpanElement | null = null;
    
    chars.forEach(char => {
      if (char.textContent === " ") {
        // Add space
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        textContainerRef.current?.appendChild(space);
        currentWord = null;
      } else {
        if (!currentWord) {
          currentWord = document.createElement("span");
          currentWord.classList.add("word");
          textContainerRef.current?.appendChild(currentWord);
          words.push(currentWord);
        }
        currentWord.appendChild(char);
      }
    });
    
    // Initial state setup
    gsap.set(containerRef.current, { autoAlpha: 1 });
    gsap.set(".char", { 
      y: 100, 
      opacity: 0,
      rotationX: -90,
      transformOrigin: "50% 50% -20"
    });
    
    // Create timeline with 2 second total duration
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsVisible(false);
            onComplete();
          }
        });
        
        exitTl.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    });
    
    // Animation sequence with flow
    tl.to(".char", {
      duration: 0.6,
      y: 0,
      opacity: 1,
      rotationX: 0,
      stagger: 0.02,
      ease: "back.out(1.7)"
    })
    .to(".word", {
      duration: 0.4,
      scale: 1.1,
      color: "#8B5CF6", // Vivid purple for emphasis
      stagger: 0.05,
      ease: "power4.out"
    }, "-=0.3")
    .to(".word", {
      duration: 0.3,
      scale: 1,
      color: "white",
      stagger: 0.05,
      ease: "power2.in"
    }, "-=0.1")
    .to(".char", {
      duration: 0.3,
      y: -2,
      rotationY: 10,
      stagger: {
        amount: 0.2,
        from: "center",
        grid: "auto"
      },
      ease: "power1.inOut"
    }, "-=0.2")
    .to(".char", {
      duration: 0.2,
      y: 0,
      rotationY: 0,
      stagger: {
        amount: 0.1,
        from: "edges",
      },
      ease: "power1.in"
    });
    
    // Ensure total timeline duration is about 2 seconds
    if (tl.duration() > 1.6) {
      tl.timeScale(tl.duration() / 1.6);
    }
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
    >
      <div 
        ref={textContainerRef}
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight overflow-hidden"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Build Cool Shit
      </div>
    </div>
  );
};

export default SplashScreen;
