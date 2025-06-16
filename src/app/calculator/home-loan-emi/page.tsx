'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const HomeLoanEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenureYears, setLoanTenureYears] = useState(5);

  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  const emi =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (num: number) =>
    num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  return (
    <>
    <ReNavbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-orange-200">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">🏠 Home Loan EMI Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-orange-700 font-medium mb-1">Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded"
            min={0}
          />
        </div>

        <div>
          <label className="block text-orange-700 font-medium mb-1">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            step="0.01"
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded"
            min={0}
          />
        </div>

        <div>
          <label className="block text-orange-700 font-medium mb-1">Loan Tenure (Years)</label>
          <input
            type="number"
            value={loanTenureYears}
            onChange={(e) => setLoanTenureYears(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded"
            min={0}
          />
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-300 rounded p-5 text-center">
        <p className="text-xl font-semibold text-orange-600">
          Monthly EMI: <span className="text-2xl">{formatCurrency(emi)}</span>
        </p>
        <p className="mt-3 text-orange-700">
          Total Interest Payable: <strong>{formatCurrency(totalInterest)}</strong>
        </p>
        <p className="text-orange-700">
          Total Payment (Principal + Interest): <strong>{formatCurrency(totalPayment)}</strong>
        </p>
      </div>

      <div className="mt-8 p-4 bg-white border border-orange-100 rounded shadow-inner text-gray-700">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">Home Loan EMI Calculator – Calculate Your Housing Loan EMI Online</h3>

        <p className="mb-3">
          Given the high price of real estate in India, purchasing a house can be a challenging task without external finance. Housing credit grew over 16% in FY18, with many opting for home loans to fund purchases.
        </p>

        <p className="mb-3">
          Knowing your exact EMI amount is vital. A home loan EMI calculator helps calculate this quickly and accurately, saving you time and effort.
        </p>

        <h4 className="font-semibold text-orange-600 mt-4 mb-2">How can a home loan EMI calculator help you?</h4>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Accurately calculates fixed monthly EMI payments based on loan amount, interest rate, and tenure.</li>
          <li>Saves time compared to manual calculations and avoids errors.</li>
          <li>Provides clarity on your monthly financial obligations, aiding better financial planning.</li>
          <li>Specific to home loans with features tailored to real estate financing.</li>
          <li>Free and unlimited use to explore different scenarios.</li>
        </ul>

        <h4 className="font-semibold text-orange-600 mb-2">The formula to determine home loan EMI amount</h4>
        <p className="mb-3">
          The standard formula is:
        </p>
        <pre className="bg-orange-100 p-3 rounded text-sm font-mono">
          E = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> - 1]
        </pre>
        <p className="mb-3">
          Where:
          <br />
          <strong>E</strong> = EMI amount <br />
          <strong>P</strong> = Principal loan amount <br />
          <strong>R</strong> = Monthly interest rate (annual rate / 12 / 100) <br />
          <strong>N</strong> = Loan tenure in months
        </p>

        <h4 className="font-semibold text-orange-600 mb-2">Example</h4>
        <p className="mb-3">
          For a home loan of ₹1 Crore at 12% interest over 15 years, the EMI will be approximately ₹1,10,108.
        </p>

        <h4 className="font-semibold text-orange-600 mb-2">EMI Components</h4>
        <p>
          Each EMI consists of principal and interest components. Initially, the interest part is higher and reduces over time, while the principal component increases as the loan progresses.
        </p>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default HomeLoanEmiCalculator;
