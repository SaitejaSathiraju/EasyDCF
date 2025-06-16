'use client';

import React, { useState,  } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState(600000);
  const [bonusPercent, setBonusPercent] = useState(15);
  const [profTax, setProfTax] = useState(200);
  const [employerPf, setEmployerPf] = useState(1800);
  const [employeePf, setEmployeePf] = useState(1800);
  const [addDeduction1, setAddDeduction1] = useState(0);
  const [addDeduction2, setAddDeduction2] = useState(0);

  const bonus = (ctc * bonusPercent) / 100;
  const grossSalary = ctc - bonus;

  const monthlyDeductions = profTax + employerPf + employeePf + addDeduction1 + addDeduction2;
  const annualDeductions = monthlyDeductions * 12;

  const netAnnualSalary = grossSalary - annualDeductions;
  const netMonthlySalary = netAnnualSalary / 12;

  return (
    <>
    <ReNavbar/>
    <div className="max-w-xl mx-auto p-6 bg-white border border-orange-400 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
        Salary Calculator
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <InputField label="Cost to Company (CTC)" value={ctc} onChange={setCtc} />
        <InputField label="Bonus Included in CTC (%)" value={bonusPercent} onChange={setBonusPercent} />
        <InputField label="Monthly Professional Tax" value={profTax} onChange={setProfTax} />
        <InputField label="Monthly Employer PF" value={employerPf} onChange={setEmployerPf} />
        <InputField label="Monthly Employee PF" value={employeePf} onChange={setEmployeePf} />
        <InputField label="Monthly Additional Deduction (Optional)" value={addDeduction1} onChange={setAddDeduction1} />
        <InputField label="Monthly Additional Deduction (Optional)" value={addDeduction2} onChange={setAddDeduction2} />
      </div>

      <div className="bg-orange-50 p-5 rounded-md border border-orange-300 text-orange-800 font-medium space-y-2">
        <p>Annual Gross Salary (Excl. Bonus): ₹ {grossSalary.toLocaleString()}</p>
        <p>Total Annual Deductions: ₹ {annualDeductions.toLocaleString()}</p>
        <p className="font-semibold text-lg text-orange-700">
          Net Annual Take-Home Salary: ₹ {netAnnualSalary.toLocaleString()}
        </p>
        <p className="font-semibold text-lg text-orange-700">
          Net Monthly Take-Home Salary: ₹ {netMonthlySalary.toFixed(2)}
        </p>
      </div>
    </div>
    </>
  );
}

function InputField({ label, value, onChange }: { label: string; value: number; onChange: (val: number) => void }) {
  return (
    <>
    <div>
      <label className="block mb-1 text-sm font-semibold text-orange-700">{label}</label>
      <input
        type="number"
        className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
    <Footer />
        </>
  );
}
