
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
      gsap.set(contentRef.current, { display: 'block', opacity: 0, height: 'auto' });
      
      // Get the natural height of the content
      const contentHeight = contentRef.current.offsetHeight;
      
      // Create a timeline for smooth animation
      const tl = gsap.timeline();
      
      // Animate the section container to make space
      tl.to(sectionRef.current, { 
        height: `${contentHeight + 56}px`, // 56px is the header height (14*4)
        duration: 0.4,
        ease: 'power2.inOut'
      })
      // Then fade in the content
      .to(contentRef.current, { 
        opacity: 1, 
        y: 0,
        duration: 0.3,
        ease: 'power2.out' 
      }, "-=0.1");
      
    } else {
      // When closing, first fade out the content
      const tl = gsap.timeline();
      
      tl.to(contentRef.current, { 
        opacity: 0, 
        y: 10,
        duration: 0.2,
        ease: 'power1.in'
      })
      // Then collapse the section
      .to(sectionRef.current, { 
        height: '56px', // Collapse to header height
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(contentRef.current, { display: 'none' });
        }
      }, "-=0.1");
    }
  }, [active, location.pathname]);
  
  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden transition-colors"
      style={{ height: active ? 'auto' : '56px' }} // Initial height based on active state
    >
      <div 
        ref={headerRef}
        onClick={onClick}
        className={`h-14 flex items-center px-6 md:px-8 cursor-pointer ${active ? 'border-b border-border' : ''}`}
      >
        <h2 className="text-lg font-medium tracking-tight">
          {title}
        </h2>
      </div>
      
      <div 
        ref={contentRef} 
        className="p-6 md:p-8"
        style={{ display: active ? 'block' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Section;
