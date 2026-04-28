"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "10kW Villa Installation",
    category: "Residential",
    location: "Gurugram, Haryana",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "100kW Factory Grid",
    category: "Commercial",
    location: "Bhiwadi, Rajasthan",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1975&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "5kW Rooftop System",
    category: "Residential",
    location: "Noida, UP",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Solar Carport",
    category: "Commercial",
    location: "Faridabad, Haryana",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1974&auto=format&fit=crop",
  },
];

const PortfolioGrid = () => {
  const [filter, setFilter] = useState("All");
  const [projectList, setProjectList] = useState(projects);
  const categories = ["All", "Residential", "Commercial"];

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${apiBase}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setProjectList(data);
        }
      } catch (err) {
        console.error("Using static projects fallback");
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === "All" 
    ? projectList 
    : projectList.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Work</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8">Featured Projects</h3>
          
          <div className="flex justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                  ? "bg-primary text-slate-900" 
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project._id || project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden glass aspect-video"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className={`font-bold text-sm mb-2 ${project.category === "Residential" ? "text-primary" : "text-accent"}`}>
                    {project.category}
                  </span>
                  <h4 className="text-2xl font-bold">{project.title}</h4>
                  <p className="text-slate-400 text-sm">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
