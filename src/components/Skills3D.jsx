import { useState } from "react";

const skillsData = [
  // Frontend
  { name: "React", level: 90, category: "frontend", color: 0x61dafb },
  { name: "Next.js", level: 85, category: "frontend", color: 0x000000 },
  { name: "TypeScript", level: 85, category: "frontend", color: 0x3178c6 },
  { name: "Tailwind", level: 90, category: "frontend", color: 0x06b6d4 },
  { name: "JavaScript", level: 90, category: "frontend", color: 0xf7df1e },

  // Backend
  { name: "Node.js", level: 80, category: "backend", color: 0x68a063 },
  { name: "Express", level: 75, category: "backend", color: 0x000000 },
  { name: "MongoDB", level: 70, category: "backend", color: 0x13aa52 },
  { name: "PostgreSQL", level: 75, category: "backend", color: 0x336791 },
  { name: "GraphQL", level: 65, category: "backend", color: 0xe10098 },

  // Tools & Other
  { name: "Git", level: 90, category: "tools", color: 0xf1502f },
  { name: "Docker", level: 70, category: "tools", color: 0x2496ed },
  { name: "Figma", level: 85, category: "tools", color: 0xf24e1e },
];

export const Skills3D = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = activeCategory === "all" 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  const categories = ["all", "frontend", "backend", "tools"];

  return (
    <section id="skills" className="relative py-20 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive 3D visualization of my technical skills and proficiencies
          </p>
        </div>



        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full capitalize font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-800 to-purple-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary border border-primary/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid - Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group relative p-6 rounded-xl border border-primary/20 bg-secondary/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10" />

              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: `#${skill.color.toString(16).padStart(6, '0')}` }}
                />
              </div>

              {/* Skill bar */}
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: `#${skill.color.toString(16).padStart(6, '0')}`,
                    boxShadow: `0 0 10px #${skill.color.toString(16).padStart(6, '0')}80`,
                  }}
                />
              </div>

              <div className="text-right mt-2 text-sm text-muted-foreground">
                {skill.level}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
