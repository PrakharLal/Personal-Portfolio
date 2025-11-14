import { useEffect, useRef } from "react";

export const SynapseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 70;
    let time = 0;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        activation: 0,
        layer: Math.floor(i / (nodeCount / 4)),
      });
    }

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      // Update nodes
      nodes.forEach((node, index) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Simulate activation
        node.activation = Math.max(0, node.activation - 0.02);

        // Draw synaptic vesicles (small dots)
        for (let v = 0; v < 3; v++) {
          const angle = (time + v * Math.PI * 2 / 3) * 2;
          const distance = node.radius * 3;
          const vx = node.x + Math.cos(angle) * distance;
          const vy = node.y + Math.sin(angle) * distance;

          ctx.fillStyle = "rgba(139, 92, 246, 0.4)";
          ctx.beginPath();
          ctx.arc(vx, vy, 1, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw neuron body
        const activation = node.activation * 0.5 + 0.5;
        const hue = 250 + node.layer * 20;

        // Soma (cell body) glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 5);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${0.3 * activation})`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Soma core
        ctx.fillStyle = `hsl(${hue}, 100%, ${50 + activation * 10}%)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Nucleus
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw synaptic connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.5;

            // Presynaptic terminal to postsynaptic
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;

            // Synaptic cleft
            const hue = (250 + nodes[i].layer * 20 + nodes[j].layer * 20) / 2;
            ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacity})`;
            ctx.lineWidth = 1 + (1 - distance / 200) * 2;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Neurotransmitter particles
            if (Math.random() < 0.1) {
              const t = Math.random();
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t;

              ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${opacity * 0.7})`;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }

            // Activate connected nodes
            nodes[i].activation = Math.max(nodes[i].activation, 0.3);
            nodes[j].activation = Math.max(nodes[j].activation, 0.3);
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
