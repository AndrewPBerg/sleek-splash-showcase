
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';
import { useIsMobile } from '../hooks/use-mobile';
import { TopologyEffect } from './TopologyEffect';

const sections = [
  { id: 'info', title: 'Info' },
  { id: 'contact', title: 'Contact' },
  { id: 'stack', title: 'Stack' },
  { id: 'projects', title: 'Projects' },
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
  const isMobile = useIsMobile();
  
  // Memoize the active section to prevent unnecessary re-renders of TopologyEffect
  const memoizedActiveSection = useMemo(() => activeSection, [activeSection]);
  
  // Optimized section change handler
  const handleSectionChange = useCallback((id: string) => {
    if (isAnimating || id === activeSection) return;
    
    setIsAnimating(true);
    
    const currentContentRef = contentRefs.current[activeSection];
    
    if (currentContentRef) {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      
      // Simplified exit animation
      const exitTl = gsap.timeline({
        defaults: {
          ease: "power1.in", // Simpler easing
          duration: isMobile ? 0.15 : 0.2, // Faster animations
          force3D: true,
        },
        onComplete: () => {
          navigate(`/${id}`);
        }
      });
      
      tlRef.current = exitTl;
      
      // Simpler animation with fewer properties
      exitTl.to(currentContentRef, {
        opacity: 0,
        y: -5,
      });
    } else {
      navigate(`/${id}`);
      setIsAnimating(false);
    }
  }, [activeSection, isAnimating, isMobile, navigate]);
  
  // Improved theme toggle with smoother transitions
  const toggleTheme = useCallback(() => {
    // Add transition class before changing theme for better performance
    document.documentElement.classList.add('theme-transition');
    
    // Use RAF to ensure CSS changes are batched for better performance
    requestAnimationFrame(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
    });
  }, [theme, setTheme]);
  
  // Update active section based on URL
  useEffect(() => {
    const path = location.pathname.slice(1) || 'info';
    if (path !== activeSection) {
      setPreviousSection(activeSection);
      setActiveSection(path);
    }
  }, [location, activeSection]);
  
  // Simplified button glow effect
  useEffect(() => {
    // Clear existing styles
    sections.forEach(section => {
      const buttonRef = buttonRefs.current[section.id];
      if (buttonRef) {
        gsap.killTweensOf(buttonRef);
        buttonRef.style.boxShadow = 'none';
      }
    });
    
    // Directly set styles without animation
    const activeButtonRef = buttonRefs.current[activeSection];
    if (activeButtonRef) {
      const glowColor = theme === 'dark'
        ? 'rgba(200, 200, 200, 0.5)'
        : 'rgba(80, 80, 80, 0.3)';
      
      activeButtonRef.style.boxShadow = `0 0 6px 1px ${glowColor}`;
    }
  }, [activeSection, theme]);
  
  // Optimized content transitions
  useEffect(() => {
    const activeContentRef = contentRefs.current[activeSection];
    if (!activeContentRef) return;
    
    if (tlRef.current) {
      tlRef.current.kill();
    }
    
    if (!previousSection) {
      gsap.set(activeContentRef, { opacity: 1, y: 0 });
      return;
    }
    
    setIsAnimating(true);
    
    // Simpler timeline with fewer properties
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out", // Simpler easing
        duration: 0.3, // Faster animation
        force3D: true,
      },
      onComplete: () => {
        setIsAnimating(false);
      }
    });
    
    tlRef.current = tl;
    
    // Set initial state directly
    gsap.set(activeContentRef, { 
      opacity: 0, 
      y: 5,
      display: 'block'
    });
    
    // Simple animation
    tl.to(activeContentRef, { 
      opacity: 1, 
      y: 0,
    });
    
    // Simplified child animations - only if needed
    const hasChildren = activeContentRef.children.length > 0 && 
                        activeContentRef.children[0].children.length > 0;
    
    if (hasChildren) {
      const children = activeContentRef.children[0].children;
      // Faster, simpler stagger animation
      tl.fromTo(
        children,
        { opacity: 0 },
        { 
          opacity: 1, 
          stagger: 0.01, // Much faster stagger
          duration: 0.2,
        },
        "-=0.1" // Less overlap
      );
    }
    
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [activeSection, previousSection, isMobile]);
  
  // Isolated topology effect to prevent re-renders
  const topologyEffect = useMemo(() => (
    <TopologyEffect activeSection={memoizedActiveSection} />
  ), [memoizedActiveSection]);
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {topologyEffect}
      
      {/* Redesigned Theme Toggle */}
      <div className={`fixed ${isMobile ? 'top-6 right-6' : 'top-6 right-6'} z-50`}>
        <button
          onClick={toggleTheme}
          className={`theme-toggle-btn group flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 will-change-transform ${
            theme === 'dark' 
              ? 'bg-background/60 border-primary/20 hover:bg-background/80' 
              : 'bg-background/80 border-border hover:bg-background'
          }`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="relative w-10 h-5 flex items-center rounded-full transition-colors duration-300 bg-gradient-to-r from-muted to-muted/70 p-0.5">
            <div 
              className={`absolute w-4 h-4 rounded-full transition-all duration-300 shadow-sm will-change-transform ${
                theme === 'dark' 
                  ? 'translate-x-5 bg-primary' 
                  : 'translate-x-0 bg-background'
              }`}
              style={{ transform: `translateZ(0) translateX(${theme === 'dark' ? '20px' : '0px'})` }}
            />
          </div>
          <span className={`text-xs font-medium tracking-wider transition-opacity duration-300 ${
            isMobile ? 'opacity-0 w-0' : 'opacity-100'
          }`}>
            {theme === 'dark' ? 'DARK' : 'LIGHT'}
          </span>
        </button>
      </div>
      
      {/* Desktop Navigation and Content */}
      {!isMobile && (
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
                    className={`relative flex items-center justify-center h-3 w-3 rounded-full transition-colors duration-200 ${
                      section.id === activeSection 
                        ? 'bg-primary' 
                        : 'bg-muted-foreground/40 group-hover:bg-muted-foreground/70'
                    }`} 
                    style={{ transform: 'translateZ(0)' }}
                  />
                  <span className={`text-xs tracking-wide transition-colors duration-200 ${
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
                    className="content-container mt-6 w-80 pr-6 will-change-transform"
                    style={{ opacity: 0, transform: 'translateZ(0)' }}
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
      )}
      
      {/* Mobile Navigation and Content - Optimized for performance */}
      {isMobile && (
        <>
          {/* Mobile Navigation Menu - Fixed at bottom with improved tap targets */}
          <div className="fixed bottom-6 left-0 right-0 z-50">
            <div className="flex flex-row justify-center mx-auto">
              <div className="bg-background/90 backdrop-blur-md py-3 px-6 rounded-full shadow-md flex items-center gap-8 border border-border/30"
                   style={{ transform: 'translateZ(0)' }}>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`group flex flex-col items-center gap-1.5 py-1 px-1 focus:outline-none ${
                      isAnimating ? 'pointer-events-none opacity-70' : ''
                    }`}
                    disabled={isAnimating}
                  >
                    <div 
                      ref={el => buttonRefs.current[section.id] = el}
                      className={`relative flex items-center justify-center h-3.5 w-3.5 rounded-full transition-colors duration-200 ${
                        section.id === activeSection 
                          ? 'bg-primary' 
                          : 'bg-muted-foreground/40 group-hover:bg-muted-foreground/70'
                      }`} 
                      style={{ transform: 'translateZ(0)' }}
                    />
                    <span className={`text-xs font-medium tracking-wide transition-colors duration-200 ${
                      section.id === activeSection 
                        ? 'text-primary' 
                        : 'text-muted-foreground/70 group-hover:text-muted-foreground'
                    }`}>
                      {section.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Content - Centered with improved scrolling */}
          {sections.map((section) => (
            section.id === activeSection && (
              <div 
                key={section.id}
                ref={el => contentRefs.current[section.id] = el}
                className="content-container fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] px-4 will-change-transform"
                style={{ 
                  opacity: 0, 
                  transform: 'translate3d(-50%, -50%, 0)',
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}
              >
                <div className="flex flex-col items-center">
                  <Outlet />
                </div>
              </div>
            )
          ))}
        </>
      )}
    </div>
  );
};

export default Layout;
