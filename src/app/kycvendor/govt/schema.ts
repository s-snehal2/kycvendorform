// schema.ts

import z from "zod/v3";
import { yesNoEnum } from "./constant";

export const itrYearEnum = z.enum(["2024-25", "2023-24"]);

export const formSchema = z.object({
  itr: z
    .array(
      z.object({
        year: itrYearEnum,
        ackNo: z.string().min(1, "ITR Acknowledge No is required"),
        date: z.coerce.date(),
      })
    )
    .max(2),

  pan: z.any().refine((f) => f && f.length > 0, "PAN file is required"),
  tan: z.any().refine((f) => f && f.length > 0, "TAN file is required"),

  gstregno: z.string().min(1),
  gstcertificate: z.any().refine((f) => f && f.length > 0),

  msmeregno: z.string().min(1),
  msmecertificate: z.any().refine((f) => f && f.length > 0),

  panLinkedWithAadhaar: yesNoEnum,
});

export type GovtCompliancesForm = z.infer<typeof formSchema>;
