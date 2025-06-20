'use client';

import { useState, useEffect } from 'react';

type FinanceFormType = {
  id?: number;
  financerName: string;
  financerType: string;
  rbiRegNumber: string;
  officeAddress: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  website: string;

  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmount: string;
  currency: string;
  invoiceDueDate: string;
  msmeName: string;
  msmeUdyam: string;
  buyerName: string;
  buyerGstin: string;
  goodsDescription: string;

  discountRate: string;
  tenureDays: string;
  discountAmount: string;
  netPayable: string;
  settlementDate: string;
  earlyPayment: string;
  partialFinancing: string;

  creditRating: string;
  pastDealings: string;
  previousTransactions: string;
  kycDone: string;

  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  branchAddress: string;
  upiId: string;

  declarationAgreed: string;

  authorizedSignatory: string;
  signatoryDesignation: string;
  signatureDate: string;
};

const financeUsername = 'financeAdmin';
const financePassword = 'financeSecret';
 void financeUsername;
  void financePassword;

export default function FinancePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forms, setForms] = useState<FinanceFormType[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  // These store the user input during login (not hardcoded)
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // Finance stats calculations (same as before)
  const totalInvoiceAmount = forms.reduce(
    (sum, form) => sum + (parseFloat(form.invoiceAmount) || 0),
    0
  );
  const averageDiscountRate =
    forms.length > 0
      ? forms.reduce((sum, form) => sum + (parseFloat(form.discountRate) || 0), 0) / forms.length
      : 0;

  useEffect(() => {
    const savedLoggedIn = localStorage.getItem('financeLoggedIn');
    const savedCompletedIds = localStorage.getItem('financeCompletedIds');

    if (savedLoggedIn === 'true') {
      setLoggedIn(true);
      fetchFinanceForms();
    }
    if (savedCompletedIds) {
      try {
        const parsedIds: number[] = JSON.parse(savedCompletedIds);
        setCompletedIds(new Set(parsedIds));
      } catch {}
    }
  }, []);

  async function fetchFinanceForms() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/finnace-form');
      if (!res.ok) throw new Error('Failed to fetch finance forms');

      const data = await res.json();
      setForms(data.forms ?? []);
    } catch {
      setError('Failed to load finance data.');
      setLoggedIn(false);
      localStorage.removeItem('financeLoggedIn');
    } finally {
      setLoading(false);
    }
  }
  

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
     void financeUsername;
  void financePassword;

    if (inputUsername === financeUsername && inputPassword === financePassword) {
      setLoggedIn(true);
      localStorage.setItem('financeLoggedIn', 'true');
      fetchFinanceForms();
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  }

  function handleLogout() {
    setLoggedIn(false);
    setForms([]);
    setCompletedIds(new Set());
    setError('');
    localStorage.removeItem('financeLoggedIn');
    localStorage.removeItem('financeCompletedIds');
  }

  function toggleCompleted(id?: number) {
    if (!id) return;
    setCompletedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      localStorage.setItem('financeCompletedIds', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  }

  if (!loggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow bg-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Finance Admin Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-10 text-black font-bold text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gradient-to-r from-orange-100  to-orange-100 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide drop-shadow-lg flex-grow text-center">
          Finance Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="ml-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-8 text-center text-lg font-semibold text-gray-700">
        Total Finance Forms: <span className="text-blue-600">{forms.length}</span>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-2xl font-bold text-blue-600">{forms.length}</div>
          <div className="text-gray-600 font-semibold">Number of Submissions</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-2xl font-bold text-blue-600">
            {totalInvoiceAmount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
          </div>
          <div className="text-gray-600 font-semibold">Total Invoice Amount</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-2xl font-bold text-blue-600">{averageDiscountRate.toFixed(2)}%</div>
          <div className="text-gray-600 font-semibold">Average Discount Rate</div>
        </div>
      </div>
      


      <div className="space-y-8">
        {forms.map((form, idx) => (
          <div
            key={form.id ?? idx}
            className={`p-6 rounded-lg shadow-md border-2 ${
              completedIds.has(form.id ?? -1)
                ? 'border-green-500 bg-green-50'
                : 'border-blue-400 bg-white'
            } transition-colors duration-300`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-700">
                {form.financerName || 'Unnamed Financer'}
              </h2>
              <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={completedIds.has(form.id ?? -1)}
                  onChange={() => toggleCompleted(form.id)}
                  className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <span className="text-green-700 font-semibold">Completed</span>
              </label>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 text-sm font-medium">
              <div><strong>Financer Type:</strong> {form.financerType}</div>
              <div><strong>RBI Reg Number:</strong> {form.rbiRegNumber}</div>
              <div><strong>Office Address:</strong> {form.officeAddress}</div>
              <div><strong>Contact Name:</strong> {form.contactName}</div>
              <div><strong>Designation:</strong> {form.designation}</div>
              <div><strong>Email:</strong> {form.email}</div>
              <div><strong>Phone:</strong> {form.phone}</div>
              <div><strong>Website:</strong> {form.website}</div>

              <div><strong>Invoice Number:</strong> {form.invoiceNumber}</div>
              <div><strong>Invoice Date:</strong> {form.invoiceDate}</div>
              <div><strong>Invoice Amount:</strong> {form.invoiceAmount}</div>
              <div><strong>Currency:</strong> {form.currency}</div>
              <div><strong>Invoice Due Date:</strong> {form.invoiceDueDate}</div>
              <div><strong>MSME Name:</strong> {form.msmeName}</div>
              <div><strong>MSME Udyam:</strong> {form.msmeUdyam}</div>
              <div><strong>Buyer Name:</strong> {form.buyerName}</div>
              <div><strong>Buyer GSTIN:</strong> {form.buyerGstin}</div>
              <div><strong>Goods Description:</strong> {form.goodsDescription}</div>

              <div><strong>Discount Rate:</strong> {form.discountRate}%</div>
              <div><strong>Tenure Days:</strong> {form.tenureDays}</div>
              <div><strong>Discount Amount:</strong> {form.discountAmount}</div>
              <div><strong>Net Payable:</strong> {form.netPayable}</div>
              <div><strong>Settlement Date:</strong> {form.settlementDate}</div>
              <div><strong>Early Payment:</strong> {form.earlyPayment}</div>
              <div><strong>Partial Financing:</strong> {form.partialFinancing}</div>

              <div><strong>Credit Rating:</strong> {form.creditRating}</div>
              <div><strong>Past Dealings:</strong> {form.pastDealings}</div>
              <div><strong>Previous Transactions:</strong> {form.previousTransactions}</div>
              <div><strong>KYC Done:</strong> {form.kycDone}</div>

              <div><strong>Bank Name:</strong> {form.bankName}</div>
              <div><strong>Account Holder:</strong> {form.accountHolder}</div>
              <div><strong>Account Number:</strong> {form.accountNumber}</div>
              <div><strong>IFSC:</strong> {form.ifsc}</div>
              <div><strong>Branch Address:</strong> {form.branchAddress}</div>
              <div><strong>UPI ID:</strong> {form.upiId}</div>

              <div><strong>Declaration Agreed:</strong> {form.declarationAgreed}</div>

              <div><strong>Authorized Signatory:</strong> {form.authorizedSignatory}</div>
              <div><strong>Signatory Designation:</strong> {form.signatoryDesignation}</div>
              <div><strong>Signature Date:</strong> {form.signatureDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
