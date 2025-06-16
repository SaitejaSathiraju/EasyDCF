'use client';

import React, { useState,  } from 'react';
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";

const recipientOptions = [
  'Individual',
  'HUF',
  'Company',
  'Firm',
  'AOP/BOI',
  'Others',
];

const paymentNatureOptions = [
  { label: 'Salary', rate: 10 }, // Example rates - adjust as per current rules
  { label: 'Interest on FD', rate: 10 },
  { label: 'Rent', rate: 10 },
  { label: 'Commission', rate: 5 },
  { label: 'Professional Fees', rate: 10 },
  { label: 'Dividend', rate: 10 },
  { label: 'Others', rate: 10 },
];

// Simple example rates, you should update these as per actual tax slabs/rules

export default function TDSCalculator() {
  const [recipient, setRecipient] = useState(recipientOptions[0]);
  const [paymentNature, setPaymentNature] = useState(paymentNatureOptions[0].label);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const selectedRate = paymentNatureOptions.find(
    (opt) => opt.label === paymentNature
  )?.rate ?? 0;

  // Calculate TDS as (PaymentAmount * Rate%) 
  const tdsAmount = (paymentAmount * selectedRate) / 100;

  return (
    <>
    <ReNavbar/>
        <div className="max-w-lg mx-auto p-6 bg-white border border-orange-400 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
        TDS Calculator
      </h2>

      <div className="mb-4">
        <label htmlFor="recipient" className="block mb-2 font-semibold text-orange-700">
          Recipient Type
        </label>
        <select
          id="recipient"
          className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        >
          {recipientOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="paymentNature" className="block mb-2 font-semibold text-orange-700">
          Nature of Payment
        </label>
        <select
          id="paymentNature"
          className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={paymentNature}
          onChange={(e) => setPaymentNature(e.target.value)}
        >
          {paymentNatureOptions.map((p) => (
            <option key={p.label} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="paymentAmount" className="block mb-2 font-semibold text-orange-700">
          Amount of Payment (₹)
        </label>
        <input
          id="paymentAmount"
          type="number"
          min={0}
          className="w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
      </div>

      <div className="bg-orange-50 p-5 rounded-md border border-orange-300 text-orange-800 font-semibold text-lg text-center">
        <p>
          Total TDS Deducted: {' '}
          <span className="text-orange-700">
            ₹ {tdsAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </span>
        </p>
      </div>

      <section className="mt-6 p-4 bg-white border border-orange-100 rounded-md text-orange-700 text-sm">
        <h3 className="font-bold mb-2 text-orange-600">About TDS</h3>
        <p>
          Tax Deducted at Source (TDS) is a means to collect tax at the source of income. The payer deducts tax before making payment to the recipient. 
          This calculator estimates the TDS amount based on the nature of payment and recipient type.
        </p>
      </section>
    </div>
    <Footer />
        </>
  );
}
