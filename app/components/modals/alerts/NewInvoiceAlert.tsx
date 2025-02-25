"use client";

import React, { useState } from "react";

// RHF
import { useFormContext } from "react-hook-form";

// Context
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// ShadCn
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type NewInvoiceAlertProps = {
  children: React.ReactNode;
};

const NewInvoiceAlert = ({ children }: NewInvoiceAlertProps) => {
  // Invoice context
  const { newInvoice } = useInvoiceContext();

  const {
    formState: { isDirty },
  } = useFormContext();

  const [open, setOpen] = useState(false);

  const handleNewInvoice = () => {
    if (isDirty) {
      // If the form is dirty, show the alert dialog
      setOpen(true);
    } else {
      // If the form is not dirty, call the newInvoice function from context
      newInvoice();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Vous risquez de perdre vos
              données si vous avez des modifications non enregistrées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={newInvoice}>
              Créer une nouvelle facture
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Not for showing div and instead showing the whole button */}
      {React.cloneElement(children as React.ReactElement, {
        onClick: handleNewInvoice,
      })}
    </>
  );
};

export default NewInvoiceAlert;
