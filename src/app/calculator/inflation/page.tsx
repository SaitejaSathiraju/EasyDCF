'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);

  const adjustedAmount = amount * Math.pow(1 + rate / 100, years);
  const valueLost = adjustedAmount - amount;

  return (
    <>
    <ReNavbar/>
    <div className="max-w-md mx-auto bg-white border border-orange-300 shadow-md rounded-lg p-6 space-y-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center">
        Inflation Calculator
      </h1>

      <div className="grid gap-4">
        <Input label="Current Amount (₹)" value={amount} onChange={setAmount} />
        <Input label="Inflation Rate (%)" value={rate} onChange={setRate} />
        <Input label="Time Period (Years)" value={years} onChange={setYears} />
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-md p-5 text-orange-800 font-medium space-y-2">
        <p>Present Value: ₹ {amount.toLocaleString()}</p>
        <p>Value Lost to Inflation: ₹ {valueLost.toFixed(0).toLocaleString()}</p>
        <p className="text-lg font-semibold">
          Future Equivalent Required: ₹ {adjustedAmount.toFixed(0).toLocaleString()}
        </p>
      </div>
    </div>
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
  onChange: (value: number) => void;
}) {
  return (
    <>
    <div>
      <label className="block mb-1 text-sm font-medium text-orange-700">
        {label}
      </label>
      <input
        type="number"
        className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
    <Footer/>
        </>
  );
}
