'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const StepUpSIPCalculator = () => {
  const [monthlySIP, setMonthlySIP] = useState(25000);
  const [annualStepUp, setAnnualStepUp] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [tenure, setTenure] = useState(10);

  // Convert annual expected return to monthly decimal
  const monthlyReturn = expectedReturn / 12 / 100;
  const years = tenure;

  // Function to calculate final corpus with step-up SIP
  const calculateStepUpSIP = () => {
    let totalAmount = 0;
    let totalInvestment = 0;
    let sipAmount = monthlySIP;

    for (let year = 1; year <= years; year++) {
      // Each year, monthly SIP remains same, then increases for next year
      // Number of months in year = 12
      for (let month = 1; month <= 12; month++) {
        // Calculate number of months remaining including this one
        const monthsRemaining = (years - (year - 1)) * 12 - (month - 1);

        // Calculate future value for this monthly SIP contribution
        const fv = sipAmount * Math.pow(1 + monthlyReturn, monthsRemaining - 1);

        totalAmount += fv;
        totalInvestment += sipAmount;
      }
      // Increase SIP by annual step-up % after each year
      sipAmount = sipAmount * (1 + annualStepUp / 100);
    }

    return {
      totalAmount,
      totalInvestment,
      profit: totalAmount - totalInvestment,
    };
  };

  const { totalAmount, totalInvestment, profit } = calculateStepUpSIP();

  const formatCurrency = (num: number) =>
    num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <>
    <ReNavbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-orange-300">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">📈 Step Up SIP Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-6">
        <div>
          <label className="block text-orange-600 font-medium mb-1">Monthly SIP (₹)</label>
          <input
            type="number"
            min={0}
            value={monthlySIP}
            onChange={(e) => setMonthlySIP(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Annual Step-up (%)</label>
          <input
            type="number"
            min={0}
            step="0.1"
            value={annualStepUp}
            onChange={(e) => setAnnualStepUp(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Expected Return (%)</label>
          <input
            type="number"
            min={0}
            step="0.1"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Tenure (Years)</label>
          <input
            type="number"
            min={1}
            max={50}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-300 rounded p-6 text-center">
        <p className="text-xl font-semibold text-orange-700">
          Total Investment: <span className="text-2xl">{formatCurrency(totalInvestment)}</span>
        </p>
        <p className="mt-3 text-orange-800">
          Estimated Profit: <strong>{formatCurrency(profit)}</strong>
        </p>
        <p className="text-orange-800">
          Estimated Maturity Amount: <strong>{formatCurrency(totalAmount)}</strong>
        </p>
      </div>

      <section className="mt-8 p-4 bg-white border border-orange-100 rounded shadow-inner text-gray-700">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">About Step Up SIP</h3>

        <p className="mb-3">
          A Step-Up SIP allows you to increase your monthly SIP investment by a fixed percentage every year, helping your investments grow faster along with your income.
        </p>

        <p className="mb-3">
          This calculator helps you estimate the maturity amount and profit you can expect based on your monthly SIP, annual step-up percentage, expected returns, and investment tenure.
        </p>

        <h4 className="font-semibold text-orange-600 mb-2">How to Use</h4>
        <ol className="list-decimal list-inside space-y-1 mb-4">
          <li>Enter your initial monthly SIP amount.</li>
          <li>Enter the percentage by which you want to increase your SIP every year.</li>
          <li>Enter the expected annual rate of return.</li>
          <li>Enter the total investment period in years.</li>
          <li>View your estimated returns and maturity amount instantly.</li>
        </ol>

        <h4 className="font-semibold text-orange-600 mb-2">Benefits</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Builds wealth systematically with increasing investments.</li>
          <li>Helps beat inflation by growing your investment amount.</li>
          <li>Provides a clear picture of long-term wealth accumulation.</li>
          <li>Easy and free to use anytime for financial planning.</li>
        </ul>
      </section>
    </div>
    <Footer />
        </>
  );
};

export default StepUpSIPCalculator;
