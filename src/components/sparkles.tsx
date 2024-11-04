import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export function Sparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#22d3ee", "#67e8f9", "#a5f3fc", "#ecfeff"];
    const interval = setInterval(() => {
      setParticles((current) => {
        const newParticles = current.filter((p) => p.id > Date.now() - 1000);
        if (current.length < 20) {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          newParticles.push({
            id: Date.now(),
            x,
            y,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        return newParticles;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 1,
            x: particle.x,
            y: particle.y,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            y: particle.y - 100,
            x: particle.x + (Math.random() * 100 - 50),
            scale: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: "50%",
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}
