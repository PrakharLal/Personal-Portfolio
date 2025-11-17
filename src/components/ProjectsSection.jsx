import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Bsides Dehradun",
    description: "A conference website for Bsides Dehradun 2025, built with modern web technologies.",
    image: "/projects/project1.png",
    tags: ["NextJS", "TailwindCSS", "Supabase"],
    demoUrl: "https://www.bsidesdehradun.com/",
    githubUrl: "https://github.com/PrakharLal",
  },
  {
    id: 2,
    title: "HabitKarma",
    description:
      "A habit-tracking app that helps users build and maintain positive habits through gamification.",
    image: "/projects/project2.png",
    tags: ["TypeScript", "Firebase", "Next.js"],
    demoUrl: "https://habit-karma-score.vercel.app",
    githubUrl: "https://github.com/PrakharLal/habit-karma-score",
  },
  {
    id: 3,
    title: "FasalGPT",
    description:
      "An AI based crop health and disease prediction platform for farmers",
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://github.com/PrakharLal/FasalGPT",
    githubUrl: "https://github.com/PrakharLal/FasalGPT",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions with attention to detail, performance, and exceptional user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group relative h-full rounded-2xl overflow-hidden border border-primary/20 bg-secondary/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex space-x-3 pt-4 border-t border-primary/10">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    className="flex-1 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <ExternalLink size={16} /> Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="flex-1 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Github size={16} /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/PrakharLal"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
