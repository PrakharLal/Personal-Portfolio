import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const TypingEffect = ({ phrases = [], speed = 80, pause = 1200, deleteSpeed = 40 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentPhrase = phrases[phraseIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // typing
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        } else {
          // finished typing, start deleting after pause
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // finished deleting, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % phrases.length);
        }
      }
    };

    timeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex, phrases, speed, pause, deleteSpeed]);

  return (
    <span>
      {displayedText}
      <span className="typing-cursor">|</span>
    </span>
  );
};

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center px-4 overflow-hidden pt-20"
    >
      {/* Premium animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float -z-10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse-subtle -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse-subtle" style={{ animationDelay: "1s" }}></div>

      {/* Gradient line decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

      <div className="container max-w-6xl mx-auto text-center z-10 flex-grow flex flex-col justify-center">
        <div className="space-y-8">
          {/* Badge */}
          {/* <div className="flex justify-center opacity-0 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Welcome to my portfolio</span>
            </div>
          </div> */}

          {/* Main heading */}
          <div className="space-y-4 mt-39 opacity-0 animate-fade-in-delay-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="">Hi, I'm </span>
              <span className=" text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400">
                 Prakhar Lal
              </span>
            </h1>
          </div>

          {/* Typing effect box */}
          <div className="opacity-0 animate-fade-in-delay-2 flex justify-center">
            <div className="px-8 py-6 rounded-2xl border-2 border-dashed border-primary/50 bg-transparent backdrop-blur-sm">
              <h2 className="text-xl md:text-3xl font-bold">
                <span className="text-gradient">
                  <TypingEffect 
                    phrases={["I'm a Web Developer...", "I'm a Data Scientist...", "I'm a UI/UX Designer..."]} 
                    speed={80} 
                    pause={1200} 
                    deleteSpeed={40} 
                  />
                </span>
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-delay-3">
            Crafting exceptional digital experiences by combining innovative design with cutting-edge technology. 
            Let's transform your vision into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 opacity-0 animate-fade-in-delay-4">
            <a 
              href="#projects" 
              className="cosmic-button text-base font-semibold"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 font-semibold backdrop-blur-sm"
            >
              Let's Talk
            </a>
          </div>

          {/* Stats or highlights */}
          <div className="grid grid-cols-3 gap-8 pt-12 animate-fade-in-delay-5">
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-purple-800">5+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-purple-800">50+</p>
              <p className="text-sm text-muted-foreground">Projects Done</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-purple-800">100%</p>
              <p className="text-sm text-muted-foreground">Client Satisfied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
};