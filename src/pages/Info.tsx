
import { useRef } from 'react';

const Info = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="space-y-4">
      <div ref={contentRef} className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
        </p>
        
        <p className="text-xs text-muted-foreground">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
        </p>
        
        <p className="text-xs text-muted-foreground">
          Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        </p>
        
        <div className="pt-2">
          <h3 className="text-xs font-medium mb-2 text-foreground">Lorem Ipsum</h3>
          <div className="flex flex-wrap gap-1">
            {['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Nulla'].map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground rounded-full text-[10px]">
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
