"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Sharma",
    role: "Homeowner",
    content: "Switching to solar was the best decision. My monthly bill went from ₹8,000 to ₹1,200! The installation was super fast.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Priya Patel",
    role: "CEO, GreenTech Industries",
    content: "SolarEco installed a 50kW system for our factory. Their technical expertise and subsidy support were outstanding.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Vikram Singh",
    role: "Villa Owner",
    content: "Excellent service and high-quality panels. The team handles all the paperwork for the government subsidy.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Success Stories</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Trusted by 500+ Families</h3>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-slate-900"
                />
              ))}
            </div>
            <div className="ml-2">
              <div className="flex text-accent">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-400 font-bold">4.9/5 Rating</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-primary/10" />
              <div className="flex text-accent mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-300 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <h5 className="font-bold">{t.name}</h5>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
