import { useEffect, useRef } from "react";

export const HolographicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw holographic grid
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.lineWidth = 1;

      const gridSize = 50;
      const perspective = 500;

      for (let x = -5; x < 10; x++) {
        for (let y = -5; y < 10; y++) {
          const scale = perspective / (perspective + y * 50 + Math.sin(time * 0.01) * 100);

          const x1 = canvas.width / 2 + x * gridSize * scale;
          const y1 = canvas.height / 2 + y * gridSize * scale;
          const x2 = canvas.width / 2 + (x + 1) * gridSize * scale;
          const y2 = canvas.height / 2 + y * gridSize * scale;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          const x3 = canvas.width / 2 + x * gridSize * scale;
          const y3 = canvas.height / 2 + (y + 1) * gridSize * scale;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x3, y3);
          ctx.stroke();
        }
      }

      // Draw moving particles
      ctx.fillStyle = "rgba(6, 182, 212, 0.6)";
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.001 + i) * canvas.width) / 2 + canvas.width / 2;
        const y = (Math.cos(time * 0.0008 + i * 0.5) * canvas.height) / 2 + canvas.height / 2;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glow lines
      ctx.strokeStyle = "rgba(249, 115, 22, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.quadraticCurveTo(
        canvas.width / 2,
        canvas.height / 2 + Math.sin(time * 0.005) * 100,
        canvas.width,
        canvas.height / 2
      );
      ctx.stroke();

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
