
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
  {
    id: 'project1',
    title: 'Immersive Portfolio',
    description: 'An interactive 3D portfolio website built with Three.js and React',
    tags: ['React', 'Three.js', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'project2',
    title: 'E-Commerce Platform',
    description: 'A minimal e-commerce solution with custom animations and microinteractions',
    tags: ['Next.js', 'Framer Motion', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'project3',
    title: 'Interactive Data Visualization',
    description: 'Transforming complex data into beautiful, interactive visualizations',
    tags: ['D3.js', 'SVG', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1603466182843-70e9b29295f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8fDA%3D'
  }
];

const Projects = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headingRef.current || !projectsRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      headingRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    ).fromTo(
      projectsRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div>
      <div className="section-title">Work</div>
      <h1 ref={headingRef} className="section-heading mb-8">
        Selected Projects
      </h1>
      
      <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-medium">{project.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
