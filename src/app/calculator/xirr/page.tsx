'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function XIRRCalculator() {
  const [investment, setInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(60000);
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [xirr, setXirr] = useState(0);

  useEffect(() => {
    function calculateXIRR() {
      const pv = -investment;
      const fv = finalValue;
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const duration = end.diff(start, 'day') / 365;

      const result = (Math.pow(fv / -pv, 1 / duration) - 1) * 100;
      setXirr(isFinite(result) ? result : 0);
    }
    calculateXIRR();
  }, [investment, finalValue, startDate, endDate]);

  return (
    <>
    <ReNavbar/>
    <div className="max-w-md mx-auto p-6 bg-white border border-orange-300 shadow-md rounded-xl space-y-6">
      <h2 className="text-2xl font-semibold text-orange-600 text-center">
        XIRR Calculator
      </h2>

      <div className="space-y-4">
        <Input label="Investment Amount (₹)" value={investment} onChange={setInvestment} />
        <Input label="Final Portfolio Value (₹)" value={finalValue} onChange={setFinalValue} />
        <DateInput label="Investment Start Date" value={startDate} onChange={setStartDate} />
        <DateInput label="Maturity Date" value={endDate} onChange={setEndDate} />
      </div>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-orange-700 text-center">
        <p className="text-sm font-medium">📈 Estimated Annual Return</p>
        <p className="text-2xl font-bold">{xirr.toFixed(2)}%</p>
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
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-orange-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

function DateInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <>
    <div>
      <label className="block mb-1 text-sm font-medium text-orange-700">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
   <Footer />
       </>
  );
}
