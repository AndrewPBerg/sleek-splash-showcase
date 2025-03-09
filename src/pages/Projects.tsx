import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const projects = [
  {
    id: 'project1',
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
    tags: ['Lorem', 'Ipsum', 'Dolor'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'project2',
    title: 'Dolor Sit Amet',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    tags: ['Sit', 'Amet', 'Consectetur'],
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'project3',
    title: 'Consectetur Adipiscing',
    description: 'Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.',
    tags: ['Adipiscing', 'Elit', 'Nulla'],
    image: 'https://images.unsplash.com/photo-1603466182843-70e9b29295f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'project4',
    title: 'Vestibulum Tortor',
    description: 'Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.',
    tags: ['Vestibulum', 'Tortor', 'Quam'],
    image: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'project5',
    title: 'Aenean Fermentum',
    description: 'Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.',
    tags: ['Aenean', 'Fermentum', 'Elit'],
    image: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'project6',
    title: 'Fusce Commodo',
    description: 'Fusce commodo aliquam arcu. Nam commodo suscipit quam. Vestibulum ullamcorper mauris.',
    tags: ['Fusce', 'Commodo', 'Aliquam'],
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'project7',
    title: 'Praesent Egestas',
    description: 'Praesent egestas neque eu enim. In hac habitasse platea dictumst. Maecenas tempus.',
    tags: ['Praesent', 'Egestas', 'Neque'],
    image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
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
        <div ref={projectsRef} className="space-y-5 max-h-[400px] invisible-scroll pb-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative"
            >
              <div className="aspect-video overflow-hidden rounded-sm h-24 mb-2">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <h3 className="text-xs font-medium">{project.title}</h3>
              <p className="mt-1 text-muted-foreground text-[10px]">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
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
