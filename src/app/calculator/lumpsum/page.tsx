'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const principal = amount;
  const r = rate / 100;
  const t = years;
  const maturity = principal * Math.pow(1 + r, t);
  const gain = maturity - principal;

  return (
    <>
    <ReNavbar />
    <div className="min-h-screen bg-orange-50 py-10 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">📊 Lumpsum Investment Calculator</h1>

        {/* Input Form */}
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium">Investment Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Expected Annual Return (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Investment Duration (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 border-t pt-4 grid gap-2">
          <div className="flex justify-between text-lg">
            <span>Invested Amount:</span>
            <span className="font-semibold text-orange-700">₹{principal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Estimated Returns:</span>
            <span className="font-semibold text-green-600">₹{gain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Total Value:</span>
            <span className="font-semibold text-orange-900">₹{maturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition">
            Invest Now
          </button>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-orange-700 mb-3">Understanding Lumpsum Investments</h2>
        <p className="text-gray-700 mb-4">
          A lumpsum investment is when a single large amount is invested in a mutual fund scheme at one time,
          unlike SIPs where small amounts are invested periodically.
        </p>
        <p className="text-gray-700 mb-4">
          It’s suitable for investors with a significant corpus and a long investment horizon. The returns are calculated using compound interest:
        </p>
        <pre className="bg-orange-100 text-orange-900 p-4 rounded-md text-sm overflow-x-auto">
          A = P × (1 + r)^t
        </pre>
        <p className="text-gray-700 mt-4">
          Where:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>P</strong> = Principal amount (initial investment)</li>
          <li><strong>r</strong> = Expected annual return rate (in decimals)</li>
          <li><strong>t</strong> = Investment duration in years</li>
        </ul>
      </div>
    </div>
    <Footer />
    </>
  );
}
