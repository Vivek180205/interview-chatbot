import {
  Plus,
  Settings,
  LogOut,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function Sidebar() {

  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);
  const fetchSessions = async () => {

    try {

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/interviews/user?userId=${localStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setSessions(response.data);

    } catch (error) {
      console.error("Failed to fetch sessions", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogout = () => {

    sessionStorage.clear();
    localStorage.clear();

    navigate("/login");
  };

  const username = sessionStorage.getItem("username");

  return (
    <div
      className="w-[280px] h-screen border-r flex flex-col"
      style={{
        background: "rgba(5,5,8,0.96)",
        borderColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >

      {/* Logo */}
      <div className="p-5 border-b border-white/10">

        <h1 className="text-white text-xl font-bold">
          Interview Chatbot
        </h1>

        <p className="text-white/30 text-sm mt-1">
          {username || "Interview Assistant"}
        </p>

      </div>

      {/* New Interview */}
      <div className="p-4">

        <button
          onClick={() => {
            localStorage.removeItem("sessionId");
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(6,182,212,0.18))",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "white",
          }}
        >
          <Plus size={18} />
          New Interview
        </button>

      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3">

        <p className="text-white/30 text-xs px-2 mb-3 uppercase tracking-wider">
          Recent Interviews
        </p>

        <div className="space-y-2">

          {sessions.map((session: any) => (

            <button
                key={session.id}
                onClick={() => {

                  localStorage.setItem(
                    "sessionId",
                    session.id.toString()
                  );

                  localStorage.setItem(
                    "category",
                    session.category
                  );

                  navigate(`/interview/${session.category}`);
                }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all hover:bg-white/5"
            >

              <Clock3 size={15} className="text-white/40" />
              <div className="flex-1 overflow-hidden">

                <p className="text-sm text-white/75 truncate">
                  {session.category
                     .replace("-", " ")
                     .replace(/\b\w/g, (c: string) => c.toUpperCase())
                  } Interview
                </p>
              </div>
            </button>
          ))}

        </div>

      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10 space-y-2">

        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/5 text-white/70"
        >
          <Settings size={17} />
          Settings
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-red-500/10 text-red-400"
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

    </div>
  );
}