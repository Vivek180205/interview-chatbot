import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mic, Brain, Zap, Trophy, Star } from "lucide-react";
import { INTERVIEW_CATEGORIES } from "../data/interviewQuestions";
import { AnimatedBackground } from "./AnimatedBackground";

const DIFFICULTY_COLORS = {
  Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  Advanced: "text-rose-400 bg-rose-400/10 border-rose-400/30",
};

const STATS = [
  { icon: Brain, label: "AI-Powered Analysis", value: "Real-time" },
  { icon: Mic, label: "Voice Recognition", value: "Smart" },
  { icon: Trophy, label: "Instant Feedback", value: "Detailed" },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#050508] relative overflow-x-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              }}
            >
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-white font-semibold tracking-tight">
              Interview <span className="text-purple-400">Chatbot</span>
            </span>
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-lg font-medium text-sm
            bg-gradient-to-r from-purple-500 to-cyan-500
            text-white hover:opacity-90 transition-all duration-200
            shadow-lg shadow-purple-500/20"
            >
            Sign Up
          </button>

        </header>

        {/* Hero */}
        <section className="text-center px-4 pt-12 pb-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <Star size={13} className="text-amber-400" />
              <span className="text-white/60 text-sm">
                AI-Powered Interview Practice Platform
              </span>
              <Star size={13} className="text-amber-400" />
            </div>

            <h1
              className="mb-6 tracking-tight leading-none"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 800,
                background:
                  "linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #67e8f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ace Every
              <br />
              Interview
            </h1>

            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Practice with an AI interviewer that asks real questions, listens
              to your voice, and gives{" "}
              <span className="text-white/80">instant detailed feedback</span>{" "}
              — just like the real thing.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <stat.icon size={15} className="text-purple-400" />
                  <span className="text-white/40 text-sm">{stat.label}</span>
                  <span className="text-white/80 text-sm font-medium">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Interview Categories */}
        <section className="px-4 pb-24 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-10"
          >
            <h2
              className="text-white/90 mb-2"
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            >
              Choose Your Interview Track
            </h2>
            <p className="text-white/40 text-sm">
              5 questions per session · Voice + text input · Instant AI feedback
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERVIEW_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Gradient border effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${cat.colorFrom}40, ${cat.colorTo}40)`,
                    padding: 1,
                  }}
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 40px ${cat.glowColor}`,
                  }}
                />

                <div
                  className="relative h-full p-6 rounded-2xl border transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    borderColor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Top row: emoji + difficulty */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${cat.colorFrom}25, ${cat.colorTo}25)`,
                        border: `1px solid ${cat.colorFrom}40`,
                      }}
                    >
                      {cat.emoji}
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                        DIFFICULTY_COLORS[cat.difficulty]
                      }`}
                    >
                      {cat.difficulty}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-white mb-1"
                    style={{ fontWeight: 700, fontSize: "1.05rem" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-4 leading-relaxed">
                    {cat.tagline}
                  </p>
                  <p className="text-white/30 text-sm mb-5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">
                      {cat.questions.length} questions
                    </span>
                    <button
                      onClick={() => navigate(`/signup?track=${cat.id}`)}
                      className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 hover:gap-2"
                      style={{
                        color: cat.colorFrom,
                        background: `${cat.colorFrom}15`,
                        border: `1px solid ${cat.colorFrom}30`,
                      }}
                    >
                      Start
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* How it works */}
        <section className="px-4 pb-20 max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 border"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))",
              borderColor: "rgba(139,92,246,0.2)",
            }}
          >
            <h3
              className="text-white text-center mb-8"
              style={{ fontWeight: 700, fontSize: "1.25rem" }}
            >
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Choose Your Track",
                  desc: "Select the interview type that matches your target role.",
                  color: "#8b5cf6",
                },
                {
                  step: "02",
                  title: "Answer Questions",
                  desc: "Respond by voice or text. The AI listens and transcribes in real-time.",
                  color: "#06b6d4",
                },
                {
                  step: "03",
                  title: "Get Feedback",
                  desc: "Receive instant scoring and detailed feedback on your answers.",
                  color: "#ec4899",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold"
                    style={{
                      background: `${item.color}20`,
                      border: `1px solid ${item.color}40`,
                      color: item.color,
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {item.step}
                  </div>
                  <h4
                    className="text-white mb-2"
                    style={{ fontWeight: 600, fontSize: "0.95rem" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
