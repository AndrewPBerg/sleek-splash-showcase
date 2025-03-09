
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Layout from "./components/Layout";
import Info from "./pages/Info";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/useTheme";

const queryClient = new QueryClient();

const App = () => {
  const [showingSplash, setShowingSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowingSplash(false);
  };

  // Add GSAP to the global window object for debugging
  useEffect(() => {
    import('gsap').then((gsap) => {
      (window as any).gsap = gsap.default;
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showingSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/info" replace />} />
                  <Route path="info" element={<Info />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="contact" element={<Contact />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
