import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Mic,
  MicOff,
  Send,
  ArrowLeft,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Star,
  Trophy,
  RotateCcw,
  Home,
} from "lucide-react";
import { INTERVIEW_CATEGORIES, analyzeAnswer } from "../data/interviewQuestions";
import { AnimatedBackground } from "./AnimatedBackground";
import { Sidebar } from "./Sidebar";
import {
  createSession,
  saveMessage,
  getMessages
} from "../../services/interviewApi";

type BotState = "idle" | "thinking" | "speaking";
type ChatState = "greeting" | "asking" | "waiting" | "thinking" | "complete";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
  type: "greeting" | "question" | "answer" | "feedback" | "complete";
  score?: number;
  scoreLabel?: string;
  questionIndex?: number;
}

// ─── Animated Waveform ───────────────────────────────────────────────────────
function Waveform({ isActive }: { isActive: boolean }) {
  const heights = useMemo(
    () => Array.from({ length: 24 }, () => Math.random() * 24 + 6),
    []
  );
  return (
    <div className="flex items-center gap-[2px] h-8">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full w-[3px]"
          style={{
            background: "linear-gradient(to top, #8b5cf6, #06b6d4)",
          }}
          animate={
            isActive
              ? { height: [4, h, 4, h * 0.6, 4] }
              : { height: 4 }
          }
          transition={
            isActive
              ? {
                  repeat: Infinity,
                  duration: 0.5 + (i % 5) * 0.1,
                  delay: i * 0.04,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// ─── Bot Avatar Orb ──────────────────────────────────────────────────────────
function BotOrb({ state }: { state: BotState }) {
  const isThinking = state === "thinking";
  const isSpeaking = state === "speaking";

  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      {/* Outer ring pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.4))",
        }}
        animate={{
          scale: isThinking ? [1, 1.3, 1] : isSpeaking ? [1, 1.15, 1] : [1, 1.08, 1],
          opacity: isThinking ? [0.6, 0.2, 0.6] : [0.4, 0.1, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: isThinking ? 0.7 : 2,
          ease: "easeInOut",
        }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute inset-1.5 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(6,182,212,0.6))",
        }}
        animate={{
          scale: isThinking ? [1, 1.1, 1] : [1, 1.04, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: isThinking ? 0.9 : 2.5,
          delay: 0.15,
          ease: "easeInOut",
        }}
      />
      {/* Inner orb */}
      <div
        className="absolute inset-2.5 rounded-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2)",
        }}
      >
        {/* Shine */}
        <div
          className="absolute top-1 left-2 w-3 h-2 rounded-full bg-white/30"
          style={{ filter: "blur(2px)" }}
        />
        {isThinking && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.5), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Typing Indicator ────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.7,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Score Badge ─────────────────────────────────────────────────────────────
function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color =
    score >= 7
      ? { text: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" }
      : score >= 4
      ? { text: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)" }
      : { text: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" };

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm mt-3"
      style={{
        color: color.text,
        background: color.bg,
        border: `1px solid ${color.border}`,
      }}
    >
      <Star size={12} fill="currentColor" />
      <span style={{ fontWeight: 600 }}>
        {score.toFixed(1)}/10
      </span>
      <span className="opacity-70">· {label}</span>
    </div>
  );
}

// ─── Message Bubble ──────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const [showTip, setShowTip] = useState(false);
  const isBot = message.role === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="flex-shrink-0 mt-1">
          <BotOrb state="idle" />
        </div>
      )}

      <div className={`max-w-[75%] ${!isBot ? "max-w-[80%]" : ""}`}>
        <div
          className="px-5 py-3.5 rounded-2xl"
          style={
            isBot
              ? {
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                }
              : {
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(99,102,241,0.4))",
                  border: "1px solid rgba(139,92,246,0.4)",
                  backdropFilter: "blur(20px)",
                }
          }
        >
          {message.type === "question" && (
            <div
              className="text-xs mb-2 font-medium"
              style={{
                color: "#8b5cf6",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Q{(message.questionIndex ?? 0) + 1} ·{" "}
              <span style={{ color: "rgba(255,255,255,0.4)" }}>
                Interview Question
              </span>
            </div>
          )}

          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{
              color: isBot ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.95)",
            }}
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/`(.*?)`/g, `<code style="background:rgba(139,92,246,0.2);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.85em">$1</code>`),
            }}
          />

          {message.type === "feedback" && message.score !== undefined && (
            <ScoreBadge score={message.score} label={message.scoreLabel ?? ""} />
          )}
        </div>

        {message.type === "feedback" && (
          <button
            onClick={() => setShowTip((v) => !v)}
            className="flex items-center gap-1.5 mt-2 ml-1 text-xs transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)")
            }
          >
            <Lightbulb size={11} />
            Pro tip
            {showTip ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        )}
      </div>

      {!isBot && (
        <div
          className="flex-shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "1px solid rgba(139,92,246,0.5)",
          }}
        >
          👤
        </div>
      )}
    </motion.div>
  );
}

