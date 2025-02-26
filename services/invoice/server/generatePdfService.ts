import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { getInvoiceTemplate } from "@/lib/helpers";
import { ENV, TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";

export async function generatePdfService(req: NextRequest) {
  const body: InvoiceType = await req.json();

  let browser;
  try {
    const ReactDOMServer = (await import("react-dom/server")).default;
    const templateId = body.details.pdfTemplate;
    const InvoiceTemplate = await getInvoiceTemplate(templateId);
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      InvoiceTemplate(body)
    );

    if (ENV === "production") {
      // In production, use puppeteer-core and @sparticuz/chromium
      const puppeteerCore = await import("puppeteer-core");
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath, // Fixed: await the property directly
        headless: true,
        // Casting to 'any' to bypass TS type errors if necessary
        ignoreHTTPSErrors: true,
      } as any);
    } else {
      // In development, use full puppeteer
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
    }

    if (!browser) throw new Error("Failed to launch browser");

    const page = await browser.newPage();

    // Emulate print media and set the page content
    await page.emulateMediaType("print");
    await page.setContent(htmlTemplate, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Add Tailwind CSS and wait for it to load
    await Promise.all([
      page.addStyleTag({ url: TAILWIND_CDN }),
      page.waitForNetworkIdle(),
    ]);

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

    // Cleanup: Close all pages and the browser
    const pages = await browser.pages();
    await Promise.all(pages.map((pg) => pg.close()));
    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new NextResponse(`Error generating PDF: ${error}`, {
      status: 500,
    });
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (err) {
        console.error("Error closing browser:", err);
      }
    }
  }
}
