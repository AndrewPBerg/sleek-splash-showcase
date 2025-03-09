
import { useState, useRef, useEffect } from 'react';
import { 
  Monitor, 
  Database, 
  BarChart3, 
  Flask,
  Lightning,
  Package, 
  Boxes,
  Cpu
} from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface Technology {
  name: string;
  description: string;
  url: string;
  icon: JSX.Element;
  color: string;
}

const Stack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const technologies: Technology[] = [
    {
      name: "React",
      description: "UI library for building user interfaces",
      url: "https://reactjs.org",
      icon: <Monitor size={28} />,
      color: "bg-[#61DAFB]/10 hover:bg-[#61DAFB]/20"
    },
    {
      name: "MySQL",
      description: "Relational database management system",
      url: "https://mysql.com",
      icon: <Database size={28} />,
      color: "bg-[#4479A1]/10 hover:bg-[#4479A1]/20"
    },
    {
      name: "PyTorch",
      description: "Open source machine learning framework",
      url: "https://pytorch.org",
      icon: <Flask size={28} />,
      color: "bg-[#EE4C2C]/10 hover:bg-[#EE4C2C]/20"
    },
    {
      name: "Weights & Biases",
      description: "MLOps platform for experiment tracking",
      url: "https://wandb.ai",
      icon: <BarChart3 size={28} />,
      color: "bg-[#FF9F00]/10 hover:bg-[#FF9F00]/20"
    },
    {
      name: "PyTorch Lightning",
      description: "Lightweight PyTorch wrapper for ML research",
      url: "https://lightning.ai",
      icon: <Lightning size={28} />,
      color: "bg-[#792EE5]/10 hover:bg-[#792EE5]/20"
    },
    {
      name: "Docker",
      description: "Platform for developing, shipping, and running applications",
      url: "https://docker.com",
      icon: <Boxes size={28} />,
      color: "bg-[#2496ED]/10 hover:bg-[#2496ED]/20"
    },
    {
      name: "Vite",
      description: "Next generation frontend tooling",
      url: "https://vitejs.dev",
      icon: <Package size={28} />,
      color: "bg-[#646CFF]/10 hover:bg-[#646CFF]/20"
    },
    {
      name: "Next.js",
      description: "React framework for production",
      url: "https://nextjs.org",
      icon: <Cpu size={28} />,
      color: "bg-[#000000]/10 hover:bg-[#000000]/20"
    }
  ];

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {technologies.map((tech, index) => (
          <div 
            key={tech.name}
            className={`
              opacity-0 ${isVisible ? 'animate-fade-in' : ''}
              transition-all duration-300 ease-out
            `}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'forwards'
            }}
          >
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleClick(tech.url)}
                    className={`
                      relative flex flex-col items-center justify-center
                      w-full aspect-square rounded-full 
                      ${tech.color}
                      transition-all duration-300
                      border border-border hover:border-muted-foreground
                      group
                    `}
                    aria-label={tech.name}
                  >
                    <div className="text-foreground group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <div className="space-y-1">
                    <p className="font-medium text-xs">{tech.name}</p>
                    <p className="text-[10px] text-muted-foreground">{tech.description}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;
