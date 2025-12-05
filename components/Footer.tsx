import { Github, Linkedin } from "lucide-react";

const XTwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative mx-auto overflow-hidden w-full md:w-[90%] lg:w-[65%] mt-20 mb-8">
      {/* Main container with glassmorphism */}
      <div className="relative rounded-2xl bg-card/40 dark:bg-card/60 backdrop-blur-md border border-border/50 dark:border-primary/20 p-8 md:p-10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

        <div className="relative">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Logo/Brand */}
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              <span className="text-primary">&lt;</span>
              Raj
              <span className="text-primary">/&gt;</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://github.com/rajsha10"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/raj-sharma-web/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/raj_sharma190"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-110"
                aria-label="Twitter/X"
              >
                <XTwitterIcon />
              </a>
            </div>
          </div>

          {/* Decorative separator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />

              <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />

                {/* Main circle */}
                <div className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/30" />
              </div>

              <div className="h-px w-20 bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
            </div>
          </div>

          {/* Bottom section */}
          <div className="text-center space-y-3">
            <div className="text-muted-foreground text-sm font-medium">
              © 2025. Crafted with passion and code by RajSharma
            </div>
            <div className="text-muted-foreground/70 text-xs tracking-wider uppercase">
              Always learning. Always building.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}