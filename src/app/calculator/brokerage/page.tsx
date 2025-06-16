'use client';

import React, { useState } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const BrokerageCalculator = () => {
  const [exchange, setExchange] = useState<'NSE' | 'BSE'>('NSE');
  const [buyPrice, setBuyPrice] = useState(50);
  const [sellPrice, setSellPrice] = useState(1000);
  const [quantity, setQuantity] = useState(1500);

  // Calculate turnover
  const buyTurnover = buyPrice * quantity;
  const sellTurnover = sellPrice * quantity;
  const totalTurnover = buyTurnover + sellTurnover;

  // Brokerage calculation
  // Assuming flat brokerage fee (example: ₹20 per trade or 0.01% whichever is lower)
  const brokeragePerTrade = Math.min(20, totalTurnover * 0.0001);
  const totalBrokerage = brokeragePerTrade * 2; // Buy + Sell

  // Stamp Duty - varies by state, assuming 0.003% on buy side for NSE, 0.002% for BSE (example)
  const stampDutyRate = exchange === 'NSE' ? 0.00003 : 0.00002;
  const stampDuty = buyTurnover * stampDutyRate;

  // Transaction Charges - example: 0.00325% on turnover
  const transactionChargeRate = 0.0000325;
  const transactionCharges = totalTurnover * transactionChargeRate;

  // SEBI Turnover Fee - example: 0.0001% on turnover
  const sebiFeeRate = 0.000001;
  const sebiTurnoverFee = totalTurnover * sebiFeeRate;

  // GST @ 18% on (Brokerage + Transaction Charges + SEBI Fee)
  const gstBase = totalBrokerage + transactionCharges + sebiTurnoverFee;
  const gst = gstBase * 0.18;

  // Securities Transaction Tax (STT)
  // On Sell side only, equity delivery 0.1% (example)
  const sttRate = 0.001;
  const stt = sellTurnover * sttRate;

  // Total charges
  const totalCharges =
    totalBrokerage + stampDuty + transactionCharges + sebiTurnoverFee + gst + stt;

  return (
    <>
    <ReNavbar />
    <div className="max-w-xl mx-auto p-6 bg-white border border-orange-400 rounded-lg shadow-sm">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
        Brokerage Calculator
      </h2>

      {/* Exchange selector */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-orange-700">Select Exchange</label>
        <select
          value={exchange}
          onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE')}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="NSE">NSE</option>
          <option value="BSE">BSE</option>
        </select>
      </div>

      {/* Inputs */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-orange-700">Buy Price (₹)</label>
        <input
          type="number"
          min={0}
          value={buyPrice}
          onChange={(e) => setBuyPrice(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter buy price"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-orange-700">Sell Price (₹)</label>
        <input
          type="number"
          min={0}
          value={sellPrice}
          onChange={(e) => setSellPrice(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter sell price"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-orange-700">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter quantity"
        />
      </div>

      {/* Results */}
      <div className="bg-orange-50 p-5 rounded-md border border-orange-300 text-orange-800 font-semibold text-lg">
        <p>
          Total Turnover (Buy + Sell):{' '}
          <span className="text-orange-600">₹ {totalTurnover.toLocaleString()}</span>
        </p>
        <p className="mt-2">
          Brokerage Charges: <span className="text-orange-600">₹ {totalBrokerage.toFixed(2)}</span>
        </p>
        <p className="mt-2">
          Stamp Duty: <span className="text-orange-600">₹ {stampDuty.toFixed(2)}</span>
        </p>
        <p className="mt-2">
          Transaction Charges: <span className="text-orange-600">₹ {transactionCharges.toFixed(2)}</span>
        </p>
        <p className="mt-2">
          SEBI Turnover Fee: <span className="text-orange-600">₹ {sebiTurnoverFee.toFixed(2)}</span>
        </p>
        <p className="mt-2">
          GST (18%): <span className="text-orange-600">₹ {gst.toFixed(2)}</span>
        </p>
        <p className="mt-2">
          Securities Transaction Tax (STT): <span className="text-orange-600">₹ {stt.toFixed(2)}</span>
        </p>
        <hr className="my-4 border-orange-300" />
        <p className="text-xl font-bold">
          Total Charges: <span className="text-orange-700">₹ {totalCharges.toFixed(2)}</span>
        </p>
      </div>

      {/* Explanation */}
      <section className="mt-6 p-4 bg-white border border-orange-100 rounded-md text-orange-700 text-sm">
        <h3 className="font-bold mb-2 text-orange-600">What is a Brokerage Calculator?</h3>
        <p>
          This calculator estimates the total brokerage and other charges like stamp duty,
          transaction fees, SEBI fees, GST, and STT for your trade based on the buy/sell price,
          quantity, and exchange. It helps traders know the cost impact before placing orders.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default BrokerageCalculator;
