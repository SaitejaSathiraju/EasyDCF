'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const APYCalculator = () => {
  const [joiningAge, setJoiningAge] = useState(25);
  const [desiredPension, setDesiredPension] = useState(1000);

  // Pension starts at 60
  const retirementAge = 60;

  // Constants (These are example assumptions)
  const expectedAnnualReturnRate = 0.08; // 8% per annum approx.
  const compoundingFrequency = 12; // monthly compounding

  // Duration in years from joining age till 60
  const investmentYears = retirementAge - joiningAge;

  // Formula to calculate monthly contribution (PMT) needed to achieve desired corpus for pension payout.
  // For simplicity, assuming pension corpus required = desiredPension * 12 * 20 (assuming 20 years pension payout)
  // This is a simplified approach, as actual annuity calculations can be complex.

  const corpusRequired = desiredPension * 12 * 20; // total corpus needed

  // Calculate monthly contribution using formula for future value of annuity:
  // FV = P * [ ((1 + r)^n - 1) / r ]
  // => P = FV * r / [ (1 + r)^n - 1 ]
  // r = monthly interest rate
  const monthlyInterestRate = expectedAnnualReturnRate / compoundingFrequency;
  const n = investmentYears * compoundingFrequency;

  const monthlyContribution =
    (corpusRequired * monthlyInterestRate) /
    (Math.pow(1 + monthlyInterestRate, n) - 1);

  // Total invested amount = monthlyContribution * n
  const totalInvestment = monthlyContribution * n;

  return (
    <>
    <ReNavbar />
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-orange-300">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">🧮 Atal Pension Yojana Calculator</h2>

      <div className="mb-5">
        <label className="block text-orange-600 font-medium mb-2">Your Joining Age (yrs)</label>
        <input
          type="number"
          min={18}
          max={60}
          value={joiningAge}
          onChange={(e) => setJoiningAge(Number(e.target.value))}
          className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter your age"
        />
      </div>

      <div className="mb-5">
        <label className="block text-orange-600 font-medium mb-2">Desired Monthly Pension (₹)</label>
        <input
          type="number"
          min={1000}
          step={500}
          value={desiredPension}
          onChange={(e) => setDesiredPension(Number(e.target.value))}
          className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="e.g., 1000"
        />
      </div>

      <div className="mt-8 p-5 bg-orange-50 border border-orange-300 rounded text-orange-800 font-semibold text-center space-y-3">
        <p>
          <strong>Investment Duration:</strong> {investmentYears} {investmentYears === 1 ? 'year' : 'years'}
        </p>
        <p>
          <strong>Estimated Monthly Contribution:</strong>{' '}
          {monthlyContribution > 0
            ? monthlyContribution.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
            : 'N/A'}
        </p>
        <p>
          <strong>Total Investment Amount:</strong>{' '}
          {totalInvestment > 0
            ? totalInvestment.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
            : 'N/A'}
        </p>
      </div>

      <section className="mt-10 p-5 bg-white border border-orange-100 rounded shadow-inner text-gray-700 text-sm">
        <h3 className="text-orange-500 font-bold mb-2">About APY Calculator</h3>
        <p>
          The Atal Pension Yojana (APY) calculator estimates how much you need to contribute monthly
          to receive your desired pension starting at age 60. It helps plan your retirement
          savings effectively by showing investment duration, monthly contributions, and total amount invested.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default APYCalculator;
