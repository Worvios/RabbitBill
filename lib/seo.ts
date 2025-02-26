import { AUTHOR_WEBSITE, BASE_URL } from "@/lib/variables";

export const ROOTKEYWORDS = [
  "invoice",
  "invoice generator",
  "invoice generating",
  "invoice app",
  "invoice generator app",
  "free invoice generator",
  "rabbitbill",
  "coderabbit",
  "rabi chbibi",
];

export const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Website",
  name: "RabbitBill",
  description:
    "A web application that generates invoices with the option to export, print and send them per email",
  keywords: ROOTKEYWORDS,
  url: BASE_URL,
  image:
    "https://github.com/Worvios/RabbitBill/blob/aab927ade2cf26e4a6a31ac7421587bfc02ad123/public/assets/img/invoify-logo.svg",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/#website`,
  },
  author: {
    "@type": "Person",
    name: "Rabi Chbibi",
    url: AUTHOR_WEBSITE,
  },
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}`,
    },
  ],
};
