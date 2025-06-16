'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function SCSSCalculator() {
  const [amount, setAmount] = useState(10000);
  const [tenure, setTenure] = useState(5);
  const [rate, setRate] = useState(8.2);

  const quarterlyInterest = (amount * rate) / (100 * 4); // Quarterly interest
  const totalInterest = quarterlyInterest * tenure * 4;
  const maturityAmount = amount + totalInterest;

  return (
    <>
    <ReNavbar/>
    <div className="max-w-md mx-auto p-6 bg-white border border-orange-200 shadow-md rounded-xl space-y-6">
      <h2 className="text-2xl font-semibold text-orange-600 text-center">
        SCSS Calculator
      </h2>

      <div className="grid gap-4">
        <Input label="Investment Amount (₹)" value={amount} onChange={setAmount} />
        <Input label="Tenure (Years)" value={tenure} onChange={setTenure} />
        <Input label="Annual Interest Rate (%)" value={rate} onChange={setRate} />
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-1 text-orange-700 font-medium">
        <p>📅 Quarterly Interest: ₹ {quarterlyInterest.toFixed(0).toLocaleString()}</p>
        <p>📈 Total Interest Earned: ₹ {totalInterest.toFixed(0).toLocaleString()}</p>
        <p>💰 Maturity Amount: ₹ {maturityAmount.toFixed(0).toLocaleString()}</p>
      </div>
    </div>
    <Footer />
        </>
  );
}

function Input({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <>
    <div>
      <label className="block mb-1 text-sm font-medium text-orange-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      />
    </div>
    <Footer />
        </>
  );
}
