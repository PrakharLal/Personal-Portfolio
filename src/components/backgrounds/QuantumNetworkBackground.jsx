import { useEffect, useRef } from "react";

export const QuantumNetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        mass: Math.random() * 2 + 1,
        charge: Math.random() > 0.5 ? 1 : -1,
        trail: [],
        maxTrailLength: Math.floor(Math.random() * 15 + 5),
      });
    }

    let animationFrameId;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time++;

      // Apply forces and update particles
      particles.forEach((particle, i) => {
        // Attractive/repulsive forces from center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 100) {
          const force = 0.0001 * particle.charge;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }

        // Coulomb-like repulsion between particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx2 = other.x - particle.x;
          const dy2 = other.y - particle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 150 && distance2 > 5) {
            const force = (particle.charge * other.charge * 0.02) / (distance2 * distance2);
            particle.vx -= (dx2 / distance2) * force;
            particle.vy -= (dy2 / distance2) * force;
          }
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > particle.maxTrailLength) {
          particle.trail.shift();
        }

        // Draw trail
        ctx.strokeStyle = particle.charge > 0 ? "rgba(139, 92, 246, 0.3)" : "rgba(6, 182, 212, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (particle.trail.length > 0) {
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          for (let t = 1; t < particle.trail.length; t++) {
            ctx.lineTo(particle.trail[t].x, particle.trail[t].y);
          }
          ctx.stroke();
        }

        // Draw particle
        const hue = particle.charge > 0 ? 270 : 180;
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.mass, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle glow
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.mass * 4
        );
        glowGradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`);
        glowGradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.mass * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.4;
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );

            const color1 = particles[i].charge > 0 ? "rgba(139, 92, 246" : "rgba(6, 182, 212";
            const color2 = particles[j].charge > 0 ? "rgba(139, 92, 246" : "rgba(6, 182, 212";

            gradient.addColorStop(0, `${color1}, ${opacity})`);
            gradient.addColorStop(1, `${color2}, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: "block" }}
    />
  );
};
