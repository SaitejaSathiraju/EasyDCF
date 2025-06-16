'use client';

import React, { useState } from 'react';
import { ReNavbar } from '@/components/magicui/renav';
import Footer from '@/components/magicui/footer';

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [result, setResult] = useState<{ futureValue: number; totalInvested: number } | null>(null);

  const calculateSIP = () => {
    const P = monthlyInvestment;
    const r = annualReturn / 100 / 12; // monthly rate
    const n = investmentPeriod * 12;   // total months

    const futureValue = P * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
    const totalInvested = P * n;

    setResult({
      futureValue: parseFloat(futureValue.toFixed(2)),
      totalInvested: parseFloat(totalInvested.toFixed(2))
    });
  };

  return (
    <>
      <ReNavbar />
      <div className="min-h-screen bg-white text-gray-800 p-6 md:p-12">
        <div className="max-w-2xl mx-auto bg-orange-50 border border-orange-200 rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-4">SIP Calculator</h1>

          {/* Information Section */}
          <section className="mb-6 text-gray-700 space-y-2">
            <p>
              A <strong>Systematic Investment Plan (SIP)</strong> allows you to invest a fixed amount regularly in mutual funds, helping you build wealth over time through the power of compounding.
            </p>
            <p>
              At <strong>EasyDCF</strong>, we simplify your investment journey by providing intuitive financial tools like this SIP Calculator, helping you make informed decisions and plan your financial future with confidence.
            </p>
          </section>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Monthly Investment (₹)</label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Expected Annual Return (%)</label>
              <input
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Investment Period (Years)</label>
              <input
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              onClick={calculateSIP}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition font-semibold mt-4"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="mt-6 bg-white rounded-lg p-4 border border-orange-200 shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Results</h2>
              <p className="text-gray-700">Total Invested: ₹{result.totalInvested.toLocaleString()}</p>
              <p className="text-gray-700">Estimated Maturity Value: ₹{result.futureValue.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
