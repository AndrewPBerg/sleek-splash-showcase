
import { useRef } from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="space-y-4">
      <div ref={contentRef}>
        <p className="text-xs text-muted-foreground mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia.
        </p>
        
        <p className="text-xs text-muted-foreground mb-4">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <Mail className="w-3 h-3 mt-0.5 mr-2 text-muted-foreground" />
            <div>
              <div className="text-[10px] text-muted-foreground">Email</div>
              <a href="mailto:lorem@ipsum.com" className="text-xs hover:text-primary transition-colors">
                lorem@ipsum.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin className="w-3 h-3 mt-0.5 mr-2 text-muted-foreground" />
            <div>
              <div className="text-[10px] text-muted-foreground">Location</div>
              <div className="text-xs">Lorem Ipsum, Dolor</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <a 
            href="#" 
            className="flex items-center justify-center w-6 h-6 rounded-full hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-3 h-3" />
          </a>
          
          <a 
            href="#" 
            className="flex items-center justify-center w-6 h-6 rounded-full hover:text-primary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-3 h-3" />
          </a>
          
          <a 
            href="#" 
            className="flex items-center justify-center w-6 h-6 rounded-full hover:text-primary transition-colors"
            aria-label="Twitter Profile"
          >
            <Twitter className="w-3 h-3" />
          </a>
        </div>
        
        <p className="text-xs text-muted-foreground mb-4">
          Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        </p>
        
        <p className="text-xs text-muted-foreground">
          Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
        </p>
      </div>
    </div>
  );
};

export default Contact;
