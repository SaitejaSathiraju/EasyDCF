"use client";
import React, { useState } from "react";
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const EPFCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(30000);
  const [employeeRate, setEmployeeRate] = useState(12); // 12% standard
  const [employerRate, setEmployerRate] = useState(3.67); // EPF portion from employer
  const [duration, setDuration] = useState(20); // in years
  const [interestRate, setInterestRate] = useState(8.15); // EPF interest rate

  const calculateEPF = () => {
    const monthlySalary = basicSalary;
    const monthlyEmployeeContribution = (employeeRate / 100) * monthlySalary;
    const monthlyEmployerContribution = (employerRate / 100) * monthlySalary;

    let totalContribution = 0;
    let epfBalance = 0;

    const months = duration * 12;
    const monthlyInterestRate = interestRate / (12 * 100);

    for (let i = 0; i < months; i++) {
      totalContribution += monthlyEmployeeContribution + monthlyEmployerContribution;
      epfBalance = (epfBalance + monthlyEmployeeContribution + monthlyEmployerContribution) * (1 + monthlyInterestRate);
    }

    return {
      totalContribution: totalContribution.toFixed(0),
      maturityAmount: epfBalance.toFixed(0),
      interestEarned: (epfBalance - totalContribution).toFixed(0),
    };
  };

  const { totalContribution, maturityAmount, interestEarned } = calculateEPF();

  return (
    <>
    <ReNavbar/>
    <div className="min-h-screen bg-orange-50 px-4 py-12 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">EPF Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Monthly Basic Salary (₹)</label>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Employee Contribution (%)</label>
              <input
                type="number"
                value={employeeRate}
                onChange={(e) => setEmployeeRate(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Employer Contribution (%)</label>
              <input
                type="number"
                value={employerRate}
                onChange={(e) => setEmployerRate(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Investment Duration (Years)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mt-8 bg-orange-100 p-4 rounded">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">Results:</h2>
          <p><strong>Total Contribution:</strong> ₹{totalContribution}</p>
          <p><strong>Interest Earned:</strong> ₹{interestEarned}</p>
          <p><strong>Maturity Amount:</strong> ₹{maturityAmount}</p>
        </div>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default EPFCalculator;
