import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate = (data: InvoiceType) => {
  const { sender, receiver, details } = data;

  return (
    <InvoiceLayout data={data}>
      {/* First Page Content */}
      <div className="print:break-inside-avoid">
        {/* Logo: Top Center */}
        <div className="flex justify-center mb-4 print:mb-4">
          {details.invoiceLogo && (
            <img
              src={details.invoiceLogo}
              width={140}
              height={100}
              alt={`Logo of ${sender.name}`}
              className="print:h-20 print:w-28"
            />
          )}
        </div>

        <div className="flex justify-between">
          {/* Sender Address: Left */}
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-blue-600 print:text-black">
              {sender.name}
            </h1>
            <address className="mt-2 not-italic text-gray-800 print:text-sm">
              {sender.address}
              <br />
              {sender.zipCode}, {sender.city}
              <br />
              {sender.country}
            </address>
          </div>

          {/* Invoice number and dates: Right */}
          <div className="text-right">
            {/* Invoice Title and Number in One Line */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 print:text-black">
              Facture #{" "}
              <span className="font-normal text-gray-600">
                {details.invoiceNumber}
              </span>
            </h2>

            {/* Dates below, in smaller text */}
            <div className="mt-1 text-xs">
              <dl className="flex justify-end gap-x-2">
                <dt className="font-semibold text-gray-700">
                  Date de facture:
                </dt>
                <dd className="text-gray-500">
                  {new Date(details.invoiceDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </dd>
              </dl>
              <dl className="flex justify-end gap-x-2 mt-0.5">
                <dt className="font-semibold text-gray-700">
                  Date d&apos;échéance:
                </dt>
                <dd className="text-gray-500">
                  {new Date(details.dueDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <div>{/* Empty column to maintain grid layout */}</div>
          {/* Recipient/Client: Far Right */}
          <div className="sm:text-right">
            <h3 className="text-lg font-semibold text-gray-800">Facture à:</h3>
            <h3 className="text-lg font-semibold text-gray-800">
              {receiver.name}
            </h3>
            <address className="mt-2 not-italic text-gray-500">
              {receiver.address}, {receiver.zipCode}
              <br />
              {receiver.city}, {receiver.country}
              <br />
            </address>
          </div>
        </div>

        {/* Main table content with page break control */}
        <div className="mt-3 print:mt-4 print:break-inside-avoid">
          <div className="border border-gray-200 p-1 rounded-lg space-y-1">
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                Article
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase">
                Qté
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase">
                Prix
              </div>
              <div className="text-right text-xs font-medium text-gray-500 uppercase">
                Montant
              </div>
            </div>
            <div className="hidden sm:block border-b border-gray-200"></div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-1">
              {details.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="col-span-full sm:col-span-2 border-b border-gray-300">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                  <div className="border-b border-gray-300">
                    <p className="text-gray-800">{item.quantity}</p>
                  </div>
                  <div className="border-b border-gray-300">
                    <p className="text-gray-800">
                      {item.unitPrice} {details.currency}
                    </p>
                  </div>
                  <div className="border-b border-gray-300">
                    <p className="sm:text-right text-gray-800">
                      {item.total} {details.currency}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="sm:hidden border-b border-gray-200"></div>
          </div>
        </div>

        {/* Totals section with page break control */}
        <div className="mt-4 flex sm:justify-end print:break-inside-avoid">
          <div className="sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">
                  Prix totale HT:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {formatNumberWithCommas(Number(details.subTotal))}{" "}
                  {details.currency}
                </dd>
              </dl>
              {details.discountDetails?.amount != undefined &&
                details.discountDetails?.amount > 0 && (
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Réduction:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {details.discountDetails.amountType === "amount"
                        ? `- ${details.discountDetails.amount} ${details.currency}`
                        : `- ${details.discountDetails.amount}%`}
                    </dd>
                  </dl>
                )}
              {details.taxDetails?.amount != undefined &&
                details.taxDetails?.amount > 0 && (
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      TVA:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {details.taxDetails.amountType === "amount"
                        ? `+ ${details.taxDetails.amount} ${details.currency}`
                        : `+ ${details.taxDetails.amount}%`}
                    </dd>
                  </dl>
                )}
              {details.shippingDetails?.cost != undefined &&
                details.shippingDetails?.cost > 0 && (
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Livraison:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {details.shippingDetails.costType === "amount"
                        ? `+ ${details.shippingDetails.cost} ${details.currency}`
                        : `+ ${details.shippingDetails.cost}%`}
                    </dd>
                  </dl>
                )}
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">
                  Totale:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {formatNumberWithCommas(Number(details.totalAmount))}{" "}
                  {details.currency}
                </dd>
              </dl>
              {details.totalAmountInWords && (
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Totale en mots:
                  </dt>
                  <dd className="col-span-2 text-gray-500">
                    <em>
                      {details.totalAmountInWords} {details.currency}
                    </em>
                  </dd>
                </dl>
              )}
            </div>
          </div>
        </div>

        {/* Notes and payment section with page break control */}
        <div className="print:pb-20 print:break-inside-avoid">
          <div className="my-4">
            <div className="my-2">
              <p className="font-semibold text-blue-600">
                Notes supplémentaires:
              </p>
              <p className="font-regular text-gray-800">
                {details.additionalNotes}
              </p>
            </div>
            <div className="my-2">
              <p className="font-semibold text-blue-600">
                Conditions de paiement:
              </p>
              <p className="font-regular text-gray-800">
                {details.paymentTerms}
              </p>
            </div>
            {/* Bank account details and signature on the same line */}
            <div className="my-2 flex justify-between items-start">
              <div>
                <span className="font-semibold text-md text-gray-800">
                  Merci d'envoyer le paiement à l'adresse suivante:
                  <p className="text-sm">
                    Banque: {details.paymentInformation?.bankName}
                  </p>
                  <p className="text-sm">
                    Nom du titulaire du compte:{" "}
                    {details.paymentInformation?.accountName}
                  </p>
                  <p className="text-sm">
                    Numéro de compte:{" "}
                    {details.paymentInformation?.accountNumber}
                  </p>
                </span>
              </div>

              {/* Signature moved right */}
              {details?.signature?.data && (
                <div className="text-right">
                  <p className="font-semibold text-gray-800">Signature:</p>
                  {isDataUrl(details.signature.data) ? (
                    <img
                      src={details.signature.data}
                      width={120}
                      height={60}
                      alt={`Signature of ${sender.name}`}
                      className="print:h-14 print:w-32 ml-auto"
                    />
                  ) : (
                    <p
                      style={{
                        fontSize: 30,
                        fontWeight: 400,
                        fontFamily: `${details.signature.fontFamily}, cursive`,
                      }}
                    >
                      {details.signature.data}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer section */}
          <div className="mt-8 border-t pt-4">
            <p className="text-gray-500 text-sm">
              Si vous avez des questions concernant cette facture, veuillez
              utiliser les coordonnées suivantes:
            </p>
            <div>
              <p className="block text-sm font-medium text-gray-800">
                {sender.email}
              </p>
              <p className="block text-sm font-medium text-gray-800">
                {sender.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Page Header */}
      <div className="hidden print:block print:fixed print:top-0 print:left-0 print:right-0 print:bg-white print:z-50 print:border-b print:border-gray-200 print:p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {sender.name}
            </h2>
            <p className="text-xs text-gray-600">{sender.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-600">
              Facture #: {details.invoiceNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <div className="hidden print:block print:fixed print:bottom-0 print:left-0 print:right-0 print:bg-white print:z-50 print:border-t print:border-gray-200 print:p-4">
        <div className="text-center text-xs text-gray-500">
          <p>
            {sender.email} | {sender.phone}
          </p>
          <p>
            {sender.address}, {sender.zipCode}, {sender.city}, {sender.country}
          </p>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate;
