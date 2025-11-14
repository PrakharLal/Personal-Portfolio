import { useEffect, useRef } from "react";

export const BioNeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 60;
    let time = 0;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 1.5,
        wave: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Update nodes with wave motion
      nodes.forEach((node, index) => {
        const waveX = Math.sin(time + index * 0.1) * 30;
        const waveY = Math.cos(time * 0.7 + index * 0.1) * 30;

        node.x = node.baseX + waveX + node.vx * 20;
        node.y = node.baseY + waveY + node.vy * 20;

        // Keep within bounds
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw bio-inspired node
        const pulse = Math.sin(time * 3 + index) * 0.5 + 0.5;
        const hue = (150 + index * 5) % 360;

        // Outer glow - organic
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${0.2 * pulse})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Middle glow
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${0.4 * pulse})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, 1)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw organic connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = (1 - distance / 180) * 0.5;
            const hue = (150 + i * 5 + j * 3) % 360;

            ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacity})`;
            ctx.lineWidth = 1.5 + (1 - distance / 180) * 1.5;
            ctx.globalAlpha = opacity;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);

            // Curved line for organic feel
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const offsetX = Math.sin(time + i + j) * 10;
            const offsetY = Math.cos(time + i + j) * 10;

            ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, nodes[j].x, nodes[j].y);
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
