'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function SukanyaSamriddhiCalculator() {
  // Inputs
  const [yearlyContribution, setYearlyContribution] = useState(10000);
  const [tenure, setTenure] = useState(21); // max maturity tenure for SSY
  const [startYear, setStartYear] = useState(new Date().getFullYear());

  // Fixed rate of interest for SSY as per current govt rates (8.2%)
  const rate = 8.2 / 100;
  const compoundingFrequency = 1; // yearly compounding

  /**
   * Calculates maturity amount for SSY:
   * Since SSY requires yearly contributions for first 14 years at least,
   * and interest compounds yearly,
   * maturity amount = sum of each year's contribution compounded till maturity
   */
  function calculateMaturity() {
    let maturityAmount = 0;

    // Contributions for first 14 years (min)
    const contributionYears = Math.min(tenure, 14);

    for (let year = 0; year < contributionYears; year++) {
      // Each yearly contribution compounds for (tenure - year) years
      maturityAmount += yearlyContribution * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * (tenure - year));
    }

    // If tenure > 14, no new contributions, but previous amount keeps compounding
    if (tenure > 14) {
      const noContributionYears = tenure - 14;
      maturityAmount = maturityAmount * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * noContributionYears);
    }

    return maturityAmount;
  }

  const maturity = calculateMaturity();
  const totalContribution = yearlyContribution * Math.min(tenure, 14);
  const interestEarned = maturity - totalContribution;
  const maturityYear = startYear + tenure;

  return (
    <>
    <ReNavbar/>
    <div className="min-h-screen bg-orange-50 py-10 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">🎯 Sukanya Samriddhi Yojana Calculator</h1>

        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-medium">Yearly Contribution (₹)</label>
            <input
              type="number"
              min={1000}
              value={yearlyContribution}
              onChange={(e) => setYearlyContribution(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
            <small className="text-gray-500">Minimum ₹1000 per year</small>
          </div>

          <div>
            <label className="block text-sm font-medium">Tenure (Years)</label>
            <input
              type="number"
              min={1}
              max={21}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
            <small className="text-gray-500">Maximum 21 years as per scheme rules</small>
          </div>

          <div>
            <label className="block text-sm font-medium">Starting Year</label>
            <input
              type="number"
              min={2000}
              max={2100}
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-6 text-center text-orange-900 font-semibold text-lg">
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{totalContribution.toLocaleString()}</div>
            <div className="mt-1 text-sm font-normal">Total Contribution</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="mt-1 text-sm font-normal">Interest Earned</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">₹{maturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="mt-1 text-sm font-normal">Maturity Amount</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 shadow-sm">
            <div className="text-2xl">{maturityYear}</div>
            <div className="mt-1 text-sm font-normal">Year of Maturity</div>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm text-gray-700">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">About Sukanya Samriddhi Yojana</h2>
        <p className="mb-4">
          Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme aimed at securing the future of the girl child.
          It offers attractive interest rates and tax benefits under Section 80C of the Income Tax Act.
        </p>
        <p className="mb-4">
          This calculator estimates the maturity amount based on your yearly contributions and tenure. Contributions must be
          made at least for 14 years, and the scheme matures after 21 years.
        </p>
        <p>
          The interest is compounded annually, and you can use this tool to plan your investments to meet education or marriage expenses.
        </p>
      </section>
    </div>
    <Footer />
        </>
  );
}
