'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const EquityMarginCalculator = () => {
  const [orderValue, setOrderValue] = useState(100000); // default ₹1,00,000
  const [marginPercent, setMarginPercent] = useState(20); // default 20%

  // Calculate margin required
  const marginRequired = (orderValue * marginPercent) / 100;
  // Remaining amount to be paid from your pocket
  const remainingAmount = orderValue - marginRequired;

  return (
    <>
    <ReNavbar/>
    <div className="max-w-lg mx-auto p-6 bg-white border border-orange-400 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
        Equity Margin Calculator
      </h2>

      <div className="mb-4">
        <label htmlFor="orderValue" className="block mb-2 font-semibold text-orange-700">
          Total Order Value (₹)
        </label>
        <input
          type="number"
          id="orderValue"
          min={0}
          value={orderValue}
          onChange={(e) => setOrderValue(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter total order value"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="marginPercent" className="block mb-2 font-semibold text-orange-700">
          Margin Percentage (%)
        </label>
        <input
          type="number"
          id="marginPercent"
          min={0}
          max={100}
          value={marginPercent}
          onChange={(e) => setMarginPercent(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter margin percentage"
        />
      </div>

      <div className="bg-orange-50 p-5 rounded-md border border-orange-300 text-orange-800 font-semibold text-lg">
        <p>
          Margin Required:{' '}
          <span className="text-orange-700">₹ {marginRequired.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </p>
        <p className="mt-2">
          Remaining Amount to be Paid:{' '}
          <span className="text-orange-700">₹ {remainingAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </p>
      </div>

      <section className="mt-6 p-4 bg-white border border-orange-100 rounded-md text-orange-700 text-sm">
        <h3 className="font-bold mb-2 text-orange-600">What is Equity Margin?</h3>
        <p>
          Equity Margin is the amount you need to pay upfront to take a position in the equity market.
          The margin percentage depends on the broker and regulatory requirements. The remaining amount
          is financed by the broker, allowing you to leverage your investment.
        </p>
      </section>
    </div>
    <Footer />
        </>
  );
};

export default EquityMarginCalculator;
