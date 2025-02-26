"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// Next
import Link from "next/link";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/img/RabbitBill-logo.png";

// ShadCn
import { Card } from "@/components/ui/card";

// Components
import { DevDebug, LanguageSelector, ThemeSwitcher } from "@/app/components";

const BaseNavbar = () => {
  const devEnv = useMemo(() => {
    return process.env.NODE_ENV === "development";
  }, []);

  const { scrollY } = useScroll(); // Track scroll position
  const [hidden, setHidden] = useState(false); // Control visibility of the Navbar

  // Hide Navbar on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 50) {
      // Hide Navbar when scrolling down past 50px
      setHidden(true);
    } else {
      // Show Navbar when scrolling up
      setHidden(false);
    }
  });

  return (
    <motion.header
      initial={{ y: 0 }} // Start at the top
      animate={{ y: hidden ? -100 : 0 }} // Hide or show based on scroll
      transition={{ type: "spring", damping: 20, stiffness: 200 }} // Smooth animation
      className="fixed top-0 w-full z-[99]"
    >
      <nav>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={`flex justify-center items-center px-5 gap-5 rounded-none border-x-0 border-t-0 shadow-sm h-16 md:h-20 lg:h-24 ${
              // Apply the same gradient as the landing page
              "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
            }`}
          >
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={"/"}>
                <Image
                  src={Logo}
                  alt="RabbitBill Logo"
                  width={190}
                  height={100}
                  loading="eager"
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
            </motion.div>

            {/* Right Side: Dev Debug, Language Selector, Theme Switcher */}
            <div className="flex items-center gap-4">
              {/* ? DEV Only */}
              {devEnv && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <DevDebug />
                </motion.div>
              )}

              {/* Language Selector */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <LanguageSelector />
              </motion.div>

              {/* Theme Switcher */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <ThemeSwitcher />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default BaseNavbar;
