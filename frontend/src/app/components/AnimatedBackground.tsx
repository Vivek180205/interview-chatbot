import { motion } from "motion/react";

const ORBS = [
  { color: "#8b5cf6", left: "5%", top: "15%", size: 550, duration: 14, delay: 0 },
  { color: "#06b6d4", right: "5%", top: "45%", size: 450, duration: 18, delay: 3 },
  { color: "#ec4899", left: "45%", bottom: "5%", size: 380, duration: 16, delay: 6 },
  { color: "#3b82f6", right: "25%", top: "5%", size: 320, duration: 12, delay: 1 },
];

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            right: orb.right,
            top: orb.top,
            bottom: orb.bottom,
            background: orb.color,
            filter: "blur(110px)",
            opacity: 0.1,
          }}
          animate={{
            x: [0, 40, -25, 15, 0],
            y: [0, -30, 25, -15, 0],
            scale: [1, 1.06, 0.96, 1.03, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Noise grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,8,0.6) 100%)",
        }}
      />
    </div>
  );
}
