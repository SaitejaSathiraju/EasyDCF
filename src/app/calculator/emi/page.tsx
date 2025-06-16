'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenureYears, setLoanTenureYears] = useState(5);

  // EMI Calculation formula
  // EMI = [P x R x (1+R)^N] / [(1+R)^N – 1]
  // P = principal, R = monthly interest rate, N = number of months

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
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">💸 EMI Calculator</h2>

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
        <h3 className="text-2xl font-bold text-orange-500 mb-4">About EMI Calculators</h3>

        <p className="mb-3">
          The credit market in India is rapidly growing with loans for various purposes like home, car,
          personal, education, and more. Calculating your EMI (Equated Monthly Installment) accurately is
          crucial to planning your finances well.
        </p>

        <p className="mb-3">
          EMI depends on the loan amount, interest rate, and tenure. A longer tenure reduces EMI but increases
          total interest paid, while a higher interest rate raises both EMI and total interest.
        </p>

        <p className="mb-3">
          Using an online EMI calculator helps you avoid manual errors and plan your loan repayment efficiently.
          It also helps compare different loan options by adjusting the variables.
        </p>

        <h4 className="font-semibold text-orange-600 mt-4 mb-2">Types of EMI Calculators:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Home Loan EMI Calculator</li>
          <li>Car Loan EMI Calculator</li>
          <li>Personal Loan EMI Calculator</li>
          <li>Education Loan EMI Calculator</li>
          <li>Loan Against Property EMI Calculator</li>
        </ul>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default EmiCalculator;
