"use client" ;
import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const RDCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState(7.0);
  const [years, setYears] = useState(5);
  const [isSenior, setIsSenior] = useState(false);

  const calculateRD = () => {
    const months = years * 12;
    const finalRate = isSenior ? interestRate + 0.5 : interestRate;
    const r = finalRate / 400;
    const maturityAmount =
      (monthlyDeposit * ((1 + r) ** months - 1)) / (1 - (1 + r) ** (-1 / 3));
    const totalDeposits = monthlyDeposit * months;
    const interestEarned = maturityAmount - totalDeposits;

    return {
      totalDeposits,
      interestEarned,
      maturityAmount,
    };
  };

  const { totalDeposits, interestEarned, maturityAmount } = calculateRD();

  return (
    <>
    <ReNavbar />
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border border-orange-200">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Recurring Deposit Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-orange-700">Monthly Deposit (₹)</label>
          <input
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
            className="w-full border border-orange-300 rounded px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-700">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full border border-orange-300 rounded px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-700">Tenure (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border border-orange-300 rounded px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="flex items-center mt-6 md:mt-0">
          <input
            type="checkbox"
            checked={isSenior}
            onChange={() => setIsSenior(!isSenior)}
            className="form-checkbox text-orange-500"
          />
          <label className="ml-2 text-sm text-orange-700">Senior Citizen (+0.5% Interest)</label>
        </div>
      </div>

      <div className="mt-8 bg-orange-50 p-4 rounded-md border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-600 mb-2">Maturity Details</h3>
        <p><strong>Total Deposits:</strong> ₹{totalDeposits.toFixed(2)}</p>
        <p><strong>Interest Earned:</strong> ₹{interestEarned.toFixed(2)}</p>
        <p><strong>Maturity Amount:</strong> ₹{maturityAmount.toFixed(2)}</p>
      </div>

      <div className="mt-8 text-sm text-gray-700 leading-relaxed">
        <h4 className="text-md font-bold text-orange-500 mb-1">📘 About RD</h4>
        <p>
          A Recurring Deposit (RD) is a savings scheme where you invest a fixed amount monthly for a fixed period.
          Interest is compounded quarterly, and the final amount includes both principal and accrued interest.
        </p>

        <h4 className="text-md font-bold text-orange-500 mt-4 mb-1">📐 RD Formula</h4>
        <p>
          M = R × [(1 + i)<sup>n</sup> - 1] / [1 - (1 + i)<sup>-1/3</sup>]
          <br />
          Where:
          <ul className="list-disc list-inside ml-2">
            <li><strong>R</strong> = Monthly deposit</li>
            <li><strong>i</strong> = Rate/400</li>
            <li><strong>n</strong> = Tenure in months</li>
          </ul>
        </p>

        <h4 className="text-md font-bold text-orange-500 mt-4 mb-1">📌 Tax Info</h4>
        <p>
          Interest earned is taxable under “Income from Other Sources”. TDS is applicable if interest exceeds ₹40,000 (₹50,000 for seniors).
          Submit Form 15G/15H to avoid TDS if eligible.
        </p>
      </div>
    </div>
    <Footer />
        </>
  );
};

export default RDCalculator;
