import { useEffect, useRef } from "react";

export const CyberGridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gridSize = 60;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw perspective grid
      ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
      ctx.lineWidth = 1.5;

      for (let i = -10; i < 11; i++) {
        // Horizontal lines
        ctx.beginPath();
        const topY = centerY + i * gridSize + Math.sin(time * 0.005 + i * 0.5) * 10;
        const bottomY = centerY + i * gridSize + Math.sin(time * 0.005 + i * 0.5) * 10;
        
        ctx.moveTo(0, topY);
        ctx.lineTo(canvas.width, bottomY);
        ctx.stroke();

        // Vertical lines
        ctx.beginPath();
        const leftX = centerX + i * gridSize;
        const rightX = centerX + i * gridSize;
        
        ctx.moveTo(leftX, 0);
        ctx.lineTo(rightX, canvas.height);
        ctx.stroke();
      }

      // Draw neon circles at intersections
      ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
      for (let i = -5; i < 6; i++) {
        for (let j = -5; j < 6; j++) {
          const x = centerX + i * gridSize;
          const y = centerY + j * gridSize + Math.sin(time * 0.005 + i * 0.5 + j * 0.3) * 15;
          
          const pulse = Math.sin(time * 0.01 + i + j) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 2 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw glow lines
      ctx.strokeStyle = "rgba(249, 115, 22, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 200, centerY);
      ctx.lineTo(centerX + 200, centerY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 150);
      ctx.lineTo(centerX, centerY + 150);
      ctx.stroke();

      // Scan line effect
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      const scanY = (time * 3) % canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
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
