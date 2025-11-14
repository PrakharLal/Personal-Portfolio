import { useEffect, useState } from "react";

export const GradientOrbsBackground = () => {
  const [floatingOrbs, setFloatingOrbs] = useState([]);

  useEffect(() => {
    generateOrbs();

    const handleResize = () => {
      generateOrbs();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateOrbs = () => {
    const numberOfOrbs = 6;
    const newOrbs = [];
    const colors = [
      "from-purple-600 to-blue-600",
      "from-cyan-600 to-purple-600",
      "from-pink-600 to-cyan-600",
      "from-orange-600 to-purple-600",
      "from-blue-600 to-pink-600",
      "from-purple-600 to-cyan-600",
    ];

    for (let i = 0; i < numberOfOrbs; i++) {
      newOrbs.push({
        id: i,
        size: Math.random() * 200 + 100,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 10,
        color: colors[i % colors.length],
      });
    }

    setFloatingOrbs(newOrbs);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-background">
      {floatingOrbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full blur-3xl opacity-30 mix-blend-screen animate-blob bg-gradient-to-r ${orb.color}`}
          style={{
            width: orb.size + "px",
            height: orb.size + "px",
            left: orb.x + "%",
            top: orb.y + "%",
            animation: `blob ${orb.duration}s infinite`,
            animationDelay: orb.delay + "s",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(139, 92, 246, 0.1), transparent 70%)",
        }}
      />
    </div>
  );
};
