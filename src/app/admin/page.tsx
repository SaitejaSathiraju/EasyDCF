'use client';

import { useState, useEffect } from 'react';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid';

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

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [forms, setForms] = useState<FormDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  // Calculate total amount worth
  const totalAmountWorth = forms.reduce((sum, form) => sum + (typeof form.tenderworth === 'number' ? form.tenderworth : 0), 0);

  // Calculate average margin
  const averageMargin = forms.length > 0
    ? forms.reduce((sum, form) => sum + (typeof form.margin === 'number' ? form.margin : 0), 0) / forms.length
    : 0;

  // Calculate state usage counts and percentages
  const stateCounts: Record<string, number> = {};
  forms.forEach((form) => {
    const state = form.stategovernment || 'Unknown';
    stateCounts[state] = (stateCounts[state] || 0) + 1;
  });
  const statePercentages: Record<string, number> = {};
  Object.entries(stateCounts).forEach(([state, count]) => {
    statePercentages[state] = (count / forms.length) * 100;
  });

  // Load login state, forms, and completedIds on mount if logged in
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem('adminLoggedIn');
    const savedUser = localStorage.getItem('adminUsername');
    const savedPass = localStorage.getItem('adminPassword');
    const savedCompletedIds = localStorage.getItem('adminCompletedIds');
    if (savedLoggedIn === 'true' && savedUser && savedPass) {
      setUsername(savedUser);
      setPassword(savedPass);
      setLoggedIn(true);
      fetchForms();
    }
    if (savedCompletedIds) {
      try {
        const parsedIds: number[] = JSON.parse(savedCompletedIds);
        setCompletedIds(new Set(parsedIds));
      } catch {
        // ignore parse errors
      }
    }
  }, []);


  async function fetchForms() {
    setLoading(true);
    setError('');
    try {
      // Fetch from admin API route with hardcoded credentials
      const adminUsername = 'admin123';
      const adminPassword = 'secret456';
      const res = await fetch(`/api/admin/adminroute?username=${encodeURIComponent(adminUsername)}&password=${encodeURIComponent(adminPassword)}`);
      if (!res.ok) {
        throw new Error('Failed to fetch forms');
      }
      const data = await res.json();
      setForms(data.forms ?? []);
    } catch {
      setError('Failed to fetch data. Please login again.');
      setLoggedIn(false);
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminPassword');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Use hardcoded admin credentials for login
      const adminUsername = 'admin123';
      const adminPassword = 'secret456';
      const res = await fetch(`/api/admin/adminroute?username=${encodeURIComponent(adminUsername)}&password=${encodeURIComponent(adminPassword)}`);
      if (!res.ok) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setForms(data.forms ?? []);
      setLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUsername', adminUsername);
      localStorage.setItem('adminPassword', adminPassword);
    } catch {
      setError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setForms([]);
    setCompletedIds(new Set());
    setError('');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminPassword');
  }

  function toggleCompleted(id?: number) {
    if (!id) return;
    setCompletedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      // Persist to localStorage
      localStorage.setItem('adminCompletedIds', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  }

  if (!loggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Admin Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 w-full rounded hover:bg-orange-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-black font-bold text-xl">Loading...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gradient-to-r from-orange-100 via-white to-orange-100 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide drop-shadow-lg text-center flex-grow">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="ml-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-8 text-center text-lg font-semibold text-gray-700">
        Total Applications: <span className="text-orange-600">{forms.length}</span>
      </div>

      {/* New counters section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-2xl font-bold text-orange-600">{forms.length}</div>
          <div className="text-gray-600 font-semibold">Number of Submissions</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-2xl font-bold text-orange-600">
            {totalAmountWorth.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
          </div>
          <div className="text-gray-600 font-semibold">Total Amount Worth</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-2xl font-bold text-orange-600">
            {averageMargin.toFixed(2)}%
          </div>
          <div className="text-gray-600 font-semibold">Average Margin</div>
        </div>
        <div className="p-4 bg-white rounded shadow text-left">
          <div className="text-lg font-semibold text-gray-700 mb-2">State Usage</div>
          {Object.entries(statePercentages).map(([state, percent]) => (
            <div key={state} className="mb-1">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>{state}</span>
                <span>{percent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="bg-orange-600 h-2 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {forms.map((form, idx) => (
          <div
            key={form.id ?? idx}
            className={`p-6 rounded-lg shadow-md border-2 ${
              completedIds.has(form.id ?? -1)
                ? 'border-green-500 bg-green-50'
                : 'border-orange-400 bg-white'
            } transition-colors duration-300`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-orange-700">
                {form.companyname || 'Unnamed Company'}
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
              <div className="flex items-center space-x-2">
                <BuildingOffice2Icon className="w-5 h-5 text-orange-600" />
                <span><strong>Company Number:</strong> {form.companynumber}</span>
              </div>

              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-5 h-5 text-orange-600" />
                <span><strong>Email:</strong> {form.email}</span>
              </div>

              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-5 h-5 text-orange-600" />
                <span><strong>Phone Number:</strong> {form.phonenumber}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5 text-orange-600" />
                <span><strong>Address:</strong> {form.address}</span>
              </div>

              <div className="flex items-center space-x-2">
                <CalendarDaysIcon className="w-5 h-5 text-orange-600" />
                <span><strong>Tender Supply Start Date:</strong> {form.tenderstartdate}</span>
              </div>

              <div className="flex items-center space-x-2">
                <CalendarDaysIcon className="w-5 h-5 text-orange-600" />
                <span><strong>Tender Supply End Date:</strong> {form.tenderenddate}</span>
              </div>

              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="w-5 h-5 text-orange-600" />
                <span><strong>Tender Worth:</strong> {form.tenderworth}</span>
              </div>

              <div className="flex items-center space-x-2">
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-orange-600" />
                <span><strong>Margin:</strong> {form.margin}</span>
              </div>

              <div className="flex items-center space-x-2">
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-orange-600" />
                <span><strong>GST Number:</strong> {form.gstnumber}</span>
              </div>

              <div className="flex items-center space-x-2">
                <BuildingOffice2Icon className="w-5 h-5 text-orange-600" />
                <span><strong>Supply To:</strong> {form.supplyto}</span>
              </div>

              {form.supplyto === 'State Govt' && (
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-5 h-5 text-orange-600" />
                  <span><strong>Which State Government?</strong> {form.stategovernment}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
