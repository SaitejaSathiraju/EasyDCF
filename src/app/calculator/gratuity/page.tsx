'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const GratuityCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(60000); // basic + DA monthly
  const [yearsOfService, setYearsOfService] = useState(20); // years worked
  const [gratuity, setGratuity] = useState<number | null>(null);

  // Cap gratuity at 10 lakhs
  const GRATUITY_CAP = 1000000;

  const calculateGratuity = () => {
    // Round years to nearest integer
    const n = Math.round(yearsOfService);
    const b = basicSalary;

    const G = n * b * 15 / 26;

    // Cap gratuity
    const cappedG = G > GRATUITY_CAP ? GRATUITY_CAP : G;

    setGratuity(cappedG);
  };

  return (
    <>
    <ReNavbar/>
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-orange-300">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">🎁 Gratuity Calculator</h2>

      <div className="mb-5">
        <label className="block text-orange-600 font-medium mb-2">Basic Salary + DA (Monthly ₹)</label>
        <input
          type="number"
          min={0}
          value={basicSalary}
          onChange={(e) => setBasicSalary(Number(e.target.value))}
          className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="e.g. 60000"
        />
      </div>

      <div className="mb-5">
        <label className="block text-orange-600 font-medium mb-2">Years of Service</label>
        <input
          type="number"
          min={0}
          step={0.1}
          value={yearsOfService}
          onChange={(e) => setYearsOfService(Number(e.target.value))}
          className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="e.g. 20"
        />
        <p className="text-sm text-gray-600 mt-1 italic">Rounded to nearest year for calculation</p>
      </div>

      <button
        onClick={calculateGratuity}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded shadow transition"
      >
        CALCULATE GRATUITY
      </button>

      {gratuity !== null && (
        <div className="mt-8 p-5 bg-orange-50 border border-orange-300 rounded text-orange-800 font-semibold text-xl text-center">
          Your estimated gratuity amount is <br />
          <span className="text-3xl">{gratuity.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
        </div>
      )}

      <section className="mt-10 p-5 bg-white border border-orange-100 rounded shadow-inner text-gray-700 text-sm">
        <h3 className="text-orange-500 font-bold mb-2">Notes:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Gratuity capped at ₹10,00,000 under the Payment of Gratuity Act.</li>
          <li>You must have completed at least 5 years of continuous service to be eligible.</li>
          <li>If service includes months, the years are rounded to nearest whole number.</li>
          <li>Gratuity amount for government employees is tax-exempt.</li>
          <li>For private sector, tax exemption is limited to prescribed limits under the Act.</li>
        </ul>
      </section>
    </div>
    <Footer/>
        </>
  );
};

export default GratuityCalculator;
