import { useEffect, useRef } from "react";

export const DataStreamBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const streams = [];
    const streamCount = 15;

    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: 0,
        speed: Math.random() * 2 + 1,
        width: Math.random() * 2 + 1,
        characters: "01",
        charSize: Math.random() * 4 + 8,
        offset: 0,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streams.forEach((stream) => {
        stream.offset += stream.speed;

        if (stream.offset > canvas.height + 100) {
          stream.offset = -100;
          stream.x = Math.random() * canvas.width;
          stream.charSize = Math.random() * 4 + 8;
        }

        ctx.font = `${stream.charSize}px 'Courier New', monospace`;
        ctx.fillStyle = "rgba(139, 92, 246, 0.8)";

        const char = stream.characters[Math.floor(Math.random() * 2)];
        ctx.fillText(char, stream.x, stream.offset);

        // Glow effect
        ctx.fillStyle = "rgba(6, 182, 212, 0.3)";
        ctx.fillText(char, stream.x - 1, stream.offset);
        ctx.fillText(char, stream.x + 1, stream.offset);
      });

      // Draw floating data nodes
      ctx.fillStyle = "rgba(249, 115, 22, 0.6)";
      for (let i = 0; i < 10; i++) {
        const x = (Math.sin(performance.now() * 0.0001 + i) * canvas.width) / 2 + canvas.width / 2;
        const y = (Math.cos(performance.now() * 0.00008 + i) * canvas.height) / 2 + canvas.height / 2;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

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
