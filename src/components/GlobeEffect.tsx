
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import NET from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';

interface GlobeEffectProps {
  activeSection: string;
}

const GlobeEffect = ({ activeSection }: GlobeEffectProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const { theme } = useTheme();
  
  // Configuration based on active section
  const getSectionConfig = () => {
    const baseConfig = {
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      size: 1.5,
    };
    
    // Different configurations for each section
    switch (activeSection) {
      case 'info':
        return {
          ...baseConfig,
          points: 12.00,
          maxDistance: 26.00,
          spacing: 17.00,
          backgroundColor: 0x0,
          speed: 1.2,
        };
      case 'contact':
        return {
          ...baseConfig,
          points: 8.00,
          maxDistance: 22.00,
          spacing: 20.00,
          backgroundColor: 0x0,
          speed: 0.8,
        };
      case 'stack':
        return {
          ...baseConfig,
          points: 16.00,
          maxDistance: 28.00,
          spacing: 15.00,
          backgroundColor: 0x0,
          speed: 1.5,
        };
      case 'projects':
        return {
          ...baseConfig,
          points: 10.00,
          maxDistance: 24.00,
          spacing: 18.00,
          backgroundColor: 0x0,
          speed: 1.0,
        };
      default:
        return baseConfig;
    }
  };
  
  // Get color configuration based on theme
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        color: 0x3a7ad5,
        color2: 0x9b87f5,
        backgroundColor: 0x050505
      };
    } else {
      return {
        color: 0x9b87f5,
        color2: 0x3a7ad5,
        backgroundColor: 0xfcfcfc
      };
    }
  };
  
  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      // Initialize the effect
      const config = {
        ...getSectionConfig(),
        ...getThemeColors(),
        el: vantaRef.current,
        THREE: THREE
      };
      
      const effect = NET(config);
      setVantaEffect(effect);
    }
    
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  
  // Update when theme changes
  useEffect(() => {
    if (vantaEffect) {
      const colors = getThemeColors();
      vantaEffect.setOptions({
        color: colors.color,
        color2: colors.color2,
        backgroundColor: colors.backgroundColor
      });
    }
  }, [theme]);
  
  // Update when active section changes
  useEffect(() => {
    if (vantaEffect) {
      const sectionConfig = getSectionConfig();
      
      // Animate transition
      const transitionConfig = {
        points: sectionConfig.points,
        maxDistance: sectionConfig.maxDistance,
        spacing: sectionConfig.spacing,
        speed: sectionConfig.speed
      };
      
      vantaEffect.setOptions(transitionConfig);
    }
  }, [activeSection]);
  
  return (
    <div 
      ref={vantaRef} 
      className="fixed top-0 left-0 w-1/2 h-full z-10 pointer-events-none transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};

export default GlobeEffect;
