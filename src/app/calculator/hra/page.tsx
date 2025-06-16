"use client";
import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const HraCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [isMetro, setIsMetro] = useState(false);
  const [exemptHRA, setExemptHRA] = useState<number | null>(null);

  const calculateHRA = () => {
    const actualRentMinus10Percent = Math.max(0, rentPaid - (0.1 * basicSalary));
    const metroPercentage = isMetro ? 0.5 : 0.4;
    const percentOfBasic = metroPercentage * basicSalary;

    const exemption = Math.min(hraReceived, actualRentMinus10Percent, percentOfBasic);
    setExemptHRA(exemption);
  };

  return (
    <>
    <ReNavbar/>
    <div className="min-h-screen bg-white text-orange-600 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-orange-50 shadow-md border border-orange-200 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">🏠 HRA Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Basic Salary (₹)</label>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
              className="w-full mt-1 px-4 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your basic salary"
            />
          </div>

          <div>
            <label className="block font-semibold">HRA Received (₹)</label>
            <input
              type="number"
              value={hraReceived}
              onChange={(e) => setHraReceived(parseFloat(e.target.value))}
              className="w-full mt-1 px-4 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter HRA received"
            />
          </div>

          <div>
            <label className="block font-semibold">Rent Paid (₹)</label>
            <input
              type="number"
              value={rentPaid}
              onChange={(e) => setRentPaid(parseFloat(e.target.value))}
              className="w-full mt-1 px-4 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter rent paid"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isMetro}
              onChange={() => setIsMetro(!isMetro)}
              className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-orange-300 rounded"
              id="metro"
            />
            <label htmlFor="metro" className="font-semibold">Do you live in a metro city?</label>
          </div>

          <button
            onClick={calculateHRA}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            Calculate HRA Exemption
          </button>
        </div>

        {exemptHRA !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-orange-600">💰 HRA Exempted: ₹{exemptHRA.toLocaleString()}</h2>
            <p className="text-sm text-gray-600 mt-2">This amount is exempt from taxable income.</p>
          </div>
        )}
      </div>

      {/* Informational Section */}
      <div className="max-w-3xl mx-auto mt-10 text-gray-800">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">What is HRA?</h2>
        <p className="mb-4">
          House Rent Allowance (HRA) is a component of your salary given by your employer to help you cover the cost of renting a home. You can claim tax exemption on HRA under Section 10(13A) of the Income Tax Act.
        </p>

        <h3 className="text-xl font-semibold text-orange-500 mb-2">How is HRA Exemption Calculated?</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Actual HRA received from the employer</li>
          <li>50% of basic salary (for metro cities) or 40% (non-metro cities)</li>
          <li>Rent paid minus 10% of basic salary</li>
        </ul>
        <p className="mb-4">
          The lowest of these three amounts is considered as the HRA exemption for tax purposes.
        </p>

        <h3 className="text-xl font-semibold text-orange-500 mb-2">Eligibility Criteria:</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>You must be a salaried employee</li>
          <li>You must be paying rent for your accommodation</li>
          <li>HRA should be part of your salary structure</li>
        </ul>

        <p className="mb-4">
          Using an HRA Calculator helps you know exactly how much exemption you can claim, helping you save on income tax and plan finances better.
        </p>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default HraCalculator;
