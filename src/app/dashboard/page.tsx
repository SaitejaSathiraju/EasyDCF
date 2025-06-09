'use client';

import { useEffect, useState } from 'react';
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
  companyName: string;
  tenderStartDate: string;
  tenderEndDate: string;
  companyNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
  tenderWorth: string;
  margin: string;
  gstNumber: string;
  supplyTo: string;
  stateGovernment: string;
};

export default function UserForm() {
  const [formData, setFormData] = useState<FormDataType>({
    companyName: '',
    tenderStartDate: '',
    tenderEndDate: '',
    companyNumber: '',
    email: '',
    phoneNumber: '',
    address: '',
    tenderWorth: '',
    margin: '',
    gstNumber: '',
    supplyTo: '',
    stateGovernment: '',
  });

  const [allForms, setAllForms] = useState<FormDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForms() {
      const res = await fetch('/api/user-form');
      const data = await res.json();

      if (data.forms && Array.isArray(data.forms) && data.forms.length > 0) {
        setAllForms(data.forms);
        setFormData(data.forms[data.forms.length - 1]);
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
      }
    } else {
      alert('Error saving form.');
    }
  }

  if (loading) return <div className="text-black text-center mt-8">Loading...</div>;

  return (

    <>
    <ReNavbar />
    <div>
      <h1 className='text-4xl text-bold flex justify-center text-orange-600'>EasyDCF -DashBoard</h1>
    </div>
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-lg mt-8">
      <form onSubmit={handleSubmit} className="mb-10">
        {/* Company Name */}
        <label className="block mb-4 text-black font-semibold">
          Company Name:
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Tender Start Date */}
        <label className="block mb-4 text-black font-semibold">
          Tender Supply Start Date:
          <input
            type="date"
            name="tenderStartDate"
            value={formData.tenderStartDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Tender End Date */}
        <label className="block mb-4 text-black font-semibold">
          Tender Supply End Date:
          <input
            type="date"
            name="tenderEndDate"
            value={formData.tenderEndDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Company Number */}
        <label className="block mb-4 text-black font-semibold">
          Company Number:
          <input
            name="companyNumber"
            value={formData.companyNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Email */}
        <label className="block mb-4 text-black font-semibold">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Phone Number */}
        <label className="block mb-4 text-black font-semibold">
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Address */}
        <label className="block mb-4 text-black font-semibold">
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Tender Worth */}
        <label className="block mb-4 text-black font-semibold">
          Tender Worth:
          <input
            name="tenderWorth"
            value={formData.tenderWorth}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Margin */}
        <label className="block mb-4 text-black font-semibold">
          Margin:
          <input
            name="margin"
            value={formData.margin}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* GST Number */}
        <label className="block mb-4 text-black font-semibold">
          GST Number:
          <input
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          />
        </label>

        {/* Supply To */}
        <label className="block mb-4 text-black font-semibold">
          Supply To:
          <select
            name="supplyTo"
            value={formData.supplyTo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
          >
            <option value="">Select...</option>
            <option value="State Govt">State Govt</option>
            <option value="Central Govt">Central Govt</option>
            <option value="Private">Private</option>
          </select>
        </label>

        {/* State Government (conditional) */}
        {formData.supplyTo === 'State Govt' && (
          <label className="block mb-4 text-black font-semibold">
            Which State Government?
            <select
              name="stateGovernment"
              value={formData.stateGovernment}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded border border-orange-600 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-black"
            >
              <option value="">Select State...</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
        )}

        <button
          type="submit"
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-300"
        >
          Save
        </button>
      </form>

      <hr className="my-8 border-gray-300" />

      <h2 className="text-2xl font-bold mb-6 text-black">Previous Submissions</h2>

      {allForms.length === 0 && <p className="text-black">No previous submissions found.</p>}

      {allForms.map((form, idx) => (
        <div
          key={form.id ?? idx}
          className="mb-6 p-4 border border-orange-600 rounded bg-white text-black shadow-sm"
        >
          <p><strong>Company Name:</strong> {form.companyName}</p>
          <p><strong>Tender Start Date:</strong> {form.tenderStartDate}</p>
          <p><strong>Tender End Date:</strong> {form.tenderEndDate}</p>
          <p><strong>Company Number:</strong> {form.companyNumber}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Phone Number:</strong> {form.phoneNumber}</p>
          <p><strong>Address:</strong> {form.address}</p>
          <p><strong>Tender Worth:</strong> {form.tenderWorth}</p>
          <p><strong>Margin:</strong> {form.margin}</p>
          <p><strong>GST Number:</strong> {form.gstNumber}</p>
          <p><strong>Supply To:</strong> {form.supplyTo}</p>
          {form.supplyTo === 'State Govt' && (
            <p><strong>State Government:</strong> {form.stateGovernment}</p>
          )}
        </div>
      ))}
    </div>
    </>
  );
}
