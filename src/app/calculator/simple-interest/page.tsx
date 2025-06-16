'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6);
  const [time, setTime] = useState(5);

  // Simple Interest = P * R * T / 100
  const simpleInterest = (principal * rate * time) / 100;
  // Total amount = Principal + Interest
  const totalAmount = principal + simpleInterest;

  const formatCurrency = (num: number) =>
    num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <>
    <ReNavbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-orange-200">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">💰 Simple Interest Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-orange-700 font-medium mb-1">Principal Amount (₹)</label>
          <input
            type="number"
            min={0}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded"
          />
        </div>

        <div>
          <label className="block text-orange-700 font-medium mb-1">Rate of Interest (%)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded"
          />
        </div>

        <div>
          <label className="block text-orange-700 font-medium mb-1">Time Period (Years)</label>
          <input
            type="number"
            min={0}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded"
          />
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-300 rounded p-5 text-center">
        <p className="text-xl font-semibold text-orange-600">
          Principal Amount: <span className="text-2xl">{formatCurrency(principal)}</span>
        </p>
        <p className="mt-3 text-orange-700">
          Simple Interest: <strong>{formatCurrency(simpleInterest)}</strong>
        </p>
        <p className="text-orange-700">
          Total Amount (Principal + Interest): <strong>{formatCurrency(totalAmount)}</strong>
        </p>
      </div>

      <div className="mt-8 p-4 bg-white border border-orange-100 rounded shadow-inner text-gray-700">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">Simple Interest Calculator Explained</h3>

        <p className="mb-3">
          Investments earned on a scheme are calculated as gains accumulated against the interest on the principal amount. Simple interest is one such method where interest is calculated only on the original principal.
        </p>

        <h4 className="font-semibold text-orange-600 mb-2">Simple Interest Formula</h4>
        <p className="mb-3">
          To calculate total maturity amount:
        </p>
        <pre className="bg-orange-100 p-3 rounded text-sm font-mono">
          A = P (1 + r × t)
        </pre>
        <p className="mb-3">
          Where:<br />
          <strong>A</strong> = Total accumulated amount (principal + interest)<br />
          <strong>P</strong> = Principal amount<br />
          <strong>r</strong> = Rate of interest per year in decimal (R/100)<br />
          <strong>t</strong> = Time period in years
        </p>

        <p className="mb-3">
          To calculate simple interest:
        </p>
        <pre className="bg-orange-100 p-3 rounded text-sm font-mono">
          SI = (P × R × T) / 100
        </pre>

        <h4 className="font-semibold text-orange-600 mb-2">Example</h4>
        <p>
          Mr. A invested ₹15,000 at 5% interest for 2 years. The simple interest earned is:<br />
          (15000 × 5 × 2) / 100 = ₹1,500.<br />
          So, the total amount after 2 years will be ₹16,500.
        </p>

        <h4 className="font-semibold text-orange-600 mt-6 mb-2">Why use a Simple Interest Calculator?</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Saves time and avoids manual calculation errors.</li>
          <li>Helps you easily gauge your total returns and maturity amount.</li>
          <li>Accurate and consistent across different currencies and durations.</li>
          <li>Especially useful for short to medium-term investments where principal remains constant.</li>
        </ul>
      </div>
    </div>
    <Footer />
        </>
  );
};

export default SimpleInterestCalculator;
