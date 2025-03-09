
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';

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
  const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { theme, setTheme } = useTheme();
  
  // Update active section based on route
  useEffect(() => {
    const path = location.pathname.slice(1) || 'info';
    if (path !== activeSection) {
      setPreviousSection(activeSection);
      setActiveSection(path);
    }
  }, [location, activeSection]);
  
  // Handle button glow effect animations
  useEffect(() => {
    // Setup animations for all section buttons
    sections.forEach(section => {
      const buttonRef = buttonRefs.current[section.id];
      if (!buttonRef) return;
      
      // Clear any existing animations
      gsap.killTweensOf(buttonRef);
      
      // If this is the active section, apply glow effect
      if (section.id === activeSection) {
        const tl = gsap.timeline({ repeat: -1 });
        
        // Create glow effect using box shadow
        tl.to(buttonRef, {
          boxShadow: theme === 'dark' 
            ? '0 0 8px 2px rgba(255, 255, 255, 0.4)' 
            : '0 0 8px 2px rgba(0, 0, 0, 0.2)',
          duration: 1.5,
          ease: "sine.inOut"
        })
        .to(buttonRef, {
          boxShadow: '0 0 0px 0px rgba(255, 255, 255, 0)',
          duration: 1.5,
          ease: "sine.inOut"
        });
      }
    });
    
    return () => {
      // Cleanup all animations
      sections.forEach(section => {
        const buttonRef = buttonRefs.current[section.id];
        if (buttonRef) gsap.killTweensOf(buttonRef);
      });
    };
  }, [activeSection, theme]);
  
  // Handle content animations
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
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Dark mode toggle */}
      <div className="fixed top-6 right-6 z-50">
        <div className="flex items-center">
          <span className="text-xs mr-2 font-display tracking-wide">
            {theme === 'dark' ? 'DARK' : 'LIGHT'}
          </span>
          <button
            onClick={toggleTheme}
            className={`w-10 h-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-primary border-primary' 
                : 'bg-secondary border-secondary'
            } border rounded-sm`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <div 
              className={`w-3 h-3 transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-background ml-5' 
                  : 'bg-foreground ml-2'
              }`}
            />
          </button>
        </div>
      </div>
      
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-end">
        <div className="flex flex-col gap-6 items-end">
          {sections.map((section) => (
            <div key={section.id} className="relative">
              <button
                onClick={() => handleSectionChange(section.id)}
                className={`group flex items-center gap-2 focus:outline-none ${
                  isAnimating ? 'pointer-events-none opacity-70' : ''
                }`}
                disabled={isAnimating}
              >
                <div 
                  ref={el => buttonRefs.current[section.id] = el}
                  className={`relative flex items-center justify-center h-3 w-3 rounded-full transition-all duration-300 ${
                    section.id === activeSection 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/40 group-hover:bg-muted-foreground/70'
                  }`} 
                />
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
