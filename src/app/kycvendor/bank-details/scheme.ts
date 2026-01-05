import z from "zod/v3";
import { accounttypeEnum } from "./constant";

export const formSchema = z.object({
  bankname: z.string().min(1, "Bank Name is required"),
  cancelcheque: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "Cancelled Cheque is required"
    ),
  branch: z.string().min(1, "Branch is required"),
  ifsccode: z.string().min(1, "IFSC Code is required"),
  accounttype: accounttypeEnum,
  digit: z.string().min(9, "MICR Code must be 9 digits").max(9),
  accountno: z.string().min(1, "Account No is required"),
});

export type BankDetailsFormType = z.infer<typeof formSchema>;