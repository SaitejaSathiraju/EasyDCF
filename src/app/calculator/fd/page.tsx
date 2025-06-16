 "use client";
import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const FDCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.5); // % per annum
  const [years, setYears] = useState(5);
  const [compound, setCompound] = useState(4); // Quarterly

  const calculateFD = () => {
    const r = rate / 100;
    const n = compound;
    const t = years;
    const maturityAmount = principal * Math.pow(1 + r / n, n * t);
    const interest = maturityAmount - principal;
    return {
      maturity: maturityAmount.toFixed(2),
      interest: interest.toFixed(2),
    };
  };

  const { maturity, interest } = calculateFD();

  return (
    <>
    <ReNavbar />
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Fixed Deposit Calculator</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Principal (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tenure (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Compounding Frequency</label>
          <select
            value={compound}
            onChange={(e) => setCompound(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value={1}>Annually</option>
            <option value={2}>Half-Yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>
      </div>

      <div className="mt-6 bg-orange-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-orange-700 mb-2">Maturity Details</h3>
        <p><strong>Maturity Amount:</strong> ₹{maturity}</p>
        <p><strong>Interest Earned:</strong> ₹{interest}</p>
      </div>

      <div className="mt-8 text-sm text-gray-600 leading-relaxed">
        <h4 className="text-md font-semibold text-gray-800 mb-1">📘 What is FD?</h4>
        <p>
          Fixed Deposit (FD) is a safe investment option offered by banks and NBFCs. You deposit a lump sum
          for a fixed tenure at a predetermined interest rate.
        </p>

        <h4 className="text-md font-semibold text-gray-800 mt-4 mb-1">📈 How Returns Are Calculated?</h4>
        <p>
          FD returns are calculated using the compound interest formula:
          <br />
          <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">A = P (1 + r/n)<sup>nt</sup></code>
          <br />
          where A = maturity, P = principal, r = rate, n = compounding frequency, t = time.
        </p>

        <h4 className="text-md font-semibold text-gray-800 mt-4 mb-1">💡 Why Use an FD Calculator?</h4>
        <ul className="list-disc list-inside">
          <li>Get quick and accurate maturity estimates.</li>
          <li>Compare different tenures and rates.</li>
          <li>Plan your financial goals effectively.</li>
        </ul>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default FDCalculator;
