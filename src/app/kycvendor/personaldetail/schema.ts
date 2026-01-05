import z from "zod/v3";
import { constitutionEnum, designationEnum, statusEnum } from "./constant";



export const formSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1, "Address is required"),
  pin: z.string().min(1, "PIN is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  dobdoi: z.coerce.date(),
  status: statusEnum,
  constitution: constitutionEnum,
  contactpersonname: z.string().min(1),
   contactpersonmobileno: z.string().length(10, "Mobile number must be 10 digits"),
  designation: designationEnum,
  designationother : z.string(),
  mobileno: z.string().length(10, "Mobile number must be 10 digits"),
  email: z.string().email(),
});
export type PersonalDetailForm = z.infer<typeof formSchema>;