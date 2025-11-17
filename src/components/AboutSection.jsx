import { Briefcase, Code, User, Zap } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about crafting beautiful, functional digital experiences with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                <span className="text-gradient">Passionate Developer</span> & Creative Problem Solver
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With over 5 years of experience in web development, I specialize
                in creating responsive, accessible, and performant web
                applications using modern technologies and best practices.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm passionate about creating elegant solutions to complex
                problems, and I'm constantly learning new technologies and
                techniques to stay at the forefront of the ever-evolving web
                landscape.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Full-Stack Development</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">UI/UX Design & Implementation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Performance Optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Modern Development Practices</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href=""
                className="px-6 py-3 rounded-full border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 font-medium backdrop-blur-sm"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Photo placeholder with enhanced styling */}
            <div className="photo-ring w-64 h-64 md:w-72 md:h-72">
              <div className="photo-inner">
                <img src="/projects/pfp.jpg" alt="Prakhar Lal" className="profile-img" />
              </div>
            </div>

            {/* Skills cards with animated gradient borders */}
            <div className="w-full grid grid-cols-1 gap-4">
              <div className="animated-gradient-border p-5 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">Web Development</h4>
                    <p className="text-sm text-muted-foreground">
                      React, Next.js, Tailwind CSS
                    </p>
                  </div>
                </div>
              </div>
              <div className="animated-gradient-border p-5 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <User className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">UI/UX Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Figma, Prototyping, User Research
                    </p>
                  </div>
                </div>
              </div>
              <div className="animated-gradient-border p-5 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20">
                    <Zap className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimization, Core Web Vitals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
