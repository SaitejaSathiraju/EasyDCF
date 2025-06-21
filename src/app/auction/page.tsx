'use client';
import { ReNavbar } from '@/components/magicui/renav';
import { useEffect, useState } from 'react';

type Tender = {
  id: number;
  companyname: string;
  tenderworth: number | string;
  tenderstartdate?: string;  // Added optional start date
  tenderenddate: string;
};

const CENTRAL_EMAIL = 'sattirAJUSAITEJA@GMAIL.COM'; // changed email here
const CENTRAL_PHONE = '+1234567890'; // keep or remove if no phone contact needed

export default function AuctionPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTenders() {
      try {
        const res = await fetch('/api/public/tenders');
        const data = await res.json();
        setTenders(data.forms ?? []);
      } catch (error) {
        console.error('Error fetching tenders', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTenders();
  }, []);

  function formatCurrency(value: number | string) {
    const amount = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(amount)) return '-';
    return amount.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  return (
    <>
    <ReNavbar></ReNavbar>
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">Auction Page</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading tenders...</p>
      ) : tenders.length === 0 ? (
        <p className="text-center text-gray-500">No tenders available.</p>
      ) : (
        <ul className="space-y-6">
          {tenders.map((tender) => (
            <li
              key={tender.id}
              className="border rounded p-6 hover:shadow-lg transition-shadow duration-300"
              aria-label={`Tender from ${tender.companyname}`}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-orange-700">{tender.companyname}</h2>
                {/* Multiply id by 21 for display */}
                <span className="text-sm text-gray-500 font-mono select-all">
                  ID: {tender.id * 2025}
                </span>
              </div>

              <p className="mb-2">
                <strong>Worth:</strong>{' '}
                <span className="text-green-700">{formatCurrency(tender.tenderworth)}</span>
              </p>

              {tender.tenderstartdate && (
                <p className="mb-4">
                  <strong>Start Date:</strong>{' '}
                  <time dateTime={tender.tenderstartdate} className="text-gray-600">
                    {new Date(tender.tenderstartdate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </p>
              )}

              <p className="mb-4">
                <strong>Deadline:</strong>{' '}
                <time dateTime={tender.tenderenddate} className="text-gray-600">
                  {new Date(tender.tenderenddate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </p>

              <div className="flex items-center space-x-4">
                <a
                  href={`mailto:${CENTRAL_EMAIL}?subject=Inquiry about tender from ${encodeURIComponent(
                    tender.companyname
                  )}`}
                  className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                  aria-label={`Contact auction team regarding ${tender.companyname}`}
                >
                  Contact via Email
                </a>

                {/* Optional phone contact */}
                {CENTRAL_PHONE && (
                  <a
                    href={`tel:${CENTRAL_PHONE}`}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    aria-label="Contact auction team via phone"
                  >
                    Call Us
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}
