import { useEffect, useRef } from "react";
import * as THREE from "three";

export const StarBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create animated particles
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      velocities[i * 3] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    particlesRef.current = particleSystem;
    scene.add(particleSystem);

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      linePositions[i * 3] = positions[i * 3];
      linePositions[i * 3 + 1] = positions[i * 3 + 1];
      linePositions[i * 3 + 2] = positions[i * 3 + 2];
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.2,
      linewidth: 1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    linesRef.current = lines;
    scene.add(lines);

    // Add gradient glow orbs
    const orbCount = 3;
    const orbs = [];
    const orbColors = [0x8b5cf6, 0x06b6d4, 0xf97316];

    for (let i = 0; i < orbCount; i++) {
      const geometry = new THREE.IcosahedronGeometry(15, 4);
      const material = new THREE.MeshPhongMaterial({
        color: orbColors[i],
        emissive: orbColors[i],
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      const orb = new THREE.Mesh(geometry, material);

      orb.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150
      );

      orb.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        ),
      };

      scene.add(orb);
      orbs.push(orb);
    }

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update particle positions
      const positionAttribute = particleSystem.geometry.getAttribute("position");
      const velocityAttribute = particleSystem.geometry.getAttribute("velocity");
      const positions = positionAttribute.array;
      const velocities = velocityAttribute.array;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Bounce particles
        if (Math.abs(positions[i * 3]) > 100) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 100) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 100) velocities[i * 3 + 2] *= -1;
      }

      positionAttribute.needsUpdate = true;

      // Update lines
      const linePositionAttribute = lines.geometry.getAttribute("position");
      for (let i = 0; i < particleCount; i++) {
        linePositionAttribute.array[i * 3] = positions[i * 3];
        linePositionAttribute.array[i * 3 + 1] = positions[i * 3 + 1];
        linePositionAttribute.array[i * 3 + 2] = positions[i * 3 + 2];
      }
      linePositionAttribute.needsUpdate = true;

      // Update orbs
      orbs.forEach((orb) => {
        orb.position.add(orb.userData.velocity);
        orb.rotation.x += 0.002;
        orb.rotation.y += 0.003;

        // Bounce orbs
        if (Math.abs(orb.position.x) > 100)
          orb.userData.velocity.x *= -1;
        if (Math.abs(orb.position.y) > 100)
          orb.userData.velocity.y *= -1;
        if (Math.abs(orb.position.z) > 100)
          orb.userData.velocity.z *= -1;
      });

      // Rotate scene slowly
      scene.rotation.x += 0.0001;
      scene.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      particles.dispose();
      lineGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};
