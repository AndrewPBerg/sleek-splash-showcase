
import { useEffect, useRef, useState, memo } from 'react';
import { useTheme } from '../hooks/useTheme';
import TOPOLOGY from './vanta/topology.js';
import colorSchemes from '../config/colorSchemes';
import * as THREE from 'three';

// Import p5.js dynamically to avoid SSR issues
let p5: any = null;

interface TopologyEffectProps {
  activeSection: string;
}

// Use memo to prevent unnecessary re-renders
const TopologyEffect = memo(({ activeSection = 'info' }: TopologyEffectProps) => {
  const { theme } = useTheme();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const [p5Loaded, setP5Loaded] = useState(false);
  const prevThemeRef = useRef(theme);
  const prevSectionRef = useRef(activeSection);
  
  // Load p5.js dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !p5) {
      import('p5').then((p5Module) => {
        p5 = p5Module.default;
        setP5Loaded(true);
      });
    }
    
    // Add THREE to window for VANTA
    if (typeof window !== 'undefined') {
      (window as any).THREE = THREE;
    }
    
    // Cleanup function
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  // Force effect recreation when theme changes
  useEffect(() => {
    // If theme changed, destroy current effect so it can be recreated
    if (theme !== prevThemeRef.current && vantaEffectRef.current) {
      console.log('Theme changed, destroying effect to recreate');
      vantaEffectRef.current.destroy();
      vantaEffectRef.current = null;
    }
    
    prevThemeRef.current = theme;
  }, [theme]);

  // Initialize or update the effect
  useEffect(() => {
    if (!vantaRef.current || !p5Loaded) return;
    
    // Get colors based on theme and active section
    const themeColors = colorSchemes[theme as 'dark' | 'light'];
    const sectionColors = themeColors[activeSection as keyof typeof themeColors] || themeColors.info;
    
    const backgroundColor = sectionColors.background;
    const foregroundColor = sectionColors.foreground;

    console.log(`Initializing topology effect: theme=${theme}, section=${activeSection}`);
    console.log(`Colors: bg=${backgroundColor.toString(16)}, fg=${foregroundColor.toString(16)}`);

    // If effect doesn't exist, create it
    if (!vantaEffectRef.current) {
      try {
        vantaEffectRef.current = TOPOLOGY({
          el: vantaRef.current,
          p5: p5,
          mouseControls: false, 
          touchControls: false,  
          gyroControls: false,
          minHeight: 100.00,
          minWidth: 100.00,
          scale: 1.0,
          scaleMobile: 0.8,
          color: foregroundColor,
          backgroundColor: backgroundColor,
          speed: 1.0,
          particleCount: 4000,
          particleSize: 1.4,
          flowCellSize: 10,
          noiseSize: 0.003,
          noiseRadius: 0.1,
          colorMode: 'variance',
          colorVariance: 0.25,
          pulseIntensity: 0,
          pulseSpeed: 0,
          offset: 100,
        });
        console.log('Topology effect initialized successfully');
      } catch (error) {
        console.error("Failed to initialize topology effect:", error);
      }
    } 
    // If effect exists and section changed, just update colors
    else if (activeSection !== prevSectionRef.current) {
      try {
        console.log('Section changed, updating colors');
        // Update only the color properties, not recreating the entire effect
        vantaEffectRef.current.setOptions({
          color: foregroundColor,
          backgroundColor: backgroundColor
        });
      } catch (error) {
        console.error("Failed to update topology effect:", error);
      }
    }

    // Update refs with current values
    prevSectionRef.current = activeSection;
    
  }, [p5Loaded, theme, activeSection]);

  return (
    <div 
      ref={vantaRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 will-change-transform" 
      aria-hidden="true"
      style={{ 
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        mixBlendMode: 'normal',
        filter: 'contrast(1.4) brightness(1.5)',
        padding: '56px', // Add 50+ pixels of padding
      }}
    />
  );
});

// Add display name for debugging
TopologyEffect.displayName = 'TopologyEffect';

export { TopologyEffect };
export default TopologyEffect;
