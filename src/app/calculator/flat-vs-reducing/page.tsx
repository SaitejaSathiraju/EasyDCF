'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const FlatVsReducingCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenureYears, setTenureYears] = useState(12);
  const [method, setMethod] = useState<'flat' | 'reducing'>('flat');

  // Flat Interest calculations
  const totalInterestFlat = (principal * interestRate * tenureYears) / 100;
  const totalPaymentFlat = principal + totalInterestFlat;
  const monthlyEmiFlat = totalPaymentFlat / (tenureYears * 12);

  // Reducing Interest calculations
  const monthlyInterestRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  const monthlyEmiReducing =
    (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const totalPaymentReducing = monthlyEmiReducing * totalMonths;
  const totalInterestReducing = totalPaymentReducing - principal;

  // Calculate savings if you choose reducing over flat
  const savings = totalInterestFlat - totalInterestReducing;

  // Display values depending on selected method
  const emi = method === 'flat' ? monthlyEmiFlat : monthlyEmiReducing;
  const totalInterest = method === 'flat' ? totalInterestFlat : totalInterestReducing;
  const totalPayment = method === 'flat' ? totalPaymentFlat : totalPaymentReducing;

  return (
    <>
    <ReNavbar />
    <div className="max-w-md mx-auto p-6 bg-white border border-orange-400 rounded-lg shadow-sm">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">Flat vs Reducing Rate Calculator</h2>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-orange-700">Principal Amount (₹)</label>
        <input
          type="number"
          min={0}
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter principal amount"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-orange-700">Interest Rate (%)</label>
        <input
          type="number"
          min={0}
          step={0.01}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter annual interest rate"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-orange-700">Tenure (Years)</label>
        <input
          type="number"
          min={1}
          value={tenureYears}
          onChange={(e) => setTenureYears(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter tenure in years"
        />
      </div>

      {/* Method selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-orange-700">Select Interest Calculation Method</label>
        <div className="flex gap-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="method"
              value="flat"
              checked={method === 'flat'}
              onChange={() => setMethod('flat')}
              className="form-radio text-orange-600"
            />
            <span className="ml-2 text-orange-700 font-semibold">Flat Rate</span>
          </label>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="method"
              value="reducing"
              checked={method === 'reducing'}
              onChange={() => setMethod('reducing')}
              className="form-radio text-orange-600"
            />
            <span className="ml-2 text-orange-700 font-semibold">Reducing Balance</span>
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="bg-orange-50 p-5 rounded-md border border-orange-300 text-orange-800 font-semibold text-lg text-center">
        <p>Monthly EMI: <span className="text-orange-600">₹ {emi.toFixed(0)}</span></p>
        <p className="mt-2">Total Interest Payable: <span className="text-orange-600">₹ {totalInterest.toFixed(0)}</span></p>
        <p className="mt-2">Total Amount to be Paid: <span className="text-orange-600">₹ {totalPayment.toFixed(0)}</span></p>
      </div>

      {/* Savings highlight */}
      {method === 'reducing' && savings > 0 && (
        <div className="mt-4 text-center text-green-700 font-bold">
          You save approximately ₹{savings.toFixed(0)} in interest compared to Flat Rate!
        </div>
      )}

      {/* Info section */}
      <section className="mt-8 p-4 bg-white border border-orange-100 rounded-md text-orange-700 text-sm">
        <h3 className="font-bold mb-2 text-orange-600">About Flat vs Reducing Rate</h3>
        <p>
          Flat interest is calculated on the entire principal amount throughout the loan tenure.
          Reducing balance interest is calculated on the outstanding loan balance and generally results in less interest paid.
        </p>
        <p className="mt-2">
          Use this calculator to compare monthly payments and total interest payable for each method before choosing a loan.
        </p>
      </section>
    </div>
    <Footer/>
        </>
  );
};

export default FlatVsReducingCalculator;
