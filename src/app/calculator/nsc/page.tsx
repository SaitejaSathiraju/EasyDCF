'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const NSCCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6);
  const tenure = 5; // fixed 5 years for NSC

  const r = rate / 100;
  const t = tenure;
  const totalAmount = principal * Math.pow(1 + r, t);
  const interestEarned = totalAmount - principal;

  const formatCurrency = (num: number) =>
    num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <>
    <ReNavbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-orange-300">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">📄 NSC Calculator (National Savings Certificate)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-orange-600 font-medium mb-1">Investment Amount (₹)</label>
          <input
            type="number"
            min={100}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Interest Rate (%)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Tenure (Years)</label>
          <input
            type="number"
            disabled
            value={tenure}
            className="w-full p-2 bg-orange-50 border border-orange-300 rounded cursor-not-allowed text-orange-600"
          />
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-300 rounded p-5 text-center">
        <p className="text-xl font-semibold text-orange-700">
          Investment Amount: <span className="text-2xl">{formatCurrency(principal)}</span>
        </p>
        <p className="mt-3 text-orange-800">
          Interest Earned (Compounded Annually): <strong>{formatCurrency(interestEarned)}</strong>
        </p>
        <p className="text-orange-800">
          Maturity Amount (Principal + Interest): <strong>{formatCurrency(totalAmount)}</strong>
        </p>
      </div>

      <section className="mt-8 p-4 bg-white border border-orange-100 rounded shadow-inner text-gray-700">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">About National Savings Certificate (NSC)</h3>

        <p className="mb-3">
          The National Savings Certificate is a fixed income savings scheme backed by the Government of India. It is a popular choice for conservative investors looking for guaranteed returns.
        </p>

        <p className="mb-3">
          NSC interest is compounded annually but paid out only at maturity after a fixed period of 5 years. The minimum investment is ₹100, with no upper limit, and investments up to ₹1.5 lakh qualify for tax deductions under Section 80C.
        </p>

        <h4 className="font-semibold text-orange-600 mb-2">How This Calculator Works</h4>
        <p>
          Enter your investment amount and the applicable interest rate to calculate the maturity amount and total interest earned after the 5-year term. The interest compounds annually, increasing your returns each year.
        </p>

        <h4 className="font-semibold text-orange-600 mt-6 mb-2">Example</h4>
        <p>
          Investing ₹1,00,000 at 6% compounded annually for 5 years will yield interest of ₹33,823, resulting in a maturity amount of ₹1,33,823.
        </p>

        <h4 className="font-semibold text-orange-600 mt-6 mb-2">Benefits of NSC</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Government-backed safety and guaranteed returns.</li>
          <li>Interest compounded annually, enhancing your earnings.</li>
          <li>Tax benefits under Section 80C.</li>
          <li>Accessible via any post office across India.</li>
        </ul>
      </section>
    </div>
    <Footer />
        </>
  );
};

export default NSCCalculator;
