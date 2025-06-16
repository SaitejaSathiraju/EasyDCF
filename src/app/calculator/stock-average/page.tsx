'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

export default function StockAverageCalculator() {
  const [entries, setEntries] = useState([{ qty: 0, price: 0 }]);

  const handleQtyChange = (index: number, value: number) => {
    const updated = [...entries];
    updated[index].qty = value;
    setEntries(updated);
  };

  const handlePriceChange = (index: number, value: number) => {
    const updated = [...entries];
    updated[index].price = value;
    setEntries(updated);
  };

  const addMore = () => setEntries([...entries, { qty: 0, price: 0 }]);

  const totalQty = entries.reduce((sum, e) => sum + e.qty, 0);
  const totalCost = entries.reduce((sum, e) => sum + e.qty * e.price, 0);
  const averagePrice = totalQty > 0 ? totalCost / totalQty : 0;

  return (
    <>
    <ReNavbar/>
    <div className="max-w-md mx-auto p-6 bg-white border border-orange-200 shadow-md rounded-xl space-y-6">
      <h2 className="text-2xl font-semibold text-orange-600 text-center">
        Stock Average Calculator
      </h2>

      {entries.map((entry, idx) => (
        <div key={idx} className="grid grid-cols-2 gap-4">
          <Input
            label={`Qty ${idx + 1}`}
            value={entry.qty}
            onChange={(val) => handleQtyChange(idx, val)}
          />
          <Input
            label={`Price ₹ ${idx + 1}`}
            value={entry.price}
            onChange={(val) => handlePriceChange(idx, val)}
          />
        </div>
      ))}

      <button
        onClick={addMore}
        className="w-full py-2 text-orange-600 border border-orange-300 hover:bg-orange-50 rounded-md transition"
      >
        + Add More
      </button>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-orange-700 space-y-1 font-medium">
        <p>📦 Total Quantity: {totalQty}</p>
        <p>💸 Total Cost: ₹{totalCost.toLocaleString()}</p>
        <p>📊 Average Price: ₹{averagePrice.toFixed(2)}</p>
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
    <>
    <div>
      <label className="block mb-1 text-sm font-medium text-orange-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
    <Footer />
        </>
  );
}
