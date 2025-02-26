import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { getInvoiceTemplate } from "@/lib/helpers";
import { ENV, TAILWIND_CDN } from "@/lib/variables"; // Remove CHROMIUM_EXECUTABLE_PATH from here
import type { InvoiceType } from "@/types";

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
      const puppeteer = await import("puppeteer-core");
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless as "shell", // Type assertion for production
      });
    } else {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "shell" as const, // Use "shell" instead of "new" for type safety
        executablePath: process.env.CHROMIUM_EXECUTABLE_PATH,
      });
    }

    if (!browser) throw new Error("Browser launch failed");

    const page = await browser.newPage();
    await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });
    await page.addStyleTag({ url: TAILWIND_CDN });

    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
      margin: { top: "10px", bottom: "80px", left: "20px", right: "20px" },
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return new NextResponse(`Error generating PDF: ${error}`, { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}
