'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

type Frequency = 'Monthly' | 'Quarterly' | 'Yearly';

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(1000000); // ₹10 Lakh default
  const [annualReturn, setAnnualReturn] = useState(8); // 8% default return
  const [withdrawAmount, setWithdrawAmount] = useState(20000); // ₹20,000 default
  const [withdrawFrequency, setWithdrawFrequency] = useState<Frequency>('Monthly'); // Monthly, Quarterly, Yearly

  // Convert frequency to periods per year
  const periodsPerYear: Record<Frequency, number> = {
    Monthly: 12,
    Quarterly: 4,
    Yearly: 1,
  };

  const r = annualReturn / 100 / periodsPerYear[withdrawFrequency]; // periodic rate
  const totalPeriodsPerYear = periodsPerYear[withdrawFrequency];

  // Calculate number of periods SWP lasts (using annuity formula)
  // n = -log(1 - r*P/W) / log(1 + r)
  // P = initialInvestment, W = withdrawal amount
  // Handle zero or very low interest or W > P

  let numberOfPeriods = 0;
  let depleted = false;

  if (withdrawAmount <= 0) {
    numberOfPeriods = Infinity; // infinite if no withdrawal
  } else if (r === 0) {
    numberOfPeriods = initialInvestment / withdrawAmount;
  } else if (withdrawAmount > initialInvestment * r) {
    // Use formula only if r*P > W, else investment depletes quickly
    numberOfPeriods = -Math.log(1 - (r * initialInvestment) / withdrawAmount) / Math.log(1 + r);
  } else {
    // If withdrawal too high, depletes instantly
    numberOfPeriods = initialInvestment / withdrawAmount;
    depleted = true;
  }

  numberOfPeriods = Math.floor(numberOfPeriods);

  // Calculate remaining balance after all withdrawals
  let remainingBalance = 0;
  if (!depleted) {
    remainingBalance =
      initialInvestment * Math.pow(1 + r, numberOfPeriods) - withdrawAmount * ((Math.pow(1 + r, numberOfPeriods) - 1) / r);
    remainingBalance = remainingBalance > 0 ? remainingBalance : 0;
  }

  return (
    <>
    <ReNavbar/>
    <div className="min-h-screen bg-orange-50 py-10 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">💸 Systematic Withdrawal Plan (SWP) Calculator</h1>

        {/* Input Form */}
        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-medium">Initial Investment (₹)</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Expected Annual Return (%)</label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Withdrawal Amount (₹)</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Withdrawal Frequency</label>
            <select
              value={withdrawFrequency}
              onChange={(e) => setWithdrawFrequency(e.target.value as Frequency)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 border-t pt-6 space-y-4 text-lg text-orange-900 font-semibold">
          <div className="flex justify-between">
            <span>Withdrawal Frequency:</span>
            <span>{withdrawFrequency}</span>
          </div>
          <div className="flex justify-between">
            <span>Number of Withdrawals Possible:</span>
            <span>{numberOfPeriods === Infinity ? '∞ (No withdrawals)' : numberOfPeriods}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Withdrawal Period (Years):</span>
            <span>{(numberOfPeriods / totalPeriodsPerYear).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining Balance after Withdrawals (₹):</span>
            <span>{remainingBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-orange-700 mb-3">What is a Systematic Withdrawal Plan (SWP)?</h2>
        <p className="text-gray-700 mb-4">
          SWP allows you to withdraw a fixed amount from your mutual fund investment at regular intervals
          (monthly, quarterly, or yearly). It helps you generate steady income while your remaining investment
          continues to grow.
        </p>
        <p className="text-gray-700 mb-4">
          This calculator estimates how long your investment will last based on your withdrawal amount,
          expected returns, and withdrawal frequency.
        </p>
        <p className="text-gray-700">
          <strong>Note:</strong> Returns are assumed to compound at the stated rate and withdrawals happen at
          regular intervals. Actual market returns may vary.
        </p>
      </div>
    </div>
    <Footer />
        </>
  );
}
