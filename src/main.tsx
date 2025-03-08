
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

// Register SplitText plugin
gsap.registerPlugin(SplitText)

createRoot(document.getElementById("root")!).render(<App />);
