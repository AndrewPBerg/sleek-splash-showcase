
import { useRef, useEffect, useState } from 'react';
import { ChevronDown, Github, Globe, FileText } from 'lucide-react';
import gsap from 'gsap';

const projects = [
  {
    id: 'project1',
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
    tags: ['Lorem', 'Ipsum', 'Dolor'],
    dateRange: 'Jan 2020 - Mar 2021',
    links: {
      github: 'https://github.com',
      website: 'https://example.com',
      paper: null
    }
  },
  {
    id: 'project2',
    title: 'Dolor Sit Amet',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    tags: ['Sit', 'Amet', 'Consectetur'],
    dateRange: 'Apr 2021 - Present',
    links: {
      github: 'https://github.com',
      website: null,
      paper: 'https://example.com/paper.pdf'
    }
  },
  {
    id: 'project3',
    title: 'Consectetur Adipiscing',
    description: 'Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.',
    tags: ['Adipiscing', 'Elit', 'Nulla'],
    dateRange: 'Jun 2019 - Dec 2019',
    links: {
      github: 'https://github.com',
      website: 'https://example.com',
      paper: null
    }
  },
  {
    id: 'project4',
    title: 'Vestibulum Tortor',
    description: 'Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.',
    tags: ['Vestibulum', 'Tortor', 'Quam'],
    dateRange: 'Jan 2018 - May 2019',
    links: {
      github: null,
      website: 'https://example.com',
      paper: 'https://example.com/paper.pdf'
    }
  },
  {
    id: 'project5',
    title: 'Aenean Fermentum',
    description: 'Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.',
    tags: ['Aenean', 'Fermentum', 'Elit'],
    dateRange: 'Sep 2017 - Dec 2017',
    links: {
      github: 'https://github.com',
      website: null,
      paper: null
    }
  },
  {
    id: 'project6',
    title: 'Fusce Commodo',
    description: 'Fusce commodo aliquam arcu. Nam commodo suscipit quam. Vestibulum ullamcorper mauris.',
    tags: ['Fusce', 'Commodo', 'Aliquam'],
    dateRange: 'Mar 2017 - Aug 2017',
    links: {
      github: 'https://github.com',
      website: 'https://example.com',
      paper: null
    }
  },
  {
    id: 'project7',
    title: 'Praesent Egestas',
    description: 'Praesent egestas neque eu enim. In hac habitasse platea dictumst. Maecenas tempus.',
    tags: ['Praesent', 'Egestas', 'Neque'],
    dateRange: 'Jan 2017 - Feb 2017',
    links: {
      github: null,
      website: null,
      paper: 'https://example.com/paper.pdf'
    }
  }
];

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  useEffect(() => {
    if (!scrollIndicatorRef.current || !projectsRef.current) return;
    
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5
    });
    
    tl.to(scrollIndicatorRef.current, {
      y: 6,
      duration: 0.8,
      ease: "sine.inOut"
    })
    .to(scrollIndicatorRef.current, {
      y: 0,
      duration: 0.8,
      ease: "sine.inOut"
    });
    
    const handleScroll = () => {
      if (!projectsRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = projectsRef.current;
      const reachedBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 5;
      
      setIsAtBottom(reachedBottom);
      
      if (reachedBottom) {
        gsap.to(scrollIndicatorRef.current, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(scrollIndicatorRef.current, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };
    
    const projectsElement = projectsRef.current;
    projectsElement.addEventListener('scroll', handleScroll);
    
    return () => {
      tl.kill();
      if (projectsElement) {
        projectsElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  const handleScrollClick = () => {
    if (!projectsRef.current) return;
    
    const projectsElement = projectsRef.current;
    
    if (isAtBottom) {
      gsap.to(projectsElement, {
        scrollTop: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    } else {
      const pageHeight = projectsElement.clientHeight;
      const newScrollTop = projectsElement.scrollTop + pageHeight * 0.8;
      
      gsap.to(projectsElement, {
        scrollTop: newScrollTop,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia.
      </p>
      
      <div className="relative">
        <div ref={projectsRef} className="space-y-8 max-h-[400px] invisible-scroll pb-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative"
            >
              <h3 className="text-base font-medium font-display mb-1">{project.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{project.dateRange}</p>
              <p className="mt-1 text-xs text-foreground/90">{project.description}</p>
              
              {/* Project links */}
              <div className="mt-3 flex items-center gap-3">
                {project.links.github && (
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                )}
                
                {project.links.website && (
                  <a 
                    href={project.links.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Project Website"
                  >
                    <Globe size={16} />
                  </a>
                )}
                
                {project.links.paper && (
                  <a 
                    href={project.links.paper} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Research Paper"
                  >
                    <FileText size={16} />
                  </a>
                )}
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-secondary/50 text-secondary-foreground rounded-full text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div 
          ref={scrollIndicatorRef}
          onClick={handleScrollClick}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-secondary/30 backdrop-blur-sm cursor-pointer hover:bg-secondary/50 transition-colors"
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default Projects;
