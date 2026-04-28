"use client";

import { motion } from "framer-motion";
import { Home, Building2, Wrench, BarChart3, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Residential Solar",
    description: "Tailored solar solutions for your home to slash electricity bills and boost property value.",
    icon: <Home className="w-8 h-8" />,
    color: "text-primary",
  },
  {
    title: "Commercial Systems",
    description: "Scalable solar installations for businesses, factories, and warehouses to reduce OpEx.",
    icon: <Building2 className="w-8 h-8" />,
    color: "text-accent",
  },
  {
    title: "Maintenance & Repair",
    description: "Regular cleaning and technical health checks to ensure your system runs at peak performance.",
    icon: <Wrench className="w-8 h-8" />,
    color: "text-blue-400",
  },
  {
    title: "Solar Consultation",
    description: "Expert advice on site feasibility, ROI analysis, and government subsidy support.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "text-purple-400",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Comprehensive Solar Services</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From initial consultation to lifelong maintenance, we provide everything you need to transition to sustainable energy seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl hover:border-primary/50 transition-all group relative overflow-hidden"
            >
              <div className={`${service.color} mb-6 transition-transform group-hover:scale-110 duration-300`}>
                {service.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <button className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                Learn More <ArrowUpRight className="w-4 h-4" />
              </button>
              
              {/* Decorative Gradient */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
