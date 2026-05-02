"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";

interface TestimonialType {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://solareco.onrender.com/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials", err);
        setLoading(false);
      });
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            No reviews yet. Be the first to leave one!
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t._id}
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
                  <img 
                    src={t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1e293b&color=f97316`} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" 
                  />
                  <div>
                    <h5 className="font-bold">{t.name}</h5>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
