import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const track = searchParams.get("track");

  const register = async () => {

    if (!username.trim() || !email.trim() || !password.trim() || !role || !experience) {
      alert("All fields required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          role,
          experience,
          password,
        }),
      });

      if (response.ok) {
        alert("Signup successful. Please login.");
        navigate("/login");
      } else {

        const text = await response.text();

        if (text.includes("User Already Exists.")) {
          alert("User already exists. Please login.");
        } else {
          alert(text);
        }
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            value={username}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            value={email}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            value={role}
            className="w-full p-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
            style={{ backgroundColor: "#1f1f23", color: "white" }}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="BACKEND_DEV">Backend Developer</option>
            <option value="FRONTEND_DEV">Frontend Developer</option>
            <option value="FULLSTACK_DEV">Full Stack Developer</option>
            <option value="DATA_SCIENTIST">Data Scientist</option>
            <option value="PYTHON_DEV">Python Developer</option>
            <option value="JAVA_DEV">Java Developer</option>
            <option value="DEVOPS_ENG">DevOps Engineer</option>
            <option value="AI_ENG">AI Engineer</option>
            <option value="MOBILE_DEV">Mobile Developer</option>
          </select>

          <select
            value={experience}
            className="w-full p-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
            style={{ backgroundColor: "#1f1f23", color: "white" }}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Experience Level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          <input
            value= {password}
            type="password"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={register}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-white
          bg-gradient-to-r from-purple-500 to-cyan-500
          hover:opacity-90 transition-all duration-200 shadow-lg"
        >
          Sign Up
        </button>

        {/* Switch */}
        <p className="text-white/50 text-sm text-center mt-5">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}