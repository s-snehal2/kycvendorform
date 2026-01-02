import z from "zod/v3";

export const yesNoEnum = z.enum(["Yes", "No"]);
export const ITR_YEARS = ["2024-25", "2023-24"] as const;
