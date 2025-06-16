'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const CAGRCalculator = () => {
  const [presentValue, setPresentValue] = useState(5000);
  const [futureValue, setFutureValue] = useState(25000);
  const [years, setYears] = useState(5);
  const [cagr, setCagr] = useState<number | null>(null);

  const calculateCAGR = () => {
    if (presentValue <= 0 || futureValue <= 0 || years <= 0) {
      setCagr(null);
      return;
    }
    const cagrValue = Math.pow(futureValue / presentValue, 1 / years) - 1;
    setCagr(cagrValue * 100);
  };

  const resetFields = () => {
    setPresentValue(0);
    setFutureValue(0);
    setYears(0);
    setCagr(null);
  };

  return (
    <>
    <ReNavbar/>
    <div className="max-w-md mx-auto p-6 bg-white border border-orange-400 rounded-lg shadow-sm">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">CAGR Calculator</h2>

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-orange-700">Present Value (₹)</label>
        <input
          type="number"
          min={0}
          value={presentValue}
          onChange={(e) => setPresentValue(Number(e.target.value))}
          placeholder="Enter initial investment"
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-orange-700">Future Value (₹)</label>
        <input
          type="number"
          min={0}
          value={futureValue}
          onChange={(e) => setFutureValue(Number(e.target.value))}
          placeholder="Enter value after period"
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-orange-700">Time Period (Years)</label>
        <input
          type="number"
          min={0}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          placeholder="Enter number of years"
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={calculateCAGR}
          className="px-6 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 transition"
        >
          Calculate
        </button>
        <button
          onClick={resetFields}
          className="px-6 py-3 bg-orange-100 text-orange-600 font-semibold rounded-md hover:bg-orange-200 transition"
        >
          Reset
        </button>
      </div>

      {cagr !== null && (
        <div className="mt-8 p-4 bg-orange-50 border border-orange-300 rounded-md text-orange-800 text-center font-semibold text-xl">
          CAGR is <span className="text-orange-600">{cagr.toFixed(2)}%</span>
        </div>
      )}

      <section className="mt-10 p-4 bg-white border border-orange-100 rounded-md text-orange-700 text-sm">
        <h3 className="font-bold mb-2 text-orange-600">What is CAGR?</h3>
        <p>
          CAGR (Compound Annual Growth Rate) represents the average annual growth rate of an investment
          over a period of time, assuming the profits are reinvested.
        </p>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default CAGRCalculator;
