import { useEffect, useRef } from "react";

export const AdvancedNeuralNetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 80;
    const connectionDistance = 200;

    // Initialize nodes with more properties
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1,
        originalRadius: Math.random() * 3 + 1,
        color: ["#8b5cf6", "#06b6d4", "#f97316"][Math.floor(Math.random() * 3)],
        intensity: Math.random(),
      });
    }

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, index) => {
        node.x += node.vx;
        node.y += node.vy;
        node.intensity = Math.sin(Date.now() * 0.001 + index) * 0.5 + 0.5;

        // Bounce off walls with damping
        if (node.x < node.radius || node.x > canvas.width - node.radius) {
          node.vx *= -0.95;
          node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x));
        }
        if (node.y < node.radius || node.y > canvas.height - node.radius) {
          node.vy *= -0.95;
          node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y));
        }

        // Add slight acceleration for natural movement
        node.vx *= 0.999;
        node.vy *= 0.999;

        // Draw node core - reduced opacity
        const pulseRadius = node.originalRadius + node.intensity * 2;
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.35 + node.intensity * 0.15;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw node glow - much softer
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          pulseRadius * 6
        );
        gradient.addColorStop(0, `${node.color}15`);
        gradient.addColorStop(1, `${node.color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      });

      // Draw connections with gradient - reduced opacity
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.25;

            // Create gradient line
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, `${nodes[i].color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${nodes[j].color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8 + (1 - distance / connectionDistance) * 1.2;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
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
