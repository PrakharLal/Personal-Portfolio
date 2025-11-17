import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { StarBackground } from "./StarBackground";
import { GradientOrbsBackground } from "./backgrounds/GradientOrbsBackground";
import { MatrixRainBackground } from "./backgrounds/MatrixRainBackground";

import { DotsGridBackground } from "./backgrounds/DotsGridBackground";
import { HolographicBackground } from "./backgrounds/HolographicBackground";
import { NeuralNetworkBackground } from "./backgrounds/NeuralNetworkBackground";
import { CyberGridBackground } from "./backgrounds/CyberGridBackground";
import { CosmicWormholeBackground } from "./backgrounds/CosmicWormholeBackground";
import { DataStreamBackground } from "./backgrounds/DataStreamBackground";
import { AdvancedNeuralNetworkBackground } from "./backgrounds/AdvancedNeuralNetworkBackground";
import { BioNeuralBackground } from "./backgrounds/BioNeuralBackground";
import { QuantumNetworkBackground } from "./backgrounds/QuantumNetworkBackground";
import { SynapseBackground } from "./backgrounds/SynapseBackground";

const BACKGROUND_OPTIONS = [
  { id: "threejs", label: "3D Particles", Component: StarBackground },
  { id: "gradient-orbs", label: "Gradient Orbs", Component: GradientOrbsBackground },
  { id: "matrix-rain", label: "Matrix Rain", Component: MatrixRainBackground },
  
  { id: "dots-grid", label: "Dots Grid", Component: DotsGridBackground },
  { id: "holographic", label: "Holographic", Component: HolographicBackground },
  { id: "neural-network", label: "Neural Network", Component: NeuralNetworkBackground },
  { id: "advanced-neural", label: "Advanced Neural", Component: AdvancedNeuralNetworkBackground },
  { id: "bio-neural", label: "Bio Neural", Component: BioNeuralBackground },
  { id: "quantum-network", label: "Quantum Network", Component: QuantumNetworkBackground },
  { id: "synapse", label: "Synapse", Component: SynapseBackground },
  { id: "cyber-grid", label: "Cyber Grid", Component: CyberGridBackground },
  { id: "cosmic-wormhole", label: "Cosmic Wormhole", Component: CosmicWormholeBackground },
  { id: "data-stream", label: "Data Stream", Component: DataStreamBackground },
];

export const BackgroundSelector = () => {
  const [selectedBackground, setSelectedBackground] = useState("neural-network");
  const [isOpen, setIsOpen] = useState(false);

  // Auto-switching backgrounds
  const autoSwitchBackgrounds = ["neural-network", "advanced-neural", "quantum-network"];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % autoSwitchBackgrounds.length;
      setSelectedBackground(autoSwitchBackgrounds[currentIndex]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const currentBackground = BACKGROUND_OPTIONS.find(
    (bg) => bg.id === selectedBackground
  );
  const CurrentComponent = currentBackground?.Component;

  return (
    <>
      {/* Background Component */}
      {CurrentComponent && <CurrentComponent />}

      {/* Selector Dropdown */}
      <div className="fixed top-20 right-4 z-40 md:right-8">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md hover:bg-background/70 transition-all duration-300 text-sm font-medium"
          >
            <span className="text-muted-foreground">Background:</span>
            <span className="text-primary">{currentBackground?.label}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 max-h-96 overflow-y-auto bg-background/80 backdrop-blur-md border border-primary/20 rounded-lg shadow-lg">
              <div className="sticky top-0 px-4 py-2 bg-background/90 border-b border-primary/20 text-xs text-muted-foreground">
                Select Background (Auto-switching enabled)
              </div>
              {BACKGROUND_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedBackground(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    selectedBackground === option.id
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "hover:bg-primary/5 text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
