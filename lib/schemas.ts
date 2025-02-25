import { z } from "zod";

// Helpers
import { formatNumberWithCommas } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// TODO: Refactor some of the validators. Ex: name and zipCode or address and country have same rules
// Field Validators
const fieldValidators = {
  name: z
    .string()
    .min(2, { message: "Doit comporter au moins 2 caractères" })
    .max(50, { message: "Doit contenir au maximum 50 caractères" }),
  address: z
    .string()
    .min(2, { message: "Doit comporter au moins 2 caractères" })
    .max(70, { message: "Doit contenir entre 1 et 70 caractères" }),
  zipCode: z
    .string()
    .min(2, { message: "Doit contenir entre 2 et 20 caractères" })
    .max(20, { message: "Doit contenir entre 2 et 20 caractères" }),
  city: z
    .string()
    .min(1, { message: "Doit contenir entre 1 et 50 caractères" })
    .max(50, { message: "Doit contenir entre 1 et 50 caractères" }),
  country: z
    .string()
    .min(1, { message: "Doit contenir entre 1 et 70 caractères" })
    .max(70, { message: "Doit contenir entre 1 et 70 caractères" }),
  email: z
    .string()
    .email({ message: "L&apose-mail doit être un e-mail valide" })
    .min(5, { message: "Doit contenir entre 1 et 30 caractères" })
    .max(30, { message: "Doit contenir entre 1 et 30 caractères" }),
  phone: z
    .string()
    .min(1, { message: "Doit contenir entre 1 et 50 caractères" })
    .max(50, {
      message: "Doit contenir entre 1 et 50 caractères",
    }),

  // Dates
  date: z
    .date()
    .transform((date) =>
      new Date(date).toLocaleDateString("en-US", DATE_OPTIONS)
    ),

  // Items
  quantity: z.coerce.number().min(1, { message: "Doit être supérieur à  0" }),
  unitPrice: z.coerce.number().min(1, { message: "Doit être supérieur à 0" }),

  // Strings
  string: z.string(),
  stringMin1: z
    .string()
    .min(1, { message: "Doit comporter au moins 1 caractère" }),
  stringToNumber: z.coerce.number(),

  // Charges
  stringToNumberWithMax: z.coerce.number().max(1000000),

  stringOptional: z.string().optional(),

  nonNegativeNumber: z.coerce.number().nonnegative({
    message: "Doit être un nombre positif",
  }),
  // ! This is unused
  numWithCommas: z.coerce
    .number()
    .nonnegative({
      message: "Doit être un nombre positif",
    })
    .transform((value) => {
      return formatNumberWithCommas(value);
    }),
};

const CustomInputSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const InvoiceSenderSchema = z.object({
  name: fieldValidators.name,
  address: fieldValidators.address,
  zipCode: fieldValidators.zipCode,
  city: fieldValidators.city,
  country: fieldValidators.country,
  email: fieldValidators.email,
  phone: fieldValidators.phone,
  customInputs: z.array(CustomInputSchema).optional(),
});

const InvoiceReceiverSchema = z.object({
  name: fieldValidators.name,
  address: fieldValidators.address,
  zipCode: fieldValidators.zipCode,
  city: fieldValidators.city,
  country: fieldValidators.country,
  email: fieldValidators.email,
  phone: fieldValidators.phone,
  customInputs: z.array(CustomInputSchema).optional(),
});

const ItemSchema = z.object({
  name: fieldValidators.stringMin1,
  description: fieldValidators.stringOptional,
  quantity: fieldValidators.quantity,
  unitPrice: fieldValidators.unitPrice,
  total: fieldValidators.stringToNumber,
});

const PaymentInformationSchema = z.object({
  bankName: fieldValidators.stringOptional,
  accountName: fieldValidators.stringOptional,
  accountNumber: fieldValidators.stringOptional,
});

const DiscountDetailsSchema = z.object({
  amount: fieldValidators.stringToNumberWithMax,
  amountType: fieldValidators.string,
});

const TaxDetailsSchema = z.object({
  amount: fieldValidators.stringToNumberWithMax,
  taxID: fieldValidators.string,
  amountType: fieldValidators.string,
});

const ShippingDetailsSchema = z.object({
  cost: fieldValidators.stringToNumberWithMax,
  costType: fieldValidators.string,
});

const SignatureSchema = z.object({
  data: fieldValidators.string,
  fontFamily: fieldValidators.string.optional(),
});

const InvoiceDetailsSchema = z.object({
  invoiceLogo: fieldValidators.stringOptional,
  invoiceNumber: fieldValidators.stringMin1,
  invoiceDate: fieldValidators.date,
  dueDate: fieldValidators.date,
  purchaseOrderNumber: fieldValidators.stringOptional,
  currency: fieldValidators.string,
  language: fieldValidators.string,
  items: z.array(ItemSchema),
  paymentInformation: PaymentInformationSchema.optional(),
  taxDetails: TaxDetailsSchema.optional(),
  discountDetails: DiscountDetailsSchema.optional(),
  shippingDetails: ShippingDetailsSchema.optional(),
  subTotal: fieldValidators.nonNegativeNumber,
  totalAmount: fieldValidators.nonNegativeNumber,
  totalAmountInWords: fieldValidators.string,
  additionalNotes: fieldValidators.stringOptional,
  paymentTerms: fieldValidators.stringOptional,
  signature: SignatureSchema.optional(),
  updatedAt: fieldValidators.stringOptional,
  pdfTemplate: z.number(),
});

const InvoiceSchema = z.object({
  sender: InvoiceSenderSchema,
  receiver: InvoiceReceiverSchema,
  details: InvoiceDetailsSchema,
});

export { InvoiceSchema, ItemSchema };
