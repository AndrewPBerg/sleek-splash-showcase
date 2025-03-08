
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
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (!contentRef.current) return;
    
    if (active) {
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(contentRef.current, { opacity: 0, duration: 0.2, ease: 'power1.in' });
    }
  }, [active, location.pathname]);
  
  return (
    <div className={`relative ${active ? 'flex-1' : 'h-14'} transition-all duration-500 ease-in-out overflow-hidden`}>
      <div 
        onClick={onClick}
        className={`h-14 flex items-center px-6 md:px-8 cursor-pointer ${active ? 'border-b border-border' : ''}`}
      >
        <h2 className="text-lg font-medium tracking-tight">
          {title}
        </h2>
      </div>
      
      <div 
        ref={contentRef} 
        className={`section-content p-6 md:p-8 ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Section;
