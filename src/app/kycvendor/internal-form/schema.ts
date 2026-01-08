import z from "zod/v3";

export const formSchema = z.object({
  accountgroup: z.string(),
  reconaccount: z.string(),
  plant: z.string(),
  purchasingorg: z.string(),
  paymentterm: z.string(),
  wtaxtype: z.string(),
  wtaxcode: z.string(),
  subject: z.unknown(),
  recipienttype: z.string(),
});

export type InternalForm = z.infer<typeof formSchema>;