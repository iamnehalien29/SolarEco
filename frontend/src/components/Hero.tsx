"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, IndianRupee } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Switch to Green Energy Today</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Go Solar with <span className="text-gradient">PM Surya Ghar</span> Yojana ☀️
          </h1>
          
          <p className="text-lg text-slate-400 mb-8 max-w-lg">
            Join the government initiative for free electricity. Fk construction & Developers helps you install solar with maximum subsidies and 300 units of free power monthly.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-green-600 text-slate-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary/20">
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </button>
            <button className="glass px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10">
              Calculate Savings
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-slate-800 pt-8">
            <div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <IndianRupee className="w-5 h-5 text-accent" /> 25Cr+
              </div>
              <p className="text-sm text-slate-500">Energy Bills Saved</p>
            </div>
            <div>
              <div className="text-2xl font-bold">500+</div>
              <p className="text-sm text-slate-500">Happy Customers</p>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-primary" /> 25Y
              </div>
              <p className="text-sm text-slate-500">Warranty Support</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2070&auto=format&fit=crop"
              alt="Solar Panels"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl max-w-[200px] animate-bounce-slow">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-sm">Efficiency</span>
            </div>
            <p className="text-xs text-slate-400">Our panels offer 22.8% conversion rate.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
