"use client";

import React, { useState } from "react";

// ShadCn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Components
import { BaseButton } from "@/app/components";

// Helpers
import { isValidEmail } from "@/lib/helpers";

type SendPdfToEmailModalProps = {
  sendPdfToMail: (email: string) => Promise<void>;
  children: React.ReactNode;
};

const SendPdfToEmailModal = ({
  sendPdfToMail,
  children,
}: SendPdfToEmailModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const errorMessage = "Please enter a valid email address";

  const handleSendPdf = () => {
    setLoading(true);

    if (isValidEmail(email)) {
      sendPdfToMail(email).finally(() => {
        setError("");
        setLoading(false);
        setEmail("");
        setOpen(false);
      });
    } else {
      setLoading(false);
      setError(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Envoyer par e-mail</DialogTitle>
          <DialogDescription>
            Veuillez spécifier l'adresse e-mail pour la livraison de la facture.
          </DialogDescription>
        </DialogHeader>
        <Label>E-mail</Label>
        <Input
          type="email"
          placeholder="Adresse Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>

        {!loading && error && <small style={{ color: "red" }}>{error}</small>}

        <BaseButton
          tooltipLabel="Send invoice PDF"
          loading={loading}
          loadingText="Sending email"
          onClick={handleSendPdf}
        >
          Envoyer PDF
        </BaseButton>
      </DialogContent>
    </Dialog>
  );
};

export default SendPdfToEmailModal;
