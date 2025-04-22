import { useEffect, useState } from "react";
import "../index.css";

const GlowingBubblesBackground = ({ children }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const createBubbles = () => {
      const bubbleCount = 10;
      const newBubbles = [];
      const edgeBuffer = 15; // Percentage buffer from edges

      for (let i = 0; i < bubbleCount; i++) {
        const angle = Math.floor(Math.random() * 360);
        const size = 40 + Math.random() * 60; // 40-100px
        const maxLeft = 100 - edgeBuffer - (size / window.innerWidth) * 100;
        const maxTop = 100 - edgeBuffer - (size / window.innerHeight) * 100;

        newBubbles.push({
          id: i,
          size,
          left: edgeBuffer + Math.random() * maxLeft,
          top: edgeBuffer + Math.random() * maxTop,
          opacity: 0.1 + Math.random() * 0.15,
          blur: 8 + Math.random() * 12,
          duration: 15 + Math.random() * 20,
          gradient: `conic-gradient(from ${angle}deg, #FF82F7, #4169E1)`,
        });
      }
      setBubbles(newBubbles);
    };

    createBubbles();
    window.addEventListener("resize", createBubbles);
    return () => window.removeEventListener("resize", createBubbles);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Bubbles constrained within edges */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            opacity: bubble.opacity,
            filter: `blur(${bubble.blur}px)`,
            backgroundImage: bubble.gradient,
            animation: `pulse ${bubble.duration}s infinite alternate`,
            transform: "translate(-50%, -50%)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      ))}

      {/* Content Layer */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GlowingBubblesBackground;
