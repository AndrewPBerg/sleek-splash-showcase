import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';

interface Technology {
  name: string;
  url: string;
  image: string;
  weight: number;
}

const Stack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize GSAP animations when component becomes visible
  useEffect(() => {
    if (!isVisible || !scrollIndicatorRef.current) return;

    // Create a main timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Staggered entrance animation
    tl.fromTo(
      iconsRef.current,
      { 
        opacity: 0, 
        scale: 0.5,
        y: 20
      },
      { 
        opacity: 1, 
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: {
          amount: 1.2,
          grid: "auto",
          from: "center"
        }
      }
    );

    // Scroll indicator animation
    const scrollTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5
    });
    
    scrollTl.to(scrollIndicatorRef.current, {
      y: 6,
      duration: 0.8,
      ease: "sine.inOut"
    })
    .to(scrollIndicatorRef.current, {
      y: 0,
      duration: 0.8,
      ease: "sine.inOut"
    });

    // Apply subtle continuous wobble to each icon
    iconsRef.current.forEach((icon, index) => {
      if (!icon) return;
      
      const rotationAmount = 1 + Math.random() * 2;
      const scaleAmount = 0.01 + Math.random() * 0.02;
      const duration = 1.5 + Math.random() * 1;
      const delay = index * 0.1;
      
      gsap.to(icon.querySelector('img'), {
        rotation: `+=${rotationAmount}`,
        scale: 1 + scaleAmount,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      scrollTl.kill();
      gsap.killTweensOf(iconsRef.current.map(ref => ref?.querySelector('img')));
    };
  }, [isVisible]);

  const handleScroll = () => {
    if (!containerRef.current || !scrollIndicatorRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const reachedBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 5;
    
    setIsAtBottom(reachedBottom);
  };

  const handleScrollClick = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    if (isAtBottom) {
      gsap.to(container, {
        scrollTop: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    } else {
      const pageHeight = container.clientHeight;
      const newScrollTop = container.scrollTop + pageHeight * 0.8;
      
      gsap.to(container, {
        scrollTop: newScrollTop,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  // Randomize technologies array
  const technologies: Technology[] = [
    {
      name: "PyTorch",
      url: "https://pytorch.org",
      image: "/stack-icons/PyTorch Icon.svg",
      weight: 30
    },
    {
      name: "Hugging Face",
      url: "https://huggingface.co",
      image: "/stack-icons/Hugging Face 2.svg",
      weight: 23
    },
    {
      name: "Weights & Biases",
      url: "https://wandb.ai",
      image: "/stack-icons/WandB Dots Logo.svg",
      weight: 22
    },
    {
      name: "GitHub",
      url: "https://github.com",
      image: "/stack-icons/GitHub Icon.svg",
      weight: 20
    },
    {
      name: "React",
      url: "https://reactjs.org",
      image: "/stack-icons/React Icon.svg",
      weight: 20
    },
    {
      name: "Docker",
      url: "https://docker.com",
      image: "/stack-icons/Docker Icon.svg",
      weight: 15
    },
    {
      name: "Jupyter Notebook",
      url: "https://jupyter.org",
      image: "/stack-icons/Jupyter Icon.svg",
      weight: 11
    },
    {
      name: "Scikit-learn",
      url: "https://scikit-learn.org",
      image: "/stack-icons/Scikit-learn Icon.svg",
      weight: 11
    },
    {
      name: "Cursor",
      url: "https://cursor.sh",
      image: "/stack-icons/Cursor Logo.svg",
      weight: 10
    },
    {
      name: "Pydantic",
      url: "https://pydantic.dev",
      image: "/stack-icons/Pydantic Icon.svg",
      weight: 9
    },
    {
      name: "TensorFlow",
      url: "https://tensorflow.org",
      image: "/stack-icons/TensorFlow Icon.svg",
      weight: 9
    },
    {
      name: "NumPy",
      url: "https://numpy.org",
      image: "/stack-icons/NumPy Icon.svg",
      weight: 8
    },
    {
      name: "Lightning AI",
      url: "https://lightning.ai",
      image: "/stack-icons/lightning-ai.png",
      weight: 7
    },
    {
      name: "Node.js",
      url: "https://nodejs.org",
      image: "/stack-icons/Node.js Icon.svg",
      weight: 7
    },
    {
      name: "Pandas",
      url: "https://pandas.pydata.org",
      image: "/stack-icons/Pandas Mark.svg",
      weight: 6
    },
    {
      name: "Next.js",
      url: "https://nextjs.org",
      image: "/stack-icons/Next.js Icon.svg",
      weight: 5
    },
    {
      name: "Vite",
      url: "https://vitejs.dev",
      image: "/stack-icons/Vite.js Icon.svg",
      weight: 5
    },
    {
      name: "Matplotlib",
      url: "https://matplotlib.org",
      image: "/stack-icons/Matplotlib Icon.svg",
      weight: 4
    },
    {
      name: "Seaborn",
      url: "https://seaborn.pydata.org",
      image: "/stack-icons/Seaborn 1.svg",
      weight: 3
    },
    {
      name: "MySQL",
      url: "https://mysql.com",
      image: "/stack-icons/MySQL Icon.svg",
      weight: 2
    }
  ].sort(() => Math.random() - 0.5); // Randomize the array

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Handle hover animations
  const handleMouseEnter = (index: number) => {
    const icon = iconsRef.current[index];
    if (!icon) return;

    gsap.killTweensOf(icon.querySelector('img'));

    gsap.to(icon, {
      scale: 1.1,
      zIndex: 10,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(icon.querySelector('.tech-name'), {
      opacity: 1,
      x: '100%',
      duration: 0.3,
      ease: "power2.out"
    });

    iconsRef.current.forEach((otherIcon, otherIndex) => {
      if (!otherIcon || otherIndex === index) return;
      
      const rect1 = icon.getBoundingClientRect();
      const rect2 = otherIcon.getBoundingClientRect();
      
      const centerX1 = rect1.left + rect1.width / 2;
      const centerY1 = rect1.top + rect1.height / 2;
      const centerX2 = rect2.left + rect2.width / 2;
      const centerY2 = rect2.top + rect2.height / 2;
      
      const dx = centerX2 - centerX1;
      const dy = centerY2 - centerY1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const pushFactor = (1 - distance / 100) * 10;
        const pushX = (dx / distance) * pushFactor;
        const pushY = (dy / distance) * pushFactor;
        
        gsap.to(otherIcon, {
          x: pushX,
          y: pushY,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  };

  const handleMouseLeave = (index: number) => {
    const icon = iconsRef.current[index];
    if (!icon) return;

    gsap.to(icon, {
      scale: 1,
      zIndex: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(icon.querySelector('.tech-name'), {
      opacity: 0,
      x: 0,
      duration: 0.2,
      ease: "power2.in"
    });

    iconsRef.current.forEach((otherIcon, otherIndex) => {
      if (!otherIcon || otherIndex === index) return;
      
      gsap.to(otherIcon, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    const rotationAmount = 1 + Math.random() * 2;
    const scaleAmount = 0.01 + Math.random() * 0.02;
    const duration = 1.5 + Math.random() * 1;
    
    gsap.to(icon.querySelector('img'), {
      rotation: `+=${rotationAmount}`,
      scale: 1 + scaleAmount,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  return (
    <div className="space-y-8">
      {/* <h2 className="text-2xl font-bold">Stack</h2> */}
      
      <div className="relative">
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              width: 0; /* Adjust width to prevent content from being pushed out */
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
              padding-right: 10px; /* Add padding to prevent content from being pushed out */
            }
          `}
        </style>
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex flex-wrap justify-center items-center max-h-[400px] overflow-y-auto overflow-x-auto hide-scrollbar invisible-scrollbar pb-14"
        >
          {technologies.map((tech, index) => {
            const size = 40 + tech.weight * 1.5; // 40px to 85px
            
            return (
              <div 
                key={tech.name}
                ref={el => iconsRef.current[index] = el}
                className="relative flex justify-center items-center m-1.6"
                style={{ 
                  width: `${size}px`,
                  height: `${size}px`,
                  zIndex: 1,
                  margin: '-1.5px'
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <button
                  onClick={() => handleClick(tech.url)}
                  className="
                    relative flex items-center justify-center 
                    w-full h-full rounded-full
                    bg-muted hover:bg-muted/80
                    transition-colors duration-300
                    border border-border hover:border-muted-foreground
                    overflow-hidden
                  "
                  aria-label={tech.name}
                >
                  <img 
                    src={tech.image}
                    alt={tech.name}
                    className="w-2/3 h-2/3 object-contain"
                  />
                  
                  <div 
                    className="tech-name absolute top-0 bottom-0 left-full ml-2 flex items-center px-2 bg-background/90 opacity-0 transform -translate-x-10"
                  >
                    <p className="text-xs font-medium whitespace-nowrap">{tech.name}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stack;
