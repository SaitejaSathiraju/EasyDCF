"use client";

import { ReNavbar } from "@/components/magicui/renav";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Footer from "@/components/magicui/footer";
import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function Error404() {
  return (
    <>
      <ReNavbar />
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center gap-8 py-20 px-4 sm:px-8 lg:px-16 bg-white overflow-visible">
        <DotPattern className="absolute inset-0 w-full min-h-screen h-full z-0" />

        <div className="relative z-10 max-w-4xl w-full mx-auto text-gray-800 text-center">
          <div className="inline-flex items-center justify-center mb-8 text-orange-600 text-7xl sm:text-9xl font-extrabold">
            <FaExclamationTriangle className="mr-4" />
            404
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Oops! Page Not Found
          </h1>

          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
            At <span className="text-orange-600 font-semibold">EasyDCF</span>, we&apos;re all about simplifying your fintech and trade journeys — 
            but this page seems to have wandered off.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition"
          >
            <FaHome />
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
