
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (!headingRef.current || !contentRef.current || !formRef.current) return;
    
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
    ).fromTo(
      formRef.current.elements,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      '-=0.5'
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="section-title">Get in touch</div>
      <h1 ref={headingRef} className="section-heading mb-6">
        Contact Me
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div ref={contentRef}>
          <p className="text-lg mb-6">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <Mail className="w-5 h-5 mt-1 mr-3 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <a href="mailto:hello@example.com" className="hover:text-primary transition-colors">
                  hello@example.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mt-1 mr-3 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div>San Francisco, CA</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <form ref={formRef} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full p-3 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
              placeholder="Your message..."
            />
          </div>
          
          <button
            type="button"
            className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
