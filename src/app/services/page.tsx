"use client";


import { DotPattern } from "@/components/magicui/dot-pattern";
import { ReNavbar } from "@/components/magicui/renav";
import Footer from "@/components/magicui/footer";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <ReNavbar />
      <br></br>
      <div className="relative w-full overflow-visible flex flex-col items-center justify-center gap-8 py-10 min-h-screen">
        {/* DotPattern absolutely positioned behind text, full size */}
        <DotPattern className="absolute inset-0 w-full h-full z-0" />

        {/* Text content with higher z-index */}
        <h1 className="text-6xl z-10 relative flex justify-center font-extrabold">Easy<span className="text-orange-600">DCF</span></h1>
        <h3 className="bg-white text-4xl z-10 relative text-bold px-3"> Unlock Your MSME’s Cash Flow Faster with Smart Discounted Cash Flow Solutions</h3>
<div className="text-2xl text-bold bg-orange-500 border-2 border-black rounded-2xl px-2 z-20">
  <SignInButton mode="modal">Try Now for Free (click here) !</SignInButton>
 

</div>
        <br></br>
<section className="py-12 bg-gray-50/35 text-center max-w-5xl mx-auto px-4 z-10">
    <h2 className="text-3xl font-semibold mb-10">Key Numbers at a Glance</h2>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-orange-600 text-3xl font-bold">63 million</p>
        <p className="mt-2">MSMEs in India</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-orange-600 text-3xl font-bold">Nearly 30%</p>
        <p className="mt-2">Contribution to India’s GDP</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-orange-600 text-3xl font-bold">₹38 lakh crores</p>
        <p className="mt-2">Annual Turnover by MSMEs</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-orange-600 text-3xl font-bold">180-700 days</p>
        <p className="mt-2">Average Payment Delay (State Govt)</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-orange-600 text-3xl font-bold">₹10-15 lakh crores</p>
        <p className="mt-2">Cash Flow Gap Annually</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-orange-600 text-3xl font-bold">Up to 90%</p>
        <p className="mt-2">Receivables Paid Instantly</p>
      </div>
      
    
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-orange-600 text-3xl font-bold">24-48 hours</p>
        <p className="mt-2">Cash Received After Acceptance</p>
      </div>
    </div>
  </section>




    <section className="max-w-4xl mx-auto px-4 py-12  text-gray-800 bg-gray-50/35 z-2 ">
      
    <h1 className="text-3xl font-bold text-center mb-6">
      Welcome to Easy<span className="text-orange-600">DCF</span> — Empowering MSMEs to Get Paid Faster!
    </h1>
    <p className="mb-6 text-lg leading-relaxed">
      Did you know there are over <strong>63 million MSMEs</strong> in India,
      contributing nearly <strong>30%</strong> of the country’s GDP and generating around 
      <strong> ₹38 lakh crores</strong> in annual turnover? Yet, a major challenge persists — 
      delayed payments that cripple cash flow and stall growth.
    </p>

    <h2 className="text-2xl font-semibold mt-10 mb-4 flex justify-center">What We Do</h2>
    <p className="mb-4">
      At EasyDCF, we revolutionize the way MSMEs manage their receivables by leveraging
      Discounted Cash Flow (DCF) techniques. Our innovative platform helps you:
    </p>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li><strong>Get paid faster:</strong> Convert your invoices and future receivables into immediate cash.</li>
      <li><strong>Improve cash flow:</strong> Maintain liquidity without waiting for long credit cycles.</li>
      <li><strong>Boost business growth:</strong> Invest in expansion, inventory, and operations without cash crunches.</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-10 mb-4 flex justify-center">Why Easy<span className="text-orange-600">DCF </span> ?</h2>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li>Over <strong>63 million MSMEs</strong> in India struggle with delayed payments averaging <strong>30-60+ days</strong>.</li>
      <li>Cash flow gap of <strong>₹10-15 lakh crores</strong> annually due to payment delays.</li>
      <li>Our DCF model discounts future cash flows at market rates to give you upfront working capital.</li>
      <li>Receive up to <strong>90%</strong> of your receivables instantly, rather than waiting weeks or months.</li>
      <li>Trusted by hundreds of MSMEs across sectors like manufacturing, services, retail, and more.</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-10 mb-4 flex justify-center">
      Advantages of DCF for Government Tender MSMEs
    </h2>
    <p className="mb-4">
      For MSMEs working on government contracts, payment delays can stretch to <strong>90–180 days</strong>, 
      leading to serious cash flow issues. Here’s why DCF is a game-changer:
    </p>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li><strong>Faster Access to Capital:</strong> Get funds against govt receivables without delay.</li>
      <li><strong>Reduced Financial Stress:</strong> Run operations smoothly without cash flow bottlenecks.</li>
      <li><strong>Leverage Predictable Flows:</strong> Government contracts have reliable payment schedules, ideal for DCF.</li>
      <li><strong>Avoid High-Interest Loans:</strong> DCF financing is a low-cost alternative to short-term borrowing.</li>
      <li><strong>Stay Competitive:</strong> With faster liquidity, you can win more bids and deliver on time.</li>
    </ul>
 
    
  </section>


  <br></br>
<section className="py-12 bg-white/60 text-center max-w-5xl mx-auto px-4 z-10">
  <h2 className="text-3xl font-semibold mb-6">Latest MSME News</h2>
  <div className="space-y-8">
    <article>
      <h3 className="text-xl font-semibold text-orange-600">
        Gujarat Partners with Amazon to Boost MSME Exports
      </h3>
      <p className="mt-2">
        The Gujarat government has signed an MoU with Amazon India to enhance exports from the state&apos;s MSMEs. This collaboration includes workshops, training sessions, and support for launching export operations via e-commerce. :contentReference[oaicite:5]
      </p>
      <a
        href="https://timesofindia.indiatimes.com/city/ahmedabad/gujarat-govt-partners-with-amazon-india-to-boost-msme-exports/articleshow/121657304.cms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:underline"
      >
        Read more
      </a>
    </article>

    <article>
      <h3 className="text-xl font-semibold text-orange-600">
        Coimbatore to Host ₹200 Crore Technology Centre for MSMEs
      </h3>
      <p className="mt-2">
        The Union MSME Ministry is establishing a state-of-the-art technology centre in Coimbatore with an investment of ₹200 crore. The centre will provide advanced manufacturing technologies and skill development to support MSMEs. :contentReference[oaicite:6]
      </p>
      <a
        href="https://timesofindia.indiatimes.com/city/coimbatore/technology-centre-to-come-up-in-coimbatore-at-200-crore/articleshow/121541946.cms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:underline"
      >
        Read more
      </a>
    </article>

    <article>
      <h3 className="text-xl font-semibold text-orange-600">
        UP Government Launches Export Growth Campaign for MSMEs
      </h3>
      <p className="mt-2">
        The Uttar Pradesh government has launched the Uttar Pradesh Export Growth Campaign (UPNVA) to empower 500 MSMEs. The initiative includes training, mentorship, and support for accessing international markets. :contentReference[oaicite:7]
      </p>
      <a
        href="https://timesofindia.indiatimes.com/city/lucknow/up-govt-prioritises-msmes-with-new-export-growth-campaign/articleshow/121524760.cms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:underline"
      >
        Read more
      </a>
    </article>
  </div>
</section>

  
  


      </div>
      <Footer  />
    
     
    </>
  );
}
