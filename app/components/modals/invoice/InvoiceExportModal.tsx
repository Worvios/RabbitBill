"use client";

import { useState } from "react";

// ShadCn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Components
import { BaseButton } from "@/app/components";

// Context
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Types
import { ExportTypes } from "@/types";

type InvoiceExportModalType = {
  children: React.ReactNode;
};

const InvoiceExportModal = ({ children }: InvoiceExportModalType) => {
  const [open, setOpen] = useState(false);

  const { invoicePdfLoading, exportInvoiceAs } = useInvoiceContext();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exporter la facture</DialogTitle>
          <DialogDescription>
            Veuillez sélectionner l'option d'exportation pour votre facture
          </DialogDescription>
        </DialogHeader>

        {/* Export options here */}

        <div className="flex flex-wrap flex-row gap-5">
          <BaseButton
            tooltipLabel="Export Invoice as JSON"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs(ExportTypes.JSON)}
          >
            Exporter au format JSON
          </BaseButton>
          <BaseButton
            tooltipLabel="Export Invoice as CSV"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs(ExportTypes.CSV)}
          >
            Exporter au format CSV
          </BaseButton>

          <BaseButton
            tooltipLabel="Export Invoice as XML"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs(ExportTypes.XML)}
          >
            Exporter au format XML
          </BaseButton>

          <BaseButton
            tooltipLabel="Export Invoice as XLSX"
            variant="outline"
            disabled={invoicePdfLoading}
            onClick={() => exportInvoiceAs(ExportTypes.XLSX)}
          >
            Exporter au format XLSX
          </BaseButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceExportModal;
