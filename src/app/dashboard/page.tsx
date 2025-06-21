'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { ReNavbar } from '@/components/magicui/renav';
import FinancerFormSection from '@/components/FinancerFormSection';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal'
];

type FormDataType = {
  id?: number;
  companyname: string;
  tenderstartdate: string;
  tenderenddate: string;
  companynumber: string;
  email: string;
  phonenumber: string;
  address: string;
  tenderworth: string;
  margin: string;
  gstnumber: string;
  supplyto: string;
  stategovernment: string;
  document: string | null;
};

type FinancerFormData = {
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
  buyerGSTIN: string;
  goodsDescription: string;
  discountRate: string;
  tenureDays: string;
  discountAmount: string;
  netPayable: string;
  settlementDate: string;
  earlyPayment: boolean;
  partialFinancing: boolean;
  creditRating: string;
  pastDealings: string;
  previousTransactions: string;
  kycDone: boolean;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  branchAddress: string;
  upiId: string;
  declarationAgreed: boolean;
  authorizedSignatory: string;
  signatoryDesignation: string;
  signatureDate: string;
};

export default function UserForm() {
  const [formData, setFormData] = useState<FormDataType>({
    companyname: '',
    tenderstartdate: '',
    tenderenddate: '',
    companynumber: '',
    email: '',
    phonenumber: '',
    address: '',
    tenderworth: '',
    margin: '',
    gstnumber: '',
    supplyto: '',
    stategovernment: '',
    document: null,
  });

  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  const [financerFormData, setFinancerFormData] = useState<FinancerFormData>({
    financerName: '',
    financerType: '',
    rbiRegNumber: '',
    officeAddress: '',
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    website: '',
    invoiceNumber: '',
    invoiceDate: '',
    invoiceAmount: '',
    currency: '',
    invoiceDueDate: '',
    msmeName: '',
    msmeUdyam: '',
    buyerName: '',
    buyerGSTIN: '',
    goodsDescription: '',
    discountRate: '',
    tenureDays: '',
    discountAmount: '',
    netPayable: '',
    settlementDate: '',
    earlyPayment: false,
    partialFinancing: false,
    creditRating: '',
    pastDealings: '',
    previousTransactions: '',
    kycDone: false,
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    branchAddress: '',
    upiId: '',
    declarationAgreed: false,
    authorizedSignatory: '',
    signatoryDesignation: '',
    signatureDate: '',
  });

  const [allForms, setAllForms] = useState<FormDataType[]>([]);
  const [financerForms, setFinancerForms] = useState<FinancerFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [stats, setStats] = useState({
    totalForms: 0,
    totalWorth: 0,
    averageMargin: 0,
  });

  const [financerStats, setFinancerStats] = useState({
    totalForms: 0,
    totalInvoiceAmount: 0,
    averageDiscountRate: 0,
  });

  useEffect(() => {
    async function fetchForms() {
      try {
        const res = await fetch('/api/user-form', { credentials: 'include' });
        const data = await res.json();
        if (data.submissions && Array.isArray(data.submissions)) {
          setAllForms(data.submissions);
          setFormData(data.submissions[data.submissions.length - 1] || formData);
          const totalWorth = data.submissions.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.tenderworth || '0'), 0);
          const averageMargin = data.submissions.length > 0
            ? data.submissions.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.margin || '0'), 0) / data.submissions.length
            : 0;
          setStats({ totalForms: data.submissions.length, totalWorth, averageMargin });
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
      setLoading(false);
    }

    async function fetchFinancerForms() {
      try {
        const res = await fetch('/api/finance-form', { credentials: 'include' });
        const data = await res.json();
        if (data.forms && Array.isArray(data.forms)) {
          setFinancerForms(data.forms);
          const totalInvoiceAmount = data.forms.reduce((acc: number, form: FinancerFormData) => acc + parseFloat(form.invoiceAmount || '0'), 0);
          const averageDiscountRate = data.forms.length > 0
            ? data.forms.reduce((acc: number, form: FinancerFormData) => acc + parseFloat(form.discountRate || '0'), 0) / data.forms.length
            : 0;
          setFinancerStats({ totalForms: data.forms.length, totalInvoiceAmount, averageDiscountRate });
        } else {
          setFinancerForms([]);
          setFinancerStats({ totalForms: 0, totalInvoiceAmount: 0, averageDiscountRate: 0 });
        }
      } catch (error) {
        console.error('Error fetching financer forms:', error);
      }
    }

    fetchForms();
    fetchFinancerForms();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleFinancerChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFinancerFormData(prev => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'invoiceAmount' || name === 'discountRate') {
        const invoiceAmount = parseFloat(updated.invoiceAmount) || 0;
        const discountRate = parseFloat(updated.discountRate) || 0;
        updated.discountAmount = ((invoiceAmount * discountRate) / 100).toFixed(2);
        updated.netPayable = (invoiceAmount - parseFloat(updated.discountAmount)).toFixed(2);
      }
      return updated;
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInvoiceFile(file);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    const formElement = e.currentTarget as HTMLFormElement;
    const formDataToSend = new FormData(formElement);
    if (invoiceFile) {
      formDataToSend.append('invoice', invoiceFile);
    }
    try {
      const res = await fetch('/api/user-form', { method: 'POST', body: formDataToSend });
      if (res.ok) {
        alert('Form saved!');
        setFormData({
          companyname: '',
          tenderstartdate: '',
          tenderenddate: '',
          companynumber: '',
          email: '',
          phonenumber: '',
          address: '',
          tenderworth: '',
          margin: '',
          gstnumber: '',
          supplyto: '',
          stategovernment: '',
          document: null,
        });
        setInvoiceFile(null);
        const refreshed = await fetch('/api/user-form', { credentials: 'include' });
        const data = await refreshed.json();
        if (data.submissions && Array.isArray(data.submissions)) {
          setAllForms(data.submissions);
          const totalWorth = data.submissions.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.tenderworth || '0'), 0);
          const averageMargin = data.submissions.length > 0
            ? data.submissions.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.margin || '0'), 0) / data.submissions.length
            : 0;
          setStats({ totalForms: data.submissions.length, totalWorth, averageMargin });
        }
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Error saving form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleFinancerSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Validate required fields
    const requiredFields: (keyof FinancerFormData)[] = [
      'financerName', 'financerType', 'email', 'phone', 'buyerGSTIN',
      'declarationAgreed', 'authorizedSignatory', 'signatoryDesignation', 'signatureDate'
    ];
    for (const field of requiredFields) {
      const value = financerFormData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (typeof value === 'boolean' && value === false)
      ) {
        alert(`Please fill the required field: ${field}`);
        setIsSubmitting(false);
        return;
      }
    }
    // Convert camelCase keys to snake_case
    const toSnakeCase = (obj: Record<string, unknown>): Record<string, unknown> => {
      const newObj: Record<string, unknown> = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
          newObj[snakeKey] = obj[key];
        }
      }
      return newObj;
    };
    try {
      const snakeCaseData = toSnakeCase(financerFormData);
      const res = await fetch('/api/finance-form', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snakeCaseData),
      });
      if (res.ok) {
        alert('Financer form saved!');
        setFinancerFormData({
          financerName: '',
          financerType: '',
          rbiRegNumber: '',
          officeAddress: '',
          contactName: '',
          designation: '',
          email: '',
          phone: '',
          website: '',
          invoiceNumber: '',
          invoiceDate: '',
          invoiceAmount: '',
          currency: '',
          invoiceDueDate: '',
          msmeName: '',
          msmeUdyam: '',
          buyerName: '',
          buyerGSTIN: '',
          goodsDescription: '',
          discountRate: '',
          tenureDays: '',
          discountAmount: '',
          netPayable: '',
          settlementDate: '',
          earlyPayment: false,
          partialFinancing: false,
          creditRating: '',
          pastDealings: '',
          previousTransactions: '',
          kycDone: false,
          bankName: '',
          accountHolder: '',
          accountNumber: '',
          ifsc: '',
          branchAddress: '',
          upiId: '',
          declarationAgreed: false,
          authorizedSignatory: '',
          signatoryDesignation: '',
          signatureDate: '',
        });
        const refreshed = await fetch('/api/finance-form', { credentials: 'include' });
        const data = await refreshed.json();
        if (data.forms && Array.isArray(data.forms)) {
          setFinancerForms(data.forms);
          const totalInvoiceAmount = data.forms.reduce((acc: number, form: FinancerFormData) => acc + parseFloat(form.invoiceAmount || '0'), 0);
          const averageDiscountRate = data.forms.length > 0
            ? data.forms.reduce((acc: number, form: FinancerFormData) => acc + parseFloat(form.discountRate || '0'), 0) / data.forms.length
            : 0;
          setFinancerStats({ totalForms: data.forms.length, totalInvoiceAmount, averageDiscountRate });
        }
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Error saving financer form.');
      }
    } catch (error) {
      console.error('Error submitting financer form:', error);
      alert('Error submitting financer form.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <div className="text-black text-center mt-8">Loading...</div>;

  return (
    <div>
      <ReNavbar />
      <div className="mb-10 mt-6 text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide">EasyDCF - Dashboard</h1>
        <p className="text-gray-700 mt-2">Manage your tender submissions easily</p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Select Your Role</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold border transition ${
              selectedRole === 'Financier' ? 'bg-green-600 text-white' : 'bg-white border-green-600 text-green-600'
            }`}
            onClick={() => setSelectedRole('Financier')}
          >
            Financier
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold border transition ${
              selectedRole === 'MSME' ? 'bg-blue-600 text-white' : 'bg-white border-blue-600 text-blue-600'
            }`}
            onClick={() => setSelectedRole('MSME')}
          >
            MSME (Seller)
          </button>
        </div>
      </div>

      {selectedRole === 'Financier' && (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-green-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="bg-green-100 border border-green-400 p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-bold text-green-600 mb-2">Total Submissions</h3>
              <p className="text-3xl font-extrabold text-black">{financerStats.totalForms}</p>
            </div>
            <div className="bg-green-100 border border-green-400 p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-bold text-green-600 mb-2">Total Invoice Amount (₹)</h3>
              <p className="text-3xl font-extrabold text-black">{financerStats.totalInvoiceAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-green-100 border border-green-400 p-6 rounded-xl shadow text-center">
              <h3 className="text-lg font-bold text-green-600 mb-2">Average Discount Rate (%)</h3>
              <p className="text-3xl font-extrabold text-black">{financerStats.averageDiscountRate.toFixed(2)}</p>
            </div>
          </div>
          <form onSubmit={handleFinancerSubmit} className="space-y-6">
            <FinancerFormSection formData={financerFormData} handleChange={handleFinancerChange} allForms={financerForms} />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      )}

      {selectedRole === 'MSME' && (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-blue-300">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-10">
              <div className="bg-orange-100 border border-orange-400 p-6 rounded-xl shadow text-center">
                <h3 className="text-lg font-bold text-orange-600 mb-2">Total Submissions</h3>
                <CountUp end={stats.totalForms} duration={1.5} className="text-3xl font-extrabold text-black" />
              </div>
              <div className="bg-orange-100 border border-orange-400 p-6 rounded-xl shadow text-center">
                <h3 className="text-lg font-bold text-orange-600 mb-2">Total Tender Worth (₹)</h3>
                <CountUp end={stats.totalWorth} duration={2} separator="," className="text-3xl font-extrabold text-black" />
              </div>
              <div className="bg-orange-100 border border-orange-400 p-6 rounded-xl shadow text-center">
                <h3 className="text-lg font-bold text-orange-600 mb-2">Avg. Margin (₹)</h3>
                <CountUp end={stats.averageMargin} duration={2} separator="," decimals={2} className="text-3xl font-extrabold text-black" />
              </div>
            </div>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Company Name</span>
              <input
                name="companyname"
                value={formData.companyname}
                onChange={handleChange}
                required
                placeholder="Enter company name"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Tender Supply Start Date</span>
              <input
                type="date"
                name="tenderstartdate"
                value={formData.tenderstartdate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Tender Supply End Date</span>
              <input
                type="date"
                name="tenderenddate"
                value={formData.tenderenddate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Company Number</span>
              <input
                name="companynumber"
                value={formData.companynumber}
                onChange={handleChange}
                required
                placeholder="Enter company number"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Phone Number</span>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                required
                placeholder="+91 9876543210"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Address</span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Enter your company address"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 resize-none text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Tender Worth</span>
              <input
                name="tenderworth"
                value={formData.tenderworth}
                onChange={handleChange}
                required
                placeholder="Enter tender worth"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Margin</span>
              <input
                name="margin"
                value={formData.margin}
                onChange={handleChange}
                required
                placeholder="Enter margin amount"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">GST Number</span>
              <input
                name="gstnumber"
                value={formData.gstnumber}
                onChange={handleChange}
                required
                placeholder="Enter GST number"
                className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300"
              />
            </label>
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Supply To</span>
              <select
                name="supplyto"
                value={formData.supplyto}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-orange-600 px-4 py-3 bg-white text-black"
              >
                <option value="">Select...</option>
                <option value="State Govt">State Govt</option>
                <option value="Central Govt">Central Govt</option>
                <option value="Private">Private</option>
              </select>
            </label>
            {formData.supplyto === 'State Govt' && (
              <label className="block">
                <span className="text-black font-semibold mb-1 block">Which State Government?</span>
                <select
                  name="stategovernment"
                  value={formData.stategovernment}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-orange-600 px-4 py-3 bg-white text-black"
                >
                  <option value="">Select State...</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>
            )}
            <input
              type="file"
              name="document"
              accept=".pdf,.doc,.docx,.jpg,.png"
              required
              onChange={handleFileChange}
              className="text-sm text-orange-500 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-black hover:file:bg-orange-600 cursor-pointer"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </form>
          <hr className="my-12 border-orange-300" />
          <h2 className="text-3xl font-bold mb-6 text-orange-600 tracking-wide">Previous Submissions</h2>
          {allForms.length === 0 ? (
            <p className="text-black text-center italic">No previous submissions found.</p>
          ) : (
           <div className="space-y-6">
      {allForms.length === 0 ? (
  <p className="text-black text-center italic">No previous submissions found.</p>
) : (
  <div className="space-y-6">
    {allForms.map((form, idx) => (
      <div
        key={form.id ?? `${form.companyname}-${form.tenderstartdate}-${idx}`}
        className="p-6 border-2 border-orange-600 rounded-xl bg-orange-50 shadow-md text-black"
      >
        <p><strong>Company Name:</strong> {form.companyname || '-'}</p>
        <p><strong>Tender Start Date:</strong> {form.tenderstartdate ? new Date(form.tenderstartdate).toLocaleDateString() : '-'}</p>
        <p><strong>Tender End Date:</strong> {form.tenderenddate ? new Date(form.tenderenddate).toLocaleDateString() : '-'}</p>
        <p><strong>Company Number:</strong> {form.companynumber || '-'}</p>
        <p><strong>Email:</strong> {form.email || '-'}</p>
        <p><strong>Phone Number:</strong> {form.phonenumber || '-'}</p>
        <p><strong>Address:</strong> {form.address || '-'}</p>
        <p><strong>Tender Worth:</strong> {form.tenderworth != null ? `₹${form.tenderworth}` : '-'}</p>
        <p><strong>Margin:</strong> {form.margin != null ? `₹${form.margin}` : '-'}</p>
        <p><strong>GST Number:</strong> {form.gstnumber || '-'}</p>
        <p><strong>Supply To:</strong> {form.supplyto || '-'}</p>
        <p><strong>State Government:</strong> {form.stategovernment || '-'}</p>
        <p><strong>Document:</strong> {form.document ? <a href={form.document} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Document</a> : '-'}</p>
      </div>
    ))}
  </div>
)}
    </div>
          )}
        </div>
      )}
    </div>
  );
}
