"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function RateUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://solareco.onrender.com/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit review");
      
      setStatus("success");
      setFormData({ name: "", role: "", content: "", rating: 5 });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-24 bg-slate-950">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rate Your <span className="text-gradient">Experience</span></h1>
          <p className="text-slate-400 text-lg">
            Thank you for choosing F.K. Construction & Developers! We value your feedback.
          </p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[2rem] border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          
          {status === "success" ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
              <p className="text-slate-400">Your review has been submitted and is pending approval.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Star Rating */}
              <div className="flex flex-col items-center mb-8">
                <label className="text-sm font-bold text-slate-300 mb-4 tracking-widest uppercase">Select your rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-2 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star 
                        className={`w-10 h-10 ${
                          star <= (hoveredStar || formData.rating) 
                            ? "fill-primary text-primary" 
                            : "text-slate-600"
                        } transition-colors`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Role or Location (Optional)</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Homeowner, Guwahati"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Your Review</label>
                <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your experience..."
                />
              </div>

              {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                  Failed to submit review. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : (
                  <>
                    <Send className="w-5 h-5" /> Submit Review
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
