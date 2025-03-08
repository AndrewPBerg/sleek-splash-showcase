
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Section from './Section';
import NavIndicator from './NavIndicator';
import { Info, Briefcase, Phone } from 'lucide-react';

const sections = [
  { id: 'info', title: 'Info', icon: Info },
  { id: 'projects', title: 'Projects', icon: Briefcase },
  { id: 'contact', title: 'Contact', icon: Phone },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('info');
  
  // Update active section based on current route
  useEffect(() => {
    const path = location.pathname.slice(1) || 'info';
    setActiveSection(path);
  }, [location]);
  
  const handleSectionChange = (id: string) => {
    navigate(`/${id}`);
    setActiveSection(id);
  };
  
  return (
    <div className="h-full flex flex-col">
      <NavIndicator 
        sections={sections} 
        activeId={activeSection} 
        onChange={handleSectionChange} 
      />
      
      <div className="flex flex-col h-full">
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            active={section.id === activeSection}
            onClick={() => handleSectionChange(section.id)}
          >
            <Outlet />
          </Section>
        ))}
      </div>
    </div>
  );
};

export default Layout;
