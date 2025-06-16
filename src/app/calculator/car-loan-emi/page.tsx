'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const CarLoanEmiCalculator = () => {
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
    <ReNavbar />
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-orange-200">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">🚗 Car Loan EMI Calculator</h2>

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
        <h3 className="text-2xl font-bold text-orange-500 mb-4">About Car Loan EMI Calculator</h3>

        <p className="mb-3">
          India is the world&apos;s 4th largest market for 4-wheelers with steady growth of 9.5% annually. With
          many opting for car loans, an easy-to-use car loan EMI calculator is invaluable to plan your purchase.
        </p>

        <p className="mb-3">
          Our calculator helps you understand how much funding you require, the monthly EMIs, total interest,
          and total payment over your loan tenure.
        </p>

        <h4 className="font-semibold text-orange-600 mt-4 mb-2">Benefits of Using a Car Loan EMI Calculator:</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Save time and effort with instant calculations based on your inputs.</li>
          <li>Get accurate EMI values without manual errors.</li>
          <li>Plan your finances better by knowing your monthly commitments.</li>
          <li>Understand the impact of changing interest rates, loan amounts, and tenure.</li>
          <li>Break down your total payable amount by principal and interest components.</li>
        </ul>

        <h4 className="font-semibold text-orange-600 mt-6 mb-2">How is EMI Calculated?</h4>
        <p className="mb-3">
          We use the standard formula:
        </p>
        <pre className="bg-orange-100 p-3 rounded text-sm font-mono">
          EMI = [P × R × (1+R)<sup>n</sup>] / [(1+R)<sup>n</sup> – 1]
        </pre>
        <p className="mb-3">
          Where:
          <br />
          <strong>P</strong> = Loan principal amount <br />
          <strong>R</strong> = Monthly interest rate (annual rate / 12 / 100) <br />
          <strong>n</strong> = Loan tenure in months
        </p>

        <h4 className="font-semibold text-orange-600 mt-6 mb-2">Amortization Schedule</h4>
        <p className="mb-3">
          An amortization schedule breaks down your monthly payments into interest and principal amounts over time.
          Initially, interest makes up a larger portion which gradually decreases as principal repayment increases.
        </p>
          <p className="mb-3 italic text-sm text-orange-700">
          For example, on an ₹8 Lakh car loan at 9.5% interest for 5 years, monthly payments remain fixed but
          principal and interest portions vary each month.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CarLoanEmiCalculator;
