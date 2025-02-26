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
    <footer className="container py-10">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Developed By */}
        <p className="text-sm text-gray-600">
          {_t("footer.developedBy")}{" "}
          <a
            href={AUTHOR_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:text-blue-800 underline"
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
            className="text-gray-600 hover:text-gray-900"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href={AUTHOR_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href={AUTHOR_TWITTER}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Twitter"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href={AUTHOR_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-600"
            aria-label="Website"
          >
            <FaGlobe className="w-6 h-6" />
          </a>
        </div>

        {/* All Rights Reserved */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Rabi Chbibi. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default BaseFooter;
