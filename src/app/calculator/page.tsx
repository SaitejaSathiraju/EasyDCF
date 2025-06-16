'use client';

import Link from 'next/link';
import { ReNavbar } from '@/components/magicui/renav';
import Footer from '@/components/magicui/footer';

const calculators = [
  { name: 'SIP', path: 'sip', description: 'Calculate SIP returns' },
  { name: 'Lumpsum', path: 'lumpsum', description: 'Lumpsum investment returns' },
  { name: 'SWP', path: 'swp', description: 'Systematic Withdrawal Plan' },
  { name: 'MF', path: 'mutual-funds', description: 'Mutual Fund returns' },
  { name: 'SSY', path: 'ssy', description: 'Sukanya Samriddhi Yojana' },
  { name: 'PPF', path: 'ppf', description: 'Public Provident Fund' },
  { name: 'EPF', path: 'epf', description: 'Employees Provident Fund' },
  { name: 'FD', path: 'fd', description: 'Fixed Deposit returns' },
  { name: 'RD', path: 'rd', description: 'Recurring Deposit returns' },
  { name: 'NPS', path: 'nps', description: 'National Pension Scheme' },
  { name: 'HRA', path: 'hra', description: 'House Rent Allowance' },
  { name: 'Retirement', path: 'retirement', description: 'Retirement Planning' },
  { name: 'EMI', path: 'emi', description: 'General EMI Calculator' },
  { name: 'Car Loan EMI', path: 'car-loan-emi', description: 'Car Loan EMI' },
  { name: 'Home Loan EMI', path: 'home-loan-emi', description: 'Home Loan EMI' },
  { name: 'Simple Interest', path: 'simple-interest', description: 'Simple Interest' },
  { name: 'Compound Interest', path: 'compound-interest', description: 'Compound Interest' },
  { name: 'NSC', path: 'nsc', description: 'National Savings Certificate' },
  { name: 'Step Up SIP', path: 'step-up-sip', description: 'SIP with Yearly Raise' },
  { name: 'Income Tax', path: 'income-tax', description: 'Income Tax Calculator' },
  { name: 'Gratuity', path: 'gratuity', description: 'Retirement Gratuity' },
  { name: 'APY', path: 'apy', description: 'Atal Pension Yojana' },
  { name: 'CAGR', path: 'cagr', description: 'Compound Annual Growth Rate' },
  { name: 'GST', path: 'gst', description: 'Goods & Services Tax' },
  { name: 'Flat vs Reducing', path: 'flat-vs-reducing', description: 'Flat vs Reducing Rate' },
  { name: 'Brokerage', path: 'brokerage', description: 'Brokerage Charges' },
  { name: 'Margin', path: 'margin', description: 'Trading Margin' },
  { name: 'TDS', path: 'tds', description: 'Tax Deducted at Source' },
  { name: 'Salary', path: 'salary', description: 'Take Home Salary' },
  { name: 'Inflation', path: 'inflation', description: 'Inflation Adjustment' },
  { name: 'Post Office MIS', path: 'mis', description: 'PO Monthly Income Scheme' },
  { name: 'SCSS', path: 'scss', description: 'Senior Citizens Savings Scheme' },
  { name: 'Stock Average', path: 'stock-average', description: 'Stock Average Calculator' },
  { name: 'XIRR', path: 'xirr', description: 'Extended Internal Rate of Return' },
];

export default function CalculatorsPage() {
  return (
    <>
      <ReNavbar />
      <div className="min-h-screen bg-white text-gray-800 py-12 px-4 ">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-orange-500">🧮 Fintech Calculators</h1>
          <p className="mt-2 text-gray-600">Make smarter financial decisions using modern tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {calculators.map((calc) => (
            <Link
              href={`/calculator/${calc.path}`}
              key={calc.name}
              className="bg-gradient-to-br from-white to-orange-50 border border-orange-200 flex justify-center px-3 rounded-xl shadow-md p-5 transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div>
                <h2 className="text-xl font-semibold text-orange-600">{calc.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{calc.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
