"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const response = await fetch(`${apiBase}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="glass p-8 md:p-12 rounded-[2rem] w-full max-w-2xl mx-auto">
      {status === "success" ? (
        <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Request Received!</h3>
          <p className="text-slate-400">Our solar expert will contact you within 24 hours.</p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-8 text-primary font-bold hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">Phone Number</label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Your Message</label>
            <textarea
              rows={4}
              placeholder="Tell us about your requirements..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          
          <button
            disabled={status === "loading"}
            className={cn(
              "w-full bg-primary hover:bg-green-600 text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50",
              status === "error" && "bg-red-500 hover:bg-red-600 text-white"
            )}
          >
            {status === "loading" ? "Sending..." : status === "error" ? "Error! Try Again" : (
              <>
                Send Inquiry <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
