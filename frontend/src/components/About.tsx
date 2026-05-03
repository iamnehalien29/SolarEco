"use client";

import { CheckCircle2, Shield, Zap, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Authorized Vendor",
    description: "Officially empaneled for PM Surya Ghar Yojana subsidies.",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "End-to-End Execution",
    description: "From site inspection to subsidy claim, we handle it all.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    title: "Premium Quality",
    description: "Using top-tier Tier-1 panels with 25-year warranties.",
  },
  {
    icon: <Leaf className="w-6 h-6 text-primary" />,
    title: "Sustainable Future",
    description: "Committed to reducing carbon footprints across India.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Pioneering <span className="text-gradient">Sustainable Energy</span> Solutions
            </h3>
            
            <div className="space-y-6 text-slate-400 text-lg mb-10">
              <p>
                With years of excellence in construction and sustainable development, <strong className="text-white">F.K. Construction & Developers</strong> is at the forefront of India's green energy revolution. As an authorized vendor for the PM Surya Ghar: Muft Bijli Yojana, we specialize in delivering state-of-the-art rooftop solar installations that empower homeowners to achieve true energy independence.
              </p>
              <p>
                Our mission goes beyond simply installing solar panels. We take pride in handling the entire lifecycle of your solar journey—from the initial structural assessment and optimal system design to executing complex installations and seamlessly processing government subsidies on your behalf.
              </p>
              <p>
                We believe in building a future where clean, renewable energy is accessible, affordable, and entirely hassle-free for every household.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6 mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop" 
                  alt="Solar panel installation" 
                  className="rounded-3xl object-cover h-64 w-full shadow-2xl border border-slate-800"
                />
                <img 
                  src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=2069&auto=format&fit=crop" 
                  alt="Green energy architecture" 
                  className="rounded-3xl object-cover h-48 w-full shadow-2xl border border-slate-800"
                />
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="glass p-8 rounded-3xl border border-primary/20 text-center flex flex-col justify-center h-48 shadow-2xl">
                  <span className="text-5xl font-bold text-white mb-2">10+</span>
                  <span className="text-slate-400 font-medium">Years of Trust</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1611365892597-0996537b8285?q=80&w=1974&auto=format&fit=crop" 
                  alt="Solar panels on roof" 
                  className="rounded-3xl object-cover h-64 w-full shadow-2xl border border-slate-800"
                />
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass px-6 py-4 rounded-2xl border border-primary/30 flex items-center gap-4 shadow-[0_0_40px_rgba(249,115,22,0.15)] whitespace-nowrap">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
              </span>
              <span className="font-bold text-white">0% Processing Fees</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
