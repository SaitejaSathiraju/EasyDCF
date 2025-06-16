"use client";
import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const NPSCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(9);
  const [years, setYears] = useState(20);

  const principal = monthlyInvestment * 12 * years;
  const totalCorpus = monthlyInvestment * (((Math.pow((1 + expectedReturn / 100), years) - 1) / (expectedReturn / 100)) * (1 + expectedReturn / 100));
  const annuityInvestment = totalCorpus * 0.4;
  const lumpSum = totalCorpus * 0.6;

  return (
    <>
    <ReNavbar/>
    <div className="min-h-screen bg-white text-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto p-6 border border-orange-200 rounded-lg shadow-md bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">📊 NPS Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-orange-600">Monthly Investment (₹)</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full p-2 border border-orange-300 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-orange-600">Expected Return (% p.a.)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full p-2 border border-orange-300 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-orange-600">Investment Duration (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full p-2 border border-orange-300 rounded"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-white border border-orange-300 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">📈 Estimated Results</h2>
          <div className="space-y-2 text-gray-800">
            <p><strong>Total Principal Invested:</strong> ₹{principal.toLocaleString()}</p>
            <p><strong>Estimated Total Corpus:</strong> ₹{totalCorpus.toFixed(0).toLocaleString()}</p>
            <p><strong>Lump Sum Withdrawal (60%):</strong> ₹{lumpSum.toFixed(0).toLocaleString()}</p>
            <p><strong>Annuity Purchase (40%):</strong> ₹{annuityInvestment.toFixed(0).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="bg-orange-500 text-white px-6 py-2 rounded shadow hover:bg-orange-600 transition">
            INVEST NOW
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-xl font-semibold text-orange-600 mb-2">About National Pension Scheme</h2>
        <p className="mb-4">
          The National Pension System (NPS) is a long-term retirement-focused investment plan managed by the Government of India. Contributions made regularly accumulate over time with compounding interest.
        </p>
        <p className="mb-4">
          On maturity, you are allowed to withdraw 60% of the corpus tax-free, while 40% must be used to buy an annuity that pays regular pension.
        </p>
        <p className="mb-4">
          The NPS calculator helps you estimate your pension savings based on your monthly contributions, expected return rate, and investment duration.
        </p>
      </div>
    </div>
    <Footer />
        </>
  );
};

export default NPSCalculator;
