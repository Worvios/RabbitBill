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
import { SavedInvoicesList } from "@/app/components";
import { ImportJsonButton } from "@/app/components";

// Context
import { useInvoiceContext } from "@/contexts/InvoiceContext";

type InvoiceLoaderModalType = {
  children: React.ReactNode;
};

const InvoiceLoaderModal = ({ children }: InvoiceLoaderModalType) => {
  const [open, setOpen] = useState(false);

  const { savedInvoices } = useInvoiceContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>Factures sauvegardées</DialogTitle>
          <DialogDescription>
            <div className="space-y-2">
              <p>Vous avez {savedInvoices.length} factures sauvegardées</p>
              <ImportJsonButton setOpen={setOpen} />
            </div>
          </DialogDescription>
        </DialogHeader>

        <SavedInvoicesList setModalState={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceLoaderModal;
