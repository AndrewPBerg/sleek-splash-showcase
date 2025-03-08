
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(TextPlugin, SplitText);

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

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

    // Setup SplitText for the heading
    const splitText = new SplitText(textRef.current, { type: "chars" });
    const chars = splitText.chars;

    // Initial state - hide everything
    gsap.set(containerRef.current, { autoAlpha: 1 });
    gsap.set(chars, { y: 100, opacity: 0 });

    // Animation sequence
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.7)"
    })
    .to(chars, {
      y: -5,
      yoyo: true,
      repeat: 1,
      duration: 0.2,
      stagger: 0.03,
      ease: "power1.inOut"
    }, "+=0.3")
    .to(chars, {
      y: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: "power1.in"
    }, "-=0.1");

    return () => {
      tl.kill();
      splitText.revert();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div 
        ref={textRef} 
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter overflow-hidden"
      >
        Build Cool Shit
      </div>
    </div>
  );
};

export default SplashScreen;
