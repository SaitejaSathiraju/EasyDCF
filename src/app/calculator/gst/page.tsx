'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const GSTCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState(25000);
  const [gstPercent, setGstPercent] = useState(18);
  const [gstAmount, setGstAmount] = useState<number | null>(null);
  const [priceWithGst, setPriceWithGst] = useState<number | null>(null);

  const calculateGST = () => {
    if (originalPrice <= 0 || gstPercent < 0) {
      setGstAmount(null);
      setPriceWithGst(null);
      return;
    }
    const gstAmt = (originalPrice * gstPercent) / 100;
    setGstAmount(gstAmt);
    setPriceWithGst(originalPrice + gstAmt);
  };

  const resetFields = () => {
    setOriginalPrice(0);
    setGstPercent(0);
    setGstAmount(null);
    setPriceWithGst(null);
  };

  return (
    <>
    <ReNavbar/>
    <div className="max-w-md mx-auto p-6 bg-white border border-orange-400 rounded-lg shadow-sm">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">GST Calculator</h2>

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-orange-700">Original Price (₹)</label>
        <input
          type="number"
          min={0}
          value={originalPrice}
          onChange={(e) => setOriginalPrice(Number(e.target.value))}
          placeholder="Enter original price"
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-orange-700">GST Percentage (%)</label>
        <input
          type="number"
          min={0}
          max={100}
          value={gstPercent}
          onChange={(e) => setGstPercent(Number(e.target.value))}
          placeholder="Enter GST rate"
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={calculateGST}
          className="px-6 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 transition"
        >
          Calculate
        </button>
        <button
          onClick={resetFields}
          className="px-6 py-3 bg-orange-100 text-orange-600 font-semibold rounded-md hover:bg-orange-200 transition"
        >
          Reset
        </button>
      </div>

      {gstAmount !== null && priceWithGst !== null && (
        <div className="mt-8 p-4 bg-orange-50 border border-orange-300 rounded-md text-orange-800 text-center font-semibold text-lg">
          <p>GST Amount: <span className="text-orange-600">₹ {gstAmount.toFixed(2)}</span></p>
          <p className="mt-2">Price Including GST: <span className="text-orange-600">₹ {priceWithGst.toFixed(2)}</span></p>
        </div>
      )}

      <section className="mt-10 p-4 bg-white border border-orange-100 rounded-md text-orange-700 text-sm">
        <h3 className="font-bold mb-2 text-orange-600">About GST Calculator</h3>
        <p>
          GST (Goods and Services Tax) is an indirect tax levied on the supply of goods and services.
          This calculator helps you quickly determine how much GST you pay and the total price including GST.
        </p>
      </section>
    </div>
    <Footer/>
        </>
  );
};

export default GSTCalculator;
