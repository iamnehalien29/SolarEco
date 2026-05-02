"use client";

import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SolarCalculator from "@/components/SolarCalculator";
import PortfolioGrid from "@/components/PortfolioGrid";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* PM Surya Ghar Scheme Section */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass p-8 rounded-[2rem] border-primary/20 flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <div className="bg-white p-2 rounded-2xl shadow-sm shrink-0">
                 <img 
                   src="/fk-logo-pm-yojna.jpg" 
                   alt="FK Construction Logo" 
                   className="h-20 w-20 object-contain rounded-xl"
                 />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold mb-2">PM Surya Ghar: Muft Bijli Yojana</h4>
                <p className="text-slate-400">
                  Get up to <span className="text-primary font-bold">300 units of free electricity</span> every month. 
                  Fk construction & Developers is an authorized partner to help you claim <span className="text-white font-bold">Central Subsidy of ₹85,800</span> and <span className="text-white font-bold">State Subsidy of ₹45,800</span>.
                </p>
              </div>
              <button className="bg-primary text-slate-900 px-8 py-3 rounded-xl font-bold whitespace-nowrap hover:scale-105 transition-all">
                Apply Now
              </button>
            </div>
            
            {/* Added Client Banner */}
            <div className="w-full mt-4 rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
              <img 
                src="/pm-yojna-banner.jpg" 
                alt="PM Surya Ghar Yojna Pricing and Subsidy Details" 
                className="w-full h-auto object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      <Services />
      
      <SolarCalculator />
      
      <PortfolioGrid />

      <Testimonials />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Get in Touch</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-8">Start Saving on <br /><span className="text-gradient">Electricity Today</span></h3>
            <p className="text-slate-400 text-lg mb-12 max-w-lg">
              Have questions? Our experts are here to help. Fill out the form or reach out via WhatsApp for an instant response.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold">Email Us</h5>
                  <p className="text-slate-400">fkconstructionanddevelopers@gmail.com</p>
                </div>
              </div>
              <a href="https://wa.me/919101959973" target="_blank" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="bg-green-500/10 p-3 rounded-lg text-green-500">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.076 1.387 4.7 1.388 5.431 0 9.85-4.419 9.853-9.852 0-2.633-1.025-5.107-2.887-6.97s-4.337-2.887-6.971-2.887c-5.431 0-9.851 4.419-9.853 9.852 0 1.834.51 3.626 1.475 5.207l-.973 3.556 3.656-.959zm10.588-7.14c-.297-.148-1.758-.868-2.031-.967-.272-.099-.471-.148-.669.148-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                </div>
                <div>
                  <h5 className="font-bold">WhatsApp</h5>
                  <p className="text-slate-400">+91 91019 59973</p>
                </div>
              </a>
            </div>
          </div>
          
          <ContactForm />
        </div>

        <div className="max-w-7xl mx-auto">
          <GoogleMap />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2 text-white font-bold">
            Fk construction & Developers © 2026. All rights reserved.
          </div>
          <div className="flex gap-6">
             <a href="#" className="hover:text-primary transition-colors">Facebook</a>
             <a href="#" className="hover:text-primary transition-colors">Instagram</a>
             <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
