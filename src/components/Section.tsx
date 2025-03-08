
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface SectionProps {
  id: string;
  title: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Section = ({ id, title, active, onClick, children }: SectionProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;
    
    if (active) {
      // First make sure the content is visible but with opacity 0
      gsap.set(contentRef.current, { display: 'block', opacity: 0 });
      
      // Create a timeline for smooth animation
      const tl = gsap.timeline();
      
      // Animate the content container appearing under the button
      tl.to(contentRef.current, { 
        opacity: 1, 
        y: 0,
        duration: 0.3,
        ease: 'power2.out' 
      });
      
    } else {
      // When closing, fade out the content
      gsap.to(contentRef.current, { 
        opacity: 0, 
        y: 10,
        duration: 0.2,
        ease: 'power1.in',
        onComplete: () => {
          gsap.set(contentRef.current, { display: 'none' });
        }
      });
    }
  }, [active, location.pathname]);
  
  return (
    <div 
      ref={sectionRef}
      className="relative"
    >
      <div 
        ref={headerRef}
        onClick={onClick}
        className={`h-14 flex items-center px-6 md:px-8 cursor-pointer rounded-md
          hover:bg-secondary/50 transition-colors ${active ? 'bg-secondary' : ''}`}
      >
        <h2 className="text-lg font-medium tracking-tight">
          {title}
        </h2>
      </div>
      
      <div 
        ref={contentRef} 
        className="p-5 mt-2 rounded-md bg-background border border-border shadow-sm max-w-md"
        style={{ 
          display: active ? 'block' : 'none',
          marginLeft: '1rem'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Section;
