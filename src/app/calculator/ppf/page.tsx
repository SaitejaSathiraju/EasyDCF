'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function PPFCalculator() {
  const [annualContribution, setAnnualContribution] = useState(50000);
  const [tenure, setTenure] = useState(15);
  const [interestRate, setInterestRate] = useState(7.1); // as per current govt rate

  const calculatePPFMaturity = () => {
    let maturityAmount = 0;
    const r = interestRate / 100;

    for (let year = 1; year <= tenure; year++) {
      maturityAmount = (maturityAmount + annualContribution) * (1 + r);
    }

    const totalInvested = annualContribution * tenure;
    const interestEarned = maturityAmount - totalInvested;

    return {
      totalInvested,
      interestEarned,
      maturityAmount,
    };
  };

  const { totalInvested, interestEarned, maturityAmount } = calculatePPFMaturity();

  return (
    <>
    <ReNavbar />
    <div className="min-h-screen bg-orange-50 text-gray-800 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">📘 PPF Calculator</h1>

        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-medium">Annual Contribution (₹)</label>
            <input
              type="number"
              value={annualContribution}
              min={500}
              max={150000}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-orange-400 focus:outline-none"
            />
            <small className="text-gray-500">Minimum ₹500, Maximum ₹1,50,000</small>
          </div>

          <div>
            <label className="block text-sm font-medium">Tenure (Years)</label>
            <input
              type="number"
              value={tenure}
              min={15}
              max={50}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-orange-400 focus:outline-none"
            />
            <small className="text-gray-500">Minimum 15 years</small>
          </div>

          <div>
            <label className="block text-sm font-medium">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-orange-400 focus:outline-none"
            />
            <small className="text-gray-500">Current PPF rate: 7.1%</small>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-orange-900 font-semibold text-lg">
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{totalInvested.toLocaleString()}</div>
            <div className="mt-1 text-sm font-normal">Total Contribution</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="mt-1 text-sm font-normal">Interest Earned</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="mt-1 text-sm font-normal">Maturity Amount</div>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm text-gray-700">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">About Public Provident Fund (PPF)</h2>
        <p className="mb-4">
          The Public Provident Fund (PPF) is a long-term savings scheme offered by the Government of India. It provides attractive
          interest rates (currently 7.1%) and tax-free returns under Section 80C of the Income Tax Act.
        </p>
        <p className="mb-4">
          This calculator helps you estimate the maturity amount based on your yearly contribution, interest rate, and tenure.
        </p>
        <p>
          The maturity period is 15 years, and it can be extended in blocks of 5 years. Withdrawals are tax-free, making PPF a safe
          and reliable retirement savings option.
        </p>
      </section>
    </div>
    <Footer />
        </>
  );
}
