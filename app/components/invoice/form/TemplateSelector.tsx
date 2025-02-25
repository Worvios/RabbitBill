"use client";

import Image from "next/image";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Components
import {
  BaseButton,
  InvoiceTemplate1,
  InvoiceTemplate2,
} from "@/app/components";

// Template images
import template1 from "@/public/assets/img/invoice-1-example.png";

// Icons
import { Check } from "lucide-react";

// Types
import { InvoiceType } from "@/types";

const TemplateSelector = () => {
  const { watch, setValue } = useFormContext<InvoiceType>();
  const formValues = watch();
  const templates = [
    {
      id: 1,
      name: "Modèle Français",
      description: "Facture en français",
      img: template1,
      component: <InvoiceTemplate1 {...formValues} />,
    },
    {
      id: 2,
      name: "Modèle Anglais",
      description: "Facture en Anglais",
      img: template1,
      component: <InvoiceTemplate2 {...formValues} />,
    },
  ];
  return (
    <>
      <div>
        <Label>Choisir un modèle de facture:</Label>

        <div>
          <Card>
            <CardHeader>
              Modèles
              <CardDescription>
                Sélectionnez l'un des modèles prédéfinis
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="flex overflow-x-auto">
                {templates.map((template, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col flex-shrink-0 mr-4 gap-y-3"
                  >
                    <p>{template.name}</p>

                    <div className="relative">
                      {formValues.details.pdfTemplate === template.id && (
                        <div className="shadow-lg absolute right-2 top-2 rounded-full bg-blue-300 dark:bg-blue-600">
                          <Check />
                        </div>
                      )}
                      <Image
                        src={template.img}
                        alt={template.name}
                        width={300}
                        height={700}
                        placeholder="blur"
                        className="cursor-pointer rounded-lg border-2 hover:border-blue-600"
                        onClick={() =>
                          setValue("details.pdfTemplate", template.id)
                        }
                      />
                      {/* {template.component} */}
                    </div>

                    <BaseButton
                      onClick={() =>
                        setValue("details.pdfTemplate", template.id)
                      }
                    >
                      Sélectionner
                    </BaseButton>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TemplateSelector;
