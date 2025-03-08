
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface NavIndicatorProps {
  sections: { id: string; title: string }[];
  activeId: string;
  onChange: (id: string) => void;
}

const NavIndicator = ({ sections, activeId, onChange }: NavIndicatorProps) => {
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (!indicatorsRef.current) return;
    
    const indicators = indicatorsRef.current.querySelectorAll('.nav-indicator');
    indicators.forEach((indicator, index) => {
      if (sections[index].id === activeId) {
        gsap.to(indicator, {
          width: 12,
          backgroundColor: 'hsl(var(--primary))',
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(indicator, {
          width: 6,
          backgroundColor: 'hsl(var(--muted-foreground))',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  }, [activeId, sections, location.pathname]);
  
  return (
    <div ref={indicatorsRef} className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onChange(section.id)}
          className="group flex items-center justify-center h-8 w-8 focus:outline-none"
          aria-label={`Navigate to ${section.title}`}
        >
          <div 
            className={`nav-indicator ${section.id === activeId ? 'active' : ''}`} 
          />
          <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground font-mono tracking-wide">
            {section.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default NavIndicator;
