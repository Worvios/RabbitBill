"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

// Variables
import {
  AUTHOR_GITHUB,
  AUTHOR_LINKEDIN,
  AUTHOR_TWITTER,
  AUTHOR_WEBSITE,
} from "@/lib/variables";

const BaseFooter = () => {
  const { _t } = useTranslationContext();

  return (
    <footer
      className={`py-10 mt-20 shadow-sm ${
        // Same gradient as the Navbar and Landing Page
        "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      }`}
    >
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Developed By */}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {_t("footer.developedBy")}{" "}
            <a
              href={AUTHOR_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
            >
              Rabi Chbibi @coderabbit.de
            </a>
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href={AUTHOR_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href={AUTHOR_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href={AUTHOR_TWITTER}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-300 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href={AUTHOR_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors"
              aria-label="Website"
            >
              <FaGlobe className="w-6 h-6" />
            </a>
          </div>

          {/* All Rights Reserved */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Rabi Chbibi. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BaseFooter;
