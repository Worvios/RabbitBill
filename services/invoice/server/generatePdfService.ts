import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { getInvoiceTemplate } from "@/lib/helpers";
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";
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

    const puppeteer = await import("puppeteer");

    // Browser launch configuration remains the same
    if (ENV === "production") {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH),
        headless: true,
        ignoreHTTPSErrors: true,
      });
    } else {
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
    }

    if (!browser) throw new Error("Failed to launch browser");

    const page = await browser.newPage();

    // Critical changes start here
    await page.emulateMediaType("print"); // Ensure print media queries are respected
    await page.setContent(htmlTemplate, {
      waitUntil: "networkidle0",
      timeout: 30000, // Increased timeout for complex layouts
    });

    // Add Tailwind CSS with proper waiting
    await Promise.all([
      page.addStyleTag({ url: TAILWIND_CDN }),
      page.waitForNetworkIdle(), // Ensure CSS is fully loaded
    ]);

    // Configure PDF generation for multi-page support
    // In generatePdfService function
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
      margin: {
        top: "10px", // Match header height
        bottom: "80px", // Match footer height
        left: "20px",
        right: "20px",
      },
      //displayHeaderFooter: false, // Disable Puppeteer's native header/footer
    });

    // Cleanup
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
