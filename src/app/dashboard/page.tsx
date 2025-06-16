'use client';

import { useEffect, useState } from 'react';

import CountUp from 'react-countup';
import { ReNavbar } from '@/components/magicui/renav';

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

};

const formatNumber = (num: number) => {
  return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
};
console.log(formatNumber);

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

  });

  const [allForms, setAllForms] = useState<FormDataType[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalForms: 0,
    totalWorth: 0,
    averageMargin: 0,
  });

  useEffect(() => {
    async function fetchForms() {
      const res = await fetch('/api/user-form');
      const data = await res.json();

      if (data.forms && Array.isArray(data.forms) && data.forms.length > 0) {
        setAllForms(data.forms);
        setFormData(data.forms[data.forms.length - 1]);

        const totalWorth = data.forms.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.tenderworth || '0'), 0);
        const averageMargin = data.forms.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.margin || '0'), 0) / data.forms.length;

        setStats({
          totalForms: data.forms.length,
          totalWorth,
          averageMargin,
        });
      }

      setLoading(false);
    }

    fetchForms();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/user-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Form saved!');
      const refreshed = await fetch('/api/user-form');
      const data = await refreshed.json();

      if (data.forms && Array.isArray(data.forms)) {
        setAllForms(data.forms);

        const totalWorth = data.forms.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.tenderworth || '0'), 0);
        const averageMargin = data.forms.reduce((acc: number, form: FormDataType) => acc + parseFloat(form.margin || '0'), 0) / data.forms.length;

        setStats({
          totalForms: data.forms.length,
          totalWorth,
          averageMargin,
        });
      }
    } else {
      alert('Error saving form.');
    }
  }

  if (loading) return <div className="text-black text-center mt-8">Loading...</div>;

  return (
    <>
      <ReNavbar />
      <div className="mb-10 mt-6 text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide">
          EasyDCF - Dashboard
        </h1>
        <p className="text-gray-700 mt-2">Manage your tender submissions easily</p>
      </div>

      {/* Dashboard Counters */}
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

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-orange-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Form Fields */}
          <label className="block">
            <span className="text-black font-semibold mb-1 block">Company Name</span>
            <input name="companyname" value={formData.companyname} onChange={handleChange} required placeholder="Enter company name" className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Tender Supply Start Date</span>
            <input type="date" name="tenderstartdate" value={formData.tenderstartdate} onChange={handleChange} required className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Tender Supply End Date</span>
            <input type="date" name="tenderenddate" value={formData.tenderenddate} onChange={handleChange} required className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Company Number</span>
            <input name="companynumber" value={formData.companynumber} onChange={handleChange} required placeholder="Enter company number" className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Phone Number</span>
            <input type="tel" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required placeholder="+91 9876543210" className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Address</span>
            <textarea name="address" value={formData.address} onChange={handleChange} required rows={4} placeholder="Enter your company address" className="w-full rounded-lg border border-orange-600 px-4 py-3 resize-none text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Tender Worth</span>
            <input name="tenderworth" value={formData.tenderworth} onChange={handleChange} required placeholder="Enter tender worth" className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Margin</span>
            <input name="margin" value={formData.margin} onChange={handleChange} required placeholder="Enter margin amount" className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">GST Number</span>
            <input name="gstnumber" value={formData.gstnumber} onChange={handleChange} required placeholder="Enter GST number" className="w-full rounded-lg border border-orange-600 px-4 py-3 text-black placeholder-orange-300" />
          </label>

          <label className="block">
            <span className="text-black font-semibold mb-1 block">Supply To</span>
            <select name="supplyto" value={formData.supplyto} onChange={handleChange} required className="w-full rounded-lg border border-orange-600 px-4 py-3 bg-white text-black">
              <option value="">Select...</option>
              <option value="State Govt">State Govt</option>
              <option value="Central Govt">Central Govt</option>
              <option value="Private">Private</option>
            </select>
          </label>

          {formData.supplyto === 'State Govt' && (
            <label className="block">
              <span className="text-black font-semibold mb-1 block">Which State Government?</span>
              <select name="stategovernment" value={formData.stategovernment} onChange={handleChange} required className="w-full rounded-lg border border-orange-600 px-4 py-3 bg-white text-black">
                <option value="">Select State...</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </label>
          )}

          <button type="submit" className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300">
            Save
          </button>
        </form>

        <hr className="my-12 border-orange-300" />

        <h2 className="text-3xl font-bold mb-6 text-orange-600 tracking-wide">Previous Submissions</h2>

        {allForms.length === 0 ? (
          <p className="text-black text-center italic">No previous submissions found.</p>
        ) : (
          <div className="space-y-6">
            {allForms.map((form, idx) => (
              <div key={form.id ?? idx} className="p-6 border-2 border-orange-600 rounded-xl bg-orange-50 shadow-md text-black">
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

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
