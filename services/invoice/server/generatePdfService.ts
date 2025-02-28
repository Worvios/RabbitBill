import { NextRequest, NextResponse } from "next/server";

// Chromium – importing correctly to ensure proper access to its exports
import chromium from "@sparticuz/chromium";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { ENV, TAILWIND_CDN } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(
  req: NextRequest
): Promise<NextResponse> {
  const body: InvoiceType = await req.json();

  // Create a browser instance
  let browser;

  try {
    const ReactDOMServer = (await import("react-dom/server")).default;

    const execPath = chromium.executablePath;
    const templateId = body.details.pdfTemplate;
    const InvoiceTemplate = await getInvoiceTemplate(templateId);

    // Read the HTML template from a React component
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      InvoiceTemplate(body)
    );

    // Launch the browser in production or development mode depending on the environment
    if (ENV === "production") {
      const puppeteer = await import("puppeteer-core");

      // Using proper API for @sparticuz/chromium v122
      const execPath = await chromium.executablePath();

      if (!execPath) {
        throw new Error("No executablePath available for puppeteer-core");
      }

      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: execPath,
        headless: true, // Using the headless mode for Puppeteer
        ignoreHTTPSErrors: true,
      });
    } else if (ENV === "development") {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true, // Using the headless mode for Puppeteer
      });
    }

    if (!browser) {
      throw new Error("Failed to launch browser");
    }

    const page = await browser.newPage();
    console.log("Page opened"); // Debug log

    // Set the HTML content of the page
    await page.setContent(htmlTemplate, {
      waitUntil: "networkidle0",
    });
    console.log("Page content set"); // Debug log

    // Add Tailwind CSS
    await page.addStyleTag({
      url: TAILWIND_CDN,
    });
    console.log("Style tag added"); // Debug log

    // Generate the PDF
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
      margin: {
        top: "10px",
        bottom: "80px",
        left: "20px",
        right: "20px",
      },
    });
    console.log("PDF generated"); // Debug log

    // Close all pages before closing the browser
    for (const page of await browser.pages()) {
      await page.close();
    }

    // Close the Puppeteer browser
    await browser.close();
    console.log("Browser closed"); // Debug log

    // Create a Blob from the PDF data
    const pdfBlob = new Blob([pdf], { type: "application/pdf" });

    return new NextResponse(pdfBlob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(`Error generating PDF: ${error}`, {
      status: 500,
    });
  } finally {
    // Ensure browser is closed even if an error occurs
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        console.error("Error closing browser:", error);
      }
    }
  }
}
