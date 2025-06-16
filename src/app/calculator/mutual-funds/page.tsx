'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function MutualFundCalculator() {
  const [investment, setInvestment] = useState(25000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);

  // Compound interest formula: A = P * (1 + r)^t
  const r = annualReturn / 100;
  const amount = investment * Math.pow(1 + r, years);
  const returns = amount - investment;

  return (
    <>
    <ReNavbar/>
    <div className="min-h-screen bg-orange-50 py-10 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">📈 Mutual Fund Returns Calculator</h1>

        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-medium">Investment Amount (₹)</label>
            <input
              type="number"
              value={investment}
              min={0}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Expected Annual Return (%)</label>
            <input
              type="number"
              value={annualReturn}
              min={0}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Duration (Years)</label>
            <input
              type="number"
              value={years}
              min={1}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-orange-900 font-semibold text-lg">
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{investment.toLocaleString()}</div>
            <div className="mt-1 text-sm font-normal">Invested Amount</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{returns.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="mt-1 text-sm font-normal">Estimated Returns</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="mt-1 text-sm font-normal">Total Value</div>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm text-gray-700">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">About Mutual Fund Returns</h2>
        <p className="mb-4">
          Mutual funds are a popular investment option offering diversified portfolios managed by professionals. Returns are
          subject to market risks, but a mutual fund returns calculator can give you an estimated idea of your potential growth.
        </p>
        <p className="mb-4">
          This calculator uses the compound interest formula to estimate your investment value based on your input of initial investment,
          expected annual return, and duration.
        </p>
        <p>
          Always remember that actual returns may vary due to market conditions, fees, and other factors. Use this as a guide to plan your
          investments better.
        </p>
      </section>
    </div>
    <Footer />
        </>
  );
}
