import z from "zod/v3";
import { constitutionEnum, designationEnum, statusEnum } from "./constant";



export const formSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  dobdoi: z.coerce.date(),
  status: statusEnum,
  constitution: constitutionEnum,
  proprietorname: z.string().min(1),
  designation: designationEnum,
  mobileno: z.string().length(10, "Mobile number must be 10 digits"),
  email: z.string().email(),
});
export type PersonalDetailForm = z.infer<typeof formSchema>;