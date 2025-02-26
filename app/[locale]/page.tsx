"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  FileText,
  DownloadCloud,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

// Components
import { InvoiceMain } from "@/app/components";

export default function LandingPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Track if the component has mounted
  const [showInvoice, setShowInvoice] = useState(false); // State to control rendering of <InvoiceMain />

  // Wait until the component has mounted to show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Professional Templates",
      description: "Choose from multiple customizable invoice templates",
      image: "/assets/img/template.png", // Path to the image
    },
    {
      icon: <DownloadCloud className="w-6 h-6" />,
      title: "Export Options",
      description: "Download as PDF, SVG, or share directly via email",
      image: "/assets/img/export.png", // Path to the image
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Storage",
      description: "Your invoices safely stored in the cloud",
      image: "/assets/img/secure.png", // Path to the image
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Fast Processing",
      description: "Generate invoices in seconds with AI assistance",
      image: "/assets/img/fast.png", // Path to the image
    },
  ];

  // If showInvoice is true, render <InvoiceMain />
  if (showInvoice) {
    return (
      <main className="py-10 lg:container">
        <InvoiceMain />
        <button
          onClick={() => setShowInvoice(false)} // Button to go back to the landing page
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </main>
    );
  }

  // Don't render the UI until the component has mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-700">
        {/* You can change the spinner size here */}
        <div className="w-20 h-20 border-t-8 border-purple-600 border-solid rounded-full animate-spin" />
        {/* Custom Text */}
        <p className="text-xl text-gray-700 dark:text-gray-200">
          Loading, please wait...
        </p>
      </div>
    );
  }

  // Otherwise, render the landing page
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        resolvedTheme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-gray-50 to-gray-100"
      }`}
    >
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Revolutionize Your Invoicing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Create, manage, and track professional invoices in minutes. Free
            forever with premium options available.
          </p>
          <div className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => setShowInvoice(true)} // Button to show <InvoiceMain />
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
              >
                Get Started
                <Rocket className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Invoice Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 md:mt-32 relative max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-10 blur-xl" />
          <div className="relative">
            {/* Video Demo */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
              <div className="w-full aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                >
                  <source
                    src="/assets/video/RabbitBill-video.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="/assets/video/RabbitBill-video.webm"
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-8 w-24 bg-blue-200 dark:bg-blue-900 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
            <div className="mt-8 h-12 w-48 ml-auto bg-purple-200 dark:bg-purple-900 rounded animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
          Why Choose Our Invoice Generator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
              {/* Feature Image */}
              <div className="mt-4 w-full h-32 relative rounded-lg overflow-hidden">
                <Image
                  src={feature.image} // Path to the image
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* User Avatar */}
              <div className="w-16 h-16 relative rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src={`/assets/img/avatar${i}.png`} // Path to the avatar image
                  alt={`User ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                "This app has transformed how I manage my invoices. Highly
                recommended!"
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-semibold text-center">
                – User {i}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Invoicing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already streamlining their finances
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => setShowInvoice(true)} // Button to show <InvoiceMain />
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 hover:bg-gray-100"
            >
              Start Free Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
