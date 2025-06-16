'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6);
  const [time, setTime] = useState(5);
  const [compoundsPerYear, setCompoundsPerYear] = useState(1);

  // Compound Interest formula: A = P(1 + r/n)^(nt)
  // r = rate/100, n = compounds per year, t = years
  const r = rate / 100;
  const n = compoundsPerYear;
  const t = time;

  const totalAmount = principal * Math.pow(1 + r / n, n * t);
  const compoundInterest = totalAmount - principal;

  const formatCurrency = (num: number) =>
    num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <>
    <ReNavbar />
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-orange-200">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">📈 Compound Interest Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
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
          <label className="block text-orange-700 font-medium mb-1">Interest Rate (%)</label>
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

        <div>
          <label className="block text-orange-700 font-medium mb-1">Compounds Per Year</label>
          <select
            value={compoundsPerYear}
            onChange={(e) => setCompoundsPerYear(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded"
          >
            <option value={1}>Annually</option>
            <option value={2}>Semi-Annually</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
            <option value={365}>Daily</option>
          </select>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-300 rounded p-5 text-center">
        <p className="text-xl font-semibold text-orange-600">
          Principal Amount: <span className="text-2xl">{formatCurrency(principal)}</span>
        </p>
        <p className="mt-3 text-orange-700">
          Compound Interest Earned: <strong>{formatCurrency(compoundInterest)}</strong>
        </p>
        <p className="text-orange-700">
          Total Amount (Principal + Interest): <strong>{formatCurrency(totalAmount)}</strong>
        </p>
      </div>

      <div className="mt-8 p-4 bg-white border border-orange-100 rounded shadow-inner text-gray-700">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">Compound Interest Calculator Explained</h3>

        <p className="mb-3">
          Compounding interest means you earn interest on your principal as well as on the interest accumulated previously, which makes your wealth grow exponentially over time.
        </p>

        <h4 className="font-semibold text-orange-600 mb-2">Compound Interest Formula</h4>
        <p className="mb-3">
          To calculate total amount (principal + interest):
        </p>
        <pre className="bg-orange-100 p-3 rounded text-sm font-mono">
          A = P × (1 + r/n)^(nt)
        </pre>
        <p className="mb-3">
          Where:<br />
          <strong>A</strong> = Total accumulated amount<br />
          <strong>P</strong> = Principal amount<br />
          <strong>r</strong> = Annual interest rate (in decimal)<br />
          <strong>n</strong> = Number of times interest compounds per year<br />
          <strong>t</strong> = Time period in years
        </p>

        <h4 className="font-semibold text-orange-600 mb-2">Example</h4>
        <p>
          If you invest ₹50,000 at an annual interest rate of 10% compounded yearly for 5 years:<br />
          Year 1 interest = 50,000 × 10% = ₹5,000<br />
          Year 2 interest = (50,000 + 5,000) × 10% = ₹5,500<br />
          Year 3 interest = (55,000 + 5,500) × 10% = ₹6,050<br />
          and so on, growing exponentially.
        </p>

        <h4 className="font-semibold text-orange-600 mt-6 mb-2">Benefits of Using a Compound Interest Calculator</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Determines exact returns and investment growth over time.</li>
          <li>Helps in planning for future financial goals and required corpus.</li>
          <li>Adjustable compounding frequency to suit different investment types.</li>
          <li>Eliminates manual calculation errors and saves time.</li>
        </ul>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default CompoundInterestCalculator;