// ─── Completion Screen ───────────────────────────────────────────────────────
function CompletionScreen({
  scores,
  categoryName,
  onRestart,
  onHome,
}: {
  scores: number[];
  categoryName: string;
  onRestart: () => void;
  onHome: () => void;
}) {
  const avg = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;
  const rating =
    avg >= 7 ? "Excellent" : avg >= 5 ? "Good" : "Needs Practice";
  const emoji = avg >= 7 ? "🏆" : avg >= 5 ? "🌟" : "💪";
  const color = avg >= 7 ? "#34d399" : avg >= 5 ? "#fbbf24" : "#f87171";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-full p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-6xl mb-6"
      >
        {emoji}
      </motion.div>

      <h2
        className="text-3xl mb-2 text-white"
        style={{ fontWeight: 800 }}
      >
        Session Complete!
      </h2>
      <p className="text-white/40 mb-8 text-sm">{categoryName} Interview</p>

      {/* Score circle */}
      <div
        className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-8"
        style={{
          background: `${color}15`,
          border: `2px solid ${color}40`,
          boxShadow: `0 0 40px ${color}20`,
        }}
      >
        <span className="text-3xl font-bold" style={{ color }}>
          {avg.toFixed(1)}
        </span>
        <span className="text-white/40 text-xs">/ 10</span>
      </div>

      <div
        className="px-4 py-2 rounded-full text-sm font-medium mb-8"
        style={{
          color,
          background: `${color}15`,
          border: `1px solid ${color}30`,
        }}
      >
        <Trophy size={13} className="inline mr-1.5" />
        {rating}
      </div>

      {/* Per question breakdown */}
      <div className="w-full max-w-sm mb-8">
        <p className="text-white/30 text-xs mb-3 text-left">Question Breakdown</p>
        <div className="flex flex-col gap-2">
          {scores.map((s, i) => {
            const c = s >= 7 ? "#34d399" : s >= 4 ? "#fbbf24" : "#f87171";
            const pct = (s / 10) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="text-xs w-8 flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace" }}
                >
                  Q{i + 1}
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.1 * i + 0.5, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ background: c }}
                  />
                </div>
                <span
                  className="text-xs w-8 text-right flex-shrink-0"
                  style={{ color: c, fontFamily: "'Space Mono', monospace" }}
                >
                  {s.toFixed(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "rgba(139,92,246,0.2)",
            border: "1px solid rgba(139,92,246,0.4)",
            color: "#c4b5fd",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              "rgba(139,92,246,0.3)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              "rgba(139,92,246,0.2)")
          }
        >
          <RotateCcw size={14} />
          Try Again
        </button>
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              "rgba(255,255,255,0.08)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              "rgba(255,255,255,0.05)")
          }
        >
          <Home size={14} />
          All Tracks
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Chat Interface ─────────────────────────────────────────────────────
export function ChatInterface() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const category = INTERVIEW_CATEGORIES.find((c) => c.id === categoryId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>("greeting");
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const [sessionId, setSessionId] = useState<number | null>(null);

  const [botState, setBotState] = useState<BotState>("speaking");
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const questions = category?.questions ?? [];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatState]);

  // Check speech recognition support
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    setSpeechSupported(!!SR);
  }, []);

  // Initialize conversation
  useEffect(() => {
    if (!category) return;

    const startSession = async () => {

      const existingSessionId = localStorage.getItem("sessionId");
      try {

        if (existingSessionId && localStorage.getItem("category") === category.id ) {

          setSessionId(Number(existingSessionId));

          const oldMessages = await getMessages(
            Number(existingSessionId)
          );
            if (oldMessages.length === 0) {

              const greetId = crypto.randomUUID();

              setMessages([
                {
                  id: greetId,
                  role: "bot",
                  content: category.botIntro,
                  type: "greeting",
                },
              ]);

              setTimeout(() => {
                askQuestion(0);
              }, 2200);

              return;
            }

          console.log("OLD MESSAGES :", oldMessages);

          const formattedMessages = oldMessages.map((msg: any) => ({
            id: crypto.randomUUID(),
            role: msg.sender === "USER" ? "user" : "bot",
            content: msg.message,
            type: msg.sender === "USER" ? "answer" : "feedback",
            score: msg.score,
          }));

          setMessages(formattedMessages);
      console.log("FORMATTED :", formattedMessages);

          setChatState("waiting");

        } else {

          const data = await createSession({
            userId: Number(localStorage.getItem("userId")),
            category: category.id,
          });

          console.log("SESSION CREATED :", data);

          setSessionId(data.id);

          localStorage.setItem("sessionId", data.id.toString());
          localStorage.setItem("category", category.id);

          const greetId = crypto.randomUUID();

          setMessages([
            {
              id: greetId,
              role: "bot",
              content: category.botIntro,
              type: "greeting",
            },
          ]);

          setTimeout(() => {
            askQuestion(0);
          }, 2200);
        }

      } catch (error) {
        console.error("SESSION ERROR :", error);
      }
    };

    startSession();

  }, [category]);

  const askQuestion = useCallback(
    (index: number) => {
      if (!category || index >= questions.length) return;
      const q = questions[index];
      setBotState("speaking");
      setChatState("asking");

      const prefix =
        index === 0
          ? "Great! Let's start with the first question:\n\n"
          : index === questions.length - 1
          ? "Last question — give it your best! 🎯\n\n"
          : `Question ${index + 1} of ${questions.length}:\n\n`;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: prefix + q.text,
          type: "question",
          questionIndex: index,
        },
      ]);

      setTimeout(() => setBotState("idle"), 1500);
      setChatState("waiting");
    },
    [category, questions]
  );

  const handleSubmit = useCallback(async () => {
    const answer = inputText.trim();
    if (!answer || chatState !== "waiting") return;

    // Stop recording if active
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: answer,
        type: "answer",
      },
    ]);
    const activeSessionId = sessionId || Number(localStorage.getItem("sessionId"));

    if (activeSessionId) {
console.log("ACTIVE SESSION :", activeSessionId);
      await saveMessage({
        sessionId: activeSessionId,
        sender: "USER",
        message: answer,
      });
    }
    setInputText("");
    setChatState("thinking");
    setBotState("thinking");

    // Simulate AI analysis
    const delay = 1500 + Math.random() * 1000;
    setTimeout(async () => {
      const q = questions[currentQIndex];
      const { score, feedback, scoreLabel } = analyzeAnswer(q, answer);

      setScores((prev) => [...prev, score]);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: feedback,
          type: "feedback",
          score,
          scoreLabel,
        },
      ]);
        const activeSessionId =
          sessionId || Number(localStorage.getItem("sessionId"));

        if (activeSessionId) {
console.log("ACTIVE SESSION :", activeSessionId);
          await saveMessage({
            sessionId: activeSessionId,
            sender: "AI",
            message: feedback,
            score: score,
          });
        }
      setBotState("speaking");

      const nextIndex = currentQIndex + 1;

      if (nextIndex >= questions.length) {
        // Session complete
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "bot",
              content:
                "🎉 **You've completed all questions!** Great work making it through the entire session. Let's review your performance...",
              type: "complete",
            },
          ]);
          setTimeout(() => {
            setSessionComplete(true);
            setBotState("idle");
            setChatState("complete");
          }, 1800);
        }, 1200);
      } else {
        // Ask next question
        setTimeout(() => {
          setCurrentQIndex(nextIndex);
          askQuestion(nextIndex);
        }, 2000);
      }
    }, delay);
  }, [
    inputText,
    chatState,
    isRecording,
    currentQIndex,
    questions,
    askQuestion,
    sessionId
  ]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const startRecording = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputText(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const handleRestart = () => {
    setMessages([]);
    setCurrentQIndex(0);
    setScores([]);
    setSessionComplete(false);
    setChatState("greeting");
    setBotState("speaking");
    setInputText("");

    const greetId = crypto.randomUUID();
    setMessages([
      {
        id: greetId,
        role: "bot",
        content: category!.botIntro,
        type: "greeting",
      },
    ]);
    setTimeout(() => askQuestion(0), 2200);
  };

  if (!category) {
    return (
      <div
        className="min-h-screen bg-[#050508] flex items-center justify-center"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <div className="text-center">
          <p className="text-white/50 mb-4">Interview track not found.</p>
          <button
            onClick={() => navigate("/")}
            className="text-purple-400 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const progress = questions.length
    ? Math.min((currentQIndex / questions.length) * 100, 100)
    : 0;
  const avgScore = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : null;

  return (
    <div
      className="min-h-screen bg-[#050508] flex relative"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <AnimatedBackground />
      <Sidebar />

      <div className="relative z-10 flex flex-col h-screen flex-1">
        {/* ── Header ── */}
        <header
          className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
          style={{
            background: "rgba(5,5,8,0.8)",
            borderColor: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={() => navigate("/")}
            className="p-1.5 rounded-lg transition-all"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.06)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <BotOrb state={botState} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-white truncate"
                style={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                Interview Chatbot
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full hidden sm:inline-flex"
                style={{
                  background: `${category.colorFrom}15`,
                  border: `1px solid ${category.colorFrom}30`,
                  color: category.colorFrom,
                }}
              >
                {category.emoji} {category.shortName}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {botState === "thinking" ? (
                <span className="text-purple-400 text-xs">Analyzing your answer...</span>
              ) : chatState === "waiting" ? (
                <span className="text-emerald-400 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Listening
                </span>
              ) : (
                <span className="text-white/30 text-xs">
                  Q{Math.min(currentQIndex + 1, questions.length)} of{" "}
                  {questions.length}
                </span>
              )}
            </div>
          </div>

          {/* Score + Progress */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {avgScore !== null && (
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Star size={12} className="text-amber-400" fill="currentColor" />
                <span className="text-white/70" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {avgScore.toFixed(1)}
                </span>
              </div>
            )}
            {/* Mini progress bar */}
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-white/30 text-xs">{Math.round(progress)}%</span>
              <div
                className="w-20 h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${category.colorFrom}, ${category.colorTo})`,
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-5">
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>

            {/* Thinking indicator */}
            {chatState === "thinking" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <BotOrb state="thinking" />
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <TypingIndicator />
                </div>
              </motion.div>
            )}

            {/* Completion overlay */}
            {sessionComplete && (
              <CompletionScreen
                scores={scores}
                categoryName={category.name}
                onRestart={handleRestart}
                onHome={() => navigate("/")}
              />
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ── Input Area ── */}
        {!sessionComplete && (
          <div
            className="flex-shrink-0 px-4 py-4 border-t"
            style={{
              background: "rgba(5,5,8,0.85)",
              borderColor: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="max-w-3xl mx-auto">
              {/* Recording indicator */}
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between mb-3 px-4 py-2.5 rounded-xl"
                    style={{
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.3)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-white/60 text-xs">Recording...</span>
                    </div>
                    <Waveform isActive={true} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input row */}
              <div
                className="flex items-end gap-2 rounded-2xl p-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    isRecording
                      ? "rgba(139,92,246,0.5)"
                      : chatState === "waiting"
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.07)"
                  }`,
                  transition: "border-color 0.3s",
                }}
              >
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    chatState === "waiting"
                      ? "Type your answer or use the mic..."
                      : chatState === "thinking"
                      ? "Analyzing your answer..."
                      : "Waiting for question..."
                  }
                  disabled={chatState !== "waiting"}
                  className="flex-1 bg-transparent resize-none outline-none text-sm px-2 py-1.5 max-h-32"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1.6,
                  }}
                />

                <div className="flex items-center gap-1.5 flex-shrink-0 pb-0.5">
                  {/* Mic button */}
                  {speechSupported && (
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={chatState !== "waiting"}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                      style={
                        isRecording
                          ? {
                              background: "rgba(239,68,68,0.2)",
                              border: "1px solid rgba(239,68,68,0.5)",
                              color: "#f87171",
                            }
                          : {
                              background: "rgba(139,92,246,0.15)",
                              border: "1px solid rgba(139,92,246,0.3)",
                              color: "#a78bfa",
                            }
                      }
                    >
                      {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                    </motion.button>
                  )}

                  {/* Send button */}
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={handleSubmit}
                    disabled={!inputText.trim() || chatState !== "waiting"}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                    style={{
                      background:
                        inputText.trim() && chatState === "waiting"
                          ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
                          : "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                  >
                    <Send size={14} />
                  </motion.button>
                </div>
              </div>

              {/* Helper text */}
              <p className="text-center text-xs mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
                {speechSupported
                  ? "Press Enter to submit · Shift+Enter for new line · Mic for voice input"
                  : "Press Enter to submit · Shift+Enter for new line"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
