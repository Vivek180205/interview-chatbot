import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      alert("All fields required");
      return;
    }

    if (!captchaToken) {
      alert("Please verify captcha");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, captcha: captchaToken }),
      });

      if (!response.ok) {
        alert("Invalid credentials");
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("email", email.toLowerCase());

      navigate("/interview/backend");

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="text-white/40 text-xs text-center mt-2">
          Please verify you are human
        </p>

       {/* Captcha */}
       <div className="flex justify-center mt-4 mb-2">
         <div className="bg-white/5 p-3 rounded-lg border border-white/10">
           <ReCAPTCHA
             sitekey="6Le9rc4sAAAAAHjHe-OILfGzcuxf-BzKAc8US4cD"
             onChange={(token) => setCaptchaToken(token)}
           />
         </div>
       </div>

        {/* Button */}
        <button
          onClick={login}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-white
          bg-gradient-to-r from-purple-500 to-cyan-500
          hover:opacity-90 transition-all duration-200 shadow-lg"
        >
          Sign In
        </button>

        {/* Switch */}
        <p className="text-white/50 text-sm text-center mt-5">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}