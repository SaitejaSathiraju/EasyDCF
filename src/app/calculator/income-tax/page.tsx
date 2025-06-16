'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const assessmentYears = [
  { label: 'FY 2024-25 (AY 2025-26)', value: '2025-26' },
  { label: 'FY 2025-26 (AY 2026-27)', value: '2026-27' },
  // Add more as needed
];

const ageCategories = [
  { label: 'Below 60 years', value: 'below60' },
  { label: '60 to 80 years (Senior Citizen)', value: '60to80' },
  { label: 'Above 80 years (Super Senior Citizen)', value: 'above80' },
];

type TaxSlab = { upto: number; rate: number };

const newRegimeSlabs: TaxSlab[] = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.10 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.20 },
  { upto: 2400000, rate: 0.25 },
  { upto: Infinity, rate: 0.30 },
];

// For simplicity, old regime slabs are kept similar but you can adjust as needed.
const oldRegimeSlabs: TaxSlab[] = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 0.05 },
  { upto: 1000000, rate: 0.20 },
  { upto: Infinity, rate: 0.30 },
];

// Standard Deduction for salary under old regime
const standardDeductionOld = 75000;

const IncomeTaxCalculator = () => {
  const [assessmentYear, setAssessmentYear] = useState('2026-27');
  const [ageCategory, setAgeCategory] = useState('below60');
  const [grossSalary, setGrossSalary] = useState(1800000);
  const [otherIncome, setOtherIncome] = useState(35000);
  const [deductions, setDeductions] = useState(150000);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [taxResult, setTaxResult] = useState<null | { totalTax: number; slabDetails: string[] }>(null);

  // Helper: format number as INR currency
  const formatCurrency = (num: number) =>
    num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const calculateTaxForSlabs = (taxableIncome: number, slabs: TaxSlab[]) => {
    let tax = 0;
    const slabDetails: string[] = [];

    let prevLimit = 0;
    for (const slab of slabs) {
      if (taxableIncome <= prevLimit) break;
      const taxableAtThisSlab = Math.min(taxableIncome, slab.upto) - prevLimit;
      if (taxableAtThisSlab > 0 && slab.rate > 0) {
        const taxAtSlab = taxableAtThisSlab * slab.rate;
        slabDetails.push(
          `${formatCurrency(taxableAtThisSlab)} taxed at ${slab.rate * 100}% = ${formatCurrency(taxAtSlab)}`
        );
        tax += taxAtSlab;
      }
      prevLimit = slab.upto;
    }
    return { tax, slabDetails };
  };

  const calculateIncomeTax = () => {
    // Calculate taxable income based on regime
    let taxableIncome = grossSalary + otherIncome;

    if (taxRegime === 'old') {
      taxableIncome -= standardDeductionOld;
      taxableIncome -= deductions; // Apply deductions u/s 80C, 80D, etc.
      if (taxableIncome < 0) taxableIncome = 0;
      const { tax, slabDetails } = calculateTaxForSlabs(taxableIncome, oldRegimeSlabs);

      // Apply rebate under Section 87A if income <= 5 lakh in old regime (standard)
      const rebate = taxableIncome <= 500000 ? Math.min(tax, 12500) : 0;

      // Add 4% cess on (tax - rebate)
      const cess = 0.04 * Math.max(tax - rebate, 0);

      const totalTax = Math.max(tax - rebate, 0) + cess;

      setTaxResult({ totalTax, slabDetails });
    } else {
      // New regime
      taxableIncome -= deductions; // Deductions not usually allowed, but if applicable
      if (taxableIncome < 0) taxableIncome = 0;
      const { tax, slabDetails } = calculateTaxForSlabs(taxableIncome, newRegimeSlabs);

      // Rebate for income up to 12 lakh is 100% (tax liability nil)
      const rebate = taxableIncome <= 1200000 ? tax : 0;

      // Add 4% cess
      const cess = 0.04 * Math.max(tax - rebate, 0);

      const totalTax = Math.max(tax - rebate, 0) + cess;

      setTaxResult({ totalTax, slabDetails });
    }
  };

  return (
    <>
    <ReNavbar/>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-orange-300">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">💰 Income Tax Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div>
          <label className="block text-orange-600 font-medium mb-1">Assessment Year</label>
          <select
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={assessmentYear}
            onChange={(e) => setAssessmentYear(e.target.value)}
          >
            {assessmentYears.map((ay) => (
              <option key={ay.value} value={ay.value}>
                {ay.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Age Category</label>
          <select
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={ageCategory}
            onChange={(e) => setAgeCategory(e.target.value)}
          >
            {ageCategories.map((age) => (
              <option key={age.value} value={age.value}>
                {age.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Tax Regime</label>
          <select
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={taxRegime}
            onChange={(e) => setTaxRegime(e.target.value as 'old' | 'new')}
          >
            <option value="new">New Regime</option>
            <option value="old">Old Regime</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div>
          <label className="block text-orange-600 font-medium mb-1">Gross Salary (Annual ₹)</label>
          <input
            type="number"
            min={0}
            value={grossSalary}
            onChange={(e) => setGrossSalary(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. 1800000"
          />
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Other Income (Annual ₹)</label>
          <input
            type="number"
            min={0}
            value={otherIncome}
            onChange={(e) => setOtherIncome(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. 35000"
          />
        </div>

        <div>
          <label className="block text-orange-600 font-medium mb-1">Deductions (₹)</label>
          <input
            type="number"
            min={0}
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
            className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. 150000"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={calculateIncomeTax}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded shadow transition"
        >
          CALCULATE
        </button>
      </div>

      {taxResult && (
        <div className="mt-8 p-6 bg-orange-50 border border-orange-300 rounded shadow-inner text-orange-800">
          <h3 className="text-2xl font-semibold mb-4">Tax Calculation Summary</h3>
          <div className="space-y-2 mb-4">
            {taxResult.slabDetails.map((detail, idx) => (
              <p key={idx}>{detail}</p>
            ))}
          </div>
          <p className="font-bold text-xl">
            Total Tax Payable (including 4% cess): {formatCurrency(taxResult.totalTax)}
          </p>
        </div>
      )}

      <section className="mt-10 p-5 bg-white border border-orange-100 rounded shadow-inner text-gray-700">
        <h3 className="text-xl font-bold text-orange-500 mb-3">How to Use This Calculator</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Select the assessment year and your age category.</li>
          <li>Choose the tax regime (Old or New).</li>
          <li>Enter your gross annual salary, other income, and deductions.</li>
          <li>Click &quot;Calculate&quot; to see the tax liability and slab-wise breakdown.</li>
          <li>Use this to plan your finances and tax-saving investments accordingly.</li>
        </ul>
      </section>
    </div>
    <Footer/>
        </>
  );
};

export default IncomeTaxCalculator;
