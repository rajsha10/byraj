import { Github, Linkedin } from "lucide-react";

const XTwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-card border-t border-border py-12 px-6 mx-auto mt-20 overflow-hidden w-full md:w-[90%] lg:w-[60%]">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--color-foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted/20" />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo/Brand */}
          <div className="text-2xl font-bold text-foreground">
            <span className="text-primary">&lt;</span>
            Raj
            <span className="text-primary">/&gt;</span>
          </div>
          
          {/* Copyright */}
          <div className="text-muted-foreground text-sm font-medium">
            © 2025. Crafted with passion and code by RajSharma
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/rajsha10"
              className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/raj-sharma-web/"
              className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/raj_sharma190"
              className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-secondary hover:bg-secondary/10 transition-all duration-300 hover:scale-110"
              aria-label="Twitter/X"
            >
              <XTwitterIcon />
            </a>
          </div>
        </div>
        
        {/* Decorative separator */}
        <div className="mt-2 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />
            
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
              
              {/* Main circle */}
              <div className="relative w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25" />
              
              {/* Inner highlight */}
              <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-primary-foreground/60" />
            </div>
            
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
          </div>
        </div>
        
        {/* Bottom tagline */}
        <div className="mt-6 text-center">
          <div className="text-muted-foreground text-xs tracking-wider">
            Always learning. Always building.
          </div>
        </div>
      </div>
    </footer>
  );
}