import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import gsap from 'gsap';

const sections = [
  { id: 'info', title: 'Info' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('info');
  const [previousSection, setPreviousSection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const buttonsRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  
  // Update active section based on route
  useEffect(() => {
    const path = location.pathname.slice(1) || 'info';
    if (path !== activeSection) {
      setPreviousSection(activeSection);
      setActiveSection(path);
    }
  }, [location, activeSection]);
  
  // Handle animations when active section changes
  useEffect(() => {
    const activeContentRef = contentRefs.current[activeSection];
    if (!activeContentRef) return;
    
    // Kill any existing animations
    if (tlRef.current) {
      tlRef.current.kill();
    }
    
    // Don't animate on initial load
    if (!previousSection) {
      gsap.set(activeContentRef, { opacity: 1, y: 0, x: 0 });
      return;
    }
    
    setIsAnimating(true);
    
    // Create animation timeline with better easing
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.5
      },
      onComplete: () => {
        setIsAnimating(false);
      }
    });
    
    tlRef.current = tl;
    
    // Set initial state
    gsap.set(activeContentRef, { 
      opacity: 0, 
      y: -8, 
      x: 8,
      display: 'block'
    });
    
    // Animate in with better easing
    tl.to(activeContentRef, { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      clearProps: "transform" // Clean up transforms for better performance
    });
    
    // Animate children with stagger
    if (activeContentRef.children.length > 0 && activeContentRef.children[0].children.length > 0) {
      tl.fromTo(
        activeContentRef.children[0].children,
        { 
          opacity: 0, 
          y: 6,
          scale: 0.99
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          stagger: 0.03, 
          duration: 0.4,
          clearProps: "transform,opacity" // Clean up for better performance
        },
        "-=0.35" // More overlap for smoother animation
      );
    }
    
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [activeSection, previousSection]);
  
  const handleSectionChange = (id: string) => {
    // Prevent changing during animation or if already on this section
    if (isAnimating || id === activeSection) return;
    
    // Start animation
    setIsAnimating(true);
    
    // Get current content ref
    const currentContentRef = contentRefs.current[activeSection];
    
    if (currentContentRef) {
      // Kill any existing animations
      if (tlRef.current) {
        tlRef.current.kill();
      }
      
      // Create a new timeline for exit animation
      const exitTl = gsap.timeline({
        defaults: {
          ease: "power2.in",
          duration: 0.3
        },
        onComplete: () => {
          // After animation completes, navigate to new route
          navigate(`/${id}`);
        }
      });
      
      tlRef.current = exitTl;
      
      // Animate out current content with better easing
      exitTl.to(currentContentRef, {
        opacity: 0,
        y: -4,
        x: -4,
        scale: 0.99
      });
    } else {
      // If no current content, just navigate
      navigate(`/${id}`);
      setIsAnimating(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-end">
        <div ref={buttonsRef} className="flex flex-col gap-6 items-end">
          {sections.map((section) => (
            <div key={section.id} className="relative">
              <button
                onClick={() => handleSectionChange(section.id)}
                className={`group flex items-center gap-2 focus:outline-none ${
                  isAnimating ? 'pointer-events-none opacity-70' : ''
                }`}
                disabled={isAnimating}
              >
                <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  section.id === activeSection 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/40 group-hover:bg-muted-foreground/70'
                }`} />
                <span className={`text-xs tracking-wide transition-colors duration-300 ${
                  section.id === activeSection 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground group-hover:text-muted-foreground/80'
                }`}>
                  {section.title}
                </span>
              </button>
              
              {section.id === activeSection && (
                <div 
                  ref={el => contentRefs.current[section.id] = el}
                  className="content-container mt-6 w-80 pr-6"
                  style={{ opacity: 0 }} // Start invisible to prevent flash
                >
                  <div>
                    <Outlet />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
