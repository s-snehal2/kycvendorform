

import z from "zod/v3";
import { yesNoEnum } from "./constant";

export const itrYearEnum = z.enum(["2024-25", "2023-24"]);

export const formSchema = z.object({
itr: z.array(
  z.object({
    year: itrYearEnum,   
    ackNo: z.string().min(1, "ITR Acknowledge No is required"),
    date: z.coerce.date(),
  })
),


  pan:z.string().min(1) ,
  panFile:z.any(),
  tan: z.string().min(1),
  tanFile: z.any(),

  gstregno: z.string().min(1),
  gstFile:z.any(),

  msmeregno: z.string().min(1),
  msmeFile: z.any(),

  panLinkedWithAadhaar: yesNoEnum,
});

export type GovtCompliancesForm = z.infer<typeof formSchema>;
