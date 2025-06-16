'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(25000);
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [inflationRate, setInflationRate] = useState(6);
  const [investmentReturn, setInvestmentReturn] = useState(10);

  const retirementCorpus = () => {
    const yearsLeft = retirementAge - currentAge;
    const yearsPostRetirement = lifeExpectancy - retirementAge;

    const inflatedExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsLeft);
    const annualExpense = inflatedExpense * 12;

    const corpusRequired =
      annualExpense *
      ((1 - Math.pow(1 + investmentReturn / 100, -yearsPostRetirement)) /
        (investmentReturn / 100));

    return corpusRequired;
  };

  const monthlyInvestmentRequired = () => {
    const futureValue = retirementCorpus();
    const n = (retirementAge - currentAge) * 12;
    const r = investmentReturn / 100 / 12;
    const investment = (futureValue * r) / (Math.pow(1 + r, n) - 1);
    return investment;
  };

  const formattedCorpus = retirementCorpus().toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const formattedMonthly = monthlyInvestmentRequired().toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  return (
    <>
    <ReNavbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-orange-200">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">🧓 Retirement Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-orange-700 font-medium">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-orange-700 font-medium">Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-orange-700 font-medium">Current Monthly Expense (₹)</label>
          <input
            type="number"
            value={monthlyExpense}
            onChange={(e) => setMonthlyExpense(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-orange-700 font-medium">Expected Life Expectancy</label>
          <input
            type="number"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-orange-700 font-medium">Expected Inflation Rate (%)</label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-orange-700 font-medium">Expected Investment Return (%)</label>
          <input
            type="number"
            value={investmentReturn}
            onChange={(e) => setInvestmentReturn(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded mt-1"
          />
        </div>
      </div>

      <div className="mt-6 bg-orange-50 border border-orange-300 rounded p-4 text-center">
        <p className="text-lg font-semibold text-orange-600">
          Estimated Retirement Corpus: {formattedCorpus}
        </p>
        <p className="text-lg font-semibold text-orange-600 mt-2">
          Monthly Investment Required: {formattedMonthly}
        </p>
      </div>
    </div>
    <Footer />
        </>
  );
};

export default RetirementCalculator;
