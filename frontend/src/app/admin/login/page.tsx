"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        router.push("/admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server connection failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent)] pointer-events-none" />
      
      <div className="glass p-10 rounded-[2.5rem] w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="bg-solar-gradient w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
            <Lock className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <p className="text-slate-500 mt-2">Please login to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                required
                type="text"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-12 py-4 focus:outline-none focus:border-primary transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                required
                type="password"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-12 py-4 focus:outline-none focus:border-primary transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-solar-gradient text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-primary/10 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Login Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
