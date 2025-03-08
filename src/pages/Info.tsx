
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Info = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headingRef.current || !contentRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      headingRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    ).fromTo(
      contentRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="section-title">About</div>
      <h1 ref={headingRef} className="section-heading mb-6">
        Information
      </h1>
      
      <div ref={contentRef} className="space-y-6">
        <p className="text-lg text-balance">
          I'm a creative developer passionate about building exceptional digital experiences that live at the intersection of design and technology.
        </p>
        
        <p>
          With a focus on clean, efficient code and thoughtful user interfaces, I create solutions that are both beautiful and functional. My approach combines technical expertise with creative vision to deliver projects that exceed expectations.
        </p>
        
        <p>
          When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or seeking inspiration in design, art, and nature.
        </p>
        
        <div className="pt-4">
          <h3 className="text-lg font-medium mb-3">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Next.js', 'GSAP', 'Node.js', 'CSS/SCSS', 'UI/UX Design', 'WebGL', 'Three.js'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
