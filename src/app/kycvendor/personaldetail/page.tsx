"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import z from "zod/v3";
import { formSchema, PersonalDetailForm } from "./schema";
import {
  CONSTITUTION_OPTIONS,
  constitutionEnum,
  DESIGNATION_OPTIONS,
  designationEnum,
  STATUS_OPTIONS,
  statusEnum,
} from "./constant";
import { Card } from "@/components/ui/card";

export default function PersonalDetails() {
  const router = useRouter();

  const form = useForm<PersonalDetailForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dobdoi: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-1 w-full rounded-md bg-slate-950 p-4 text-xs">
          <code className="text-white">{JSON.stringify(values, null, 1)}</code>
        </pre>
      );
      router.push("/kycvendor/govt");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-muted/40 py-4 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-3xl mx-auto space-y-6 bg-background p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold text-center tracking-tight">
              Vendor Details
            </h2>

            {/* BASIC INFO */}
            <div className="grid gap-5">
              <Field>
                <FieldLabel>Name of Vendor</FieldLabel>
                <Input {...form.register("name")} className="-mt-2" />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel className="">Address</FieldLabel>
                <Input {...form.register("address")} className="-mt-2" />
                <FieldError>
                  {form.formState.errors.address?.message}
                </FieldError>
              </Field>
            </div>

            {/* CONTACT + DATE */}
            <div className="grid md:grid-cols-3 gap-5 -mt-6">
              <Field>
                <FieldLabel className="">
                  Date of Birth / Date of Incorporation
                </FieldLabel>
                <Input
                  type="date"
                  {...form.register("dobdoi")}
                  className="-mt-2"
                />
                <FieldError>{form.formState.errors.dobdoi?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel className="  md:mt-4.5">Mobile Number</FieldLabel>
                <Input
                  type="number"
                  {...form.register("mobileno")}
                  className="-mt-2"
                />
                <FieldError>
                  {form.formState.errors.mobileno?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className=" md:mt-4.5">Email</FieldLabel>
                <Input {...form.register("email")} className="-mt-2" />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>
            </div>

            {/* STATUS */}
            <Field>
              <FieldLabel className="-mt-8">Status</FieldLabel>
              <RadioGroup
                value={form.watch("status")}
                onValueChange={(value) =>
                  form.setValue("status", value as z.infer<typeof statusEnum>)
                }
                className="grid sm:grid-cols-3 gap-4 rounded-lg border p-4 -mt-2"
              >
                {STATUS_OPTIONS.map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <RadioGroupItem value={item.value} />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </RadioGroup>
              <FieldError>{form.formState.errors.status?.message}</FieldError>
            </Field>

            {/* CONSTITUTION */}
            <Field>
              <FieldLabel className="-mt-8">Constitution</FieldLabel>
              <div className=" rounded-lg border p-4 -mt-2">
                <RadioGroup
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  value={form.watch("constitution")}
                  onValueChange={(value) =>
                    form.setValue(
                      "constitution",
                      value as z.infer<typeof constitutionEnum>
                    )
                  }
                >
                  {CONSTITUTION_OPTIONS.map((item) => (
                    <label
                      key={item.value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <RadioGroupItem value={item.value} />
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <FieldError>
                {form.formState.errors.constitution?.message}
              </FieldError>
            </Field>

            {/* PROPRIETOR + DESIGNATION */}
            <div className="grid md:grid-cols-1 gap-5 -mt-6">
              <Field>
                <FieldLabel className="-mt-1">
                  Name of Contact Person
                </FieldLabel>
                <Input {...form.register("proprietorname")} className="-mt-2" />
                <FieldError>
                  {form.formState.errors.proprietorname?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="">Designation</FieldLabel>
                <Select
                  value={form.watch("designation")}
                  onValueChange={(value) =>
                    form.setValue(
                      "designation",
                      value as z.infer<typeof designationEnum>
                    )
                  }
                >
                  <SelectTrigger className="-mt-2">
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESIGNATION_OPTIONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>
                  {form.formState.errors.designation?.message}
                </FieldError>
              </Field>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-center gap-6 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-34"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-34">
                Next
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
