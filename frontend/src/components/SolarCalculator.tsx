"use client";

import { useState } from "react";
import { Calculator, IndianRupee, Sun, Zap, TrendingDown } from "lucide-react";

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<number | "">(2500);

  // Constants
  const RATE_PER_UNIT = 8; // Average electricity rate in INR
  const UNITS_PER_KW_MONTH = 120; // 1 kW produces approx 120 units a month

  // Calculations
  const unitsPerMonth = Number(monthlyBill) / RATE_PER_UNIT;
  let kwNeeded = Math.ceil(unitsPerMonth / UNITS_PER_KW_MONTH);
  if (kwNeeded < 1) kwNeeded = 1; // Minimum 1 kW system

  // PM Surya Ghar Subsidy Rules
  let subsidy = 0;
  if (kwNeeded <= 2) {
    subsidy = kwNeeded * 30000;
  } else if (kwNeeded === 3) {
    subsidy = 60000 + 18000;
  } else {
    subsidy = 78000; // Max subsidy is capped at 78,000
  }

  const yearlySavings = Number(monthlyBill) * 12;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
            <Calculator className="w-4 h-4" /> Savings Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Calculate Your <span className="text-gradient">Solar Savings</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Find out exactly what system size you need and how much government subsidy you can claim through the PM Surya Ghar Yojana.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-800 backdrop-blur-sm">
          
          {/* Input Section */}
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-bold mb-4">What is your average monthly electricity bill?</label>
              <div className="relative">
                <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-400" />
                <input 
                  type="number" 
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value ? Number(e.target.value) : "")}
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-3xl py-6 pl-20 pr-8 text-3xl font-bold text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. 2500"
                />
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-primary/10 rounded-3xl border border-primary/20">
              <Sun className="w-8 h-8 text-primary shrink-0" />
              <p className="text-sm text-slate-300">
                Calculations are based on the latest <strong>PM Surya Ghar Muft Bijli Yojana</strong> rates. 
                Subsidies go up to ₹78,000 for residential homes.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-6 rounded-3xl text-center flex flex-col justify-center border border-slate-700/50 hover:border-primary/50 transition-colors">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <div className="text-sm text-slate-400 font-bold mb-1">Recommended System</div>
              <div className="text-4xl font-bold">{kwNeeded} <span className="text-xl text-slate-500">kW</span></div>
            </div>

            <div className="glass p-6 rounded-3xl text-center flex flex-col justify-center border border-slate-700/50 hover:border-primary/50 transition-colors">
              <TrendingDown className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <div className="text-sm text-slate-400 font-bold mb-1">Yearly Savings</div>
              <div className="text-4xl font-bold text-green-400">₹{yearlySavings.toLocaleString('en-IN')}</div>
            </div>

            <div className="glass p-8 rounded-3xl md:col-span-2 text-center border border-primary/30 bg-primary/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-solar-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="text-sm text-primary font-bold mb-2 tracking-widest uppercase">Estimated Govt Subsidy</div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">₹{subsidy.toLocaleString('en-IN')}</div>
              <div className="text-xs text-slate-400">Directly credited to your bank account</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
