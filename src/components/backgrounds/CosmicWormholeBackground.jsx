import { useEffect, useRef } from "react";

export const CosmicWormholeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height);

      // Draw rotating spirals
      for (let spiral = 0; spiral < 3; spiral++) {
        ctx.strokeStyle = `hsl(${260 + spiral * 60}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;

        ctx.beginPath();
        for (let i = 0; i < 1000; i++) {
          const angle = (i * 0.05 + time * 0.02 + spiral * Math.PI * 2 / 3) * Math.PI / 180;
          const radius = (i * 0.2 + time * 0.5) % (maxRadius * 0.8);
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Draw orbiting particles
      for (let i = 0; i < 30; i++) {
        const angle = (time * 0.01 + i * Math.PI * 2 / 30) * Math.PI / 180;
        const radius = 100 + Math.sin(time * 0.005 + i) * 50;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const size = 2 + Math.sin(time * 0.01 + i) * 1.5;
        ctx.fillStyle = `hsl(${180 + i * 12}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Particle glow
        ctx.fillStyle = `hsla(${180 + i * 12}, 100%, 60%, 0.3)`;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.3)");
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(centerX - 200, centerY - 200, 400, 400);

      time++;
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: "block" }}
    />
  );
};
