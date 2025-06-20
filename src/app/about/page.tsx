"use client";

import { ReNavbar } from "@/components/magicui/renav";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Footer from "@/components/magicui/footer";

export default function About() {
  return (
    <>
      <ReNavbar />
      <div className="relative w-full overflow-visible flex flex-col items-center justify-center gap-8 py-16 min-h-screen bg-white">
     <DotPattern className="absolute inset-0 w-full min-h-screen h-full z-0" />

        <div className="relative z-10 max-w-6xl px-8 mx-auto text-gray-800">
          <h1 className="text-5xl font-extrabold text-center mb-8">
            About <span className="text-orange-600">EasyDCF</span>
          </h1>

          <p className="text-lg mb-8 leading-relaxed">
            Easy<span className="text-orange-600">DCF</span> is transforming how India&apos;s <strong>63 million+ MSMEs</strong> access capital by unlocking cash flow trapped in receivables — using advanced, transparent <strong>Discounted Cash Flow (DCF)</strong> financial technology.
          </p>

          {/* Market Overview Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">MSME Contribution</h3>
                <p>
                  MSMEs form the backbone of India’s economy — contributing nearly <strong>30%</strong> to GDP and generating over <strong>₹38 lakh crores</strong> in turnover annually.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">Payment Delays</h3>
                <p>
                  MSMEs face severe cash flow issues due to payment delays ranging from <strong>30 to 700 days</strong>, especially for government contracts.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">Cash Flow Gap</h3>
                <p>
                  The estimated cash flow gap for MSMEs annually is over <strong>₹10-15 lakh crores</strong>, causing major growth bottlenecks.
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Vision & Mission</h2>
            <div className="space-y-6 text-lg">
              <p>
                <strong>Vision:</strong> To create a financial ecosystem where no MSME has to wait weeks or months to get paid — enabling seamless, instant liquidity that fuels business growth and economic empowerment.
              </p>
              <p>
                <strong>Mission:</strong> To democratize access to receivables financing through cutting-edge DCF technology, connecting Indian MSMEs with both domestic and global investors — providing faster, fairer, and collateral-free working capital.
              </p>
              <p>
                We believe that every invoice is an opportunity, and EasyDCF is committed to unlocking these opportunities for millions of businesses and their communities.
              </p>
            </div>
          </section>

          {/* Core Values Cards */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center hover:bg-orange-100 transition">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">Transparency</h3>
                <p>We operate with full clarity — no hidden fees or surprises, ensuring trust at every step.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center hover:bg-orange-100 transition">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">Innovation</h3>
                <p>Leveraging the latest in finance tech to provide MSMEs with smart, simple cash flow solutions.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center hover:bg-orange-100 transition">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">Empowerment</h3>
                <p>Helping businesses of all sizes grow confidently with access to quick and fair capital.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center hover:bg-orange-100 transition">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">Inclusivity</h3>
                <p>Connecting MSMEs with global investors to build a truly inclusive financial ecosystem.</p>
              </div>
            </div>
          </section>

          {/* Global Impact */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Global Vision, Local Impact</h2>
            <p className="mb-4 text-lg">
              EasyDCF bridges Indian MSMEs with international investors, offering opportunities to back real businesses with transparent returns. 
              Our platform allows anyone across the world to contribute to and benefit from India&apos;s economic growth, while supporting the heartbeat of the nation — its MSMEs.
            </p>
            <ul className="list-disc list-inside space-y-3 text-lg max-w-3xl mx-auto">
              <li>Enabling cross-border investments into MSME receivables.</li>
              <li>Driving sustainable growth in manufacturing, agriculture, retail, and service sectors.</li>
              <li>Supporting financial inclusion through cutting-edge technology and data-driven credit evaluation.</li>
            </ul>
          </section>

          {/* Final Message */}
          <p className="text-center text-xl font-semibold mt-12 text-orange-600">
            EasyDCF — Empowering MSMEs. Fueling India&apos;s Growth. Join us on this journey to build a stronger, faster, and fairer financial future.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
