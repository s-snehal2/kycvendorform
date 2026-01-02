"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { BankDetailsFormType, formSchema } from "./scheme";
import { Card } from "@/components/ui/card";

export default function BankDetails() {
  const router = useRouter();
  const form = useForm<BankDetailsFormType>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (files: FileList | null) => {
    form.setValue("cancelcheque", files ? Array.from(files) : []);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-full rounded-md  p-4 text-xs">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      router.push("/kycvendor/preview");
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-4 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <Card className="min-h-[calc(100vh-2rem)] max-w-3xl  mx-auto space-y-6 bg-background p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold text-center">Bank Details</h2>

            {/* Bank Name & Cancelled Cheque */}
            <div className="grid md:grid-cols-2 gap-6 ">
              {/* Account Number */}
              <Field>
                <FieldLabel htmlFor="accountno">Account No</FieldLabel>
                <Input
                  id="accountno"
                  placeholder="Enter Account Number"
                  {...form.register("accountno")}
                  className="-mt-2"
                />
                <FieldError>
                  {form.formState.errors.accountno?.message}
                </FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="bankname">Bank Name</FieldLabel>
                <Input
                  id="bankname"
                  placeholder="Enter Bank Name"
                  {...form.register("bankname")}
                  className="-mt-2"
                />
                <FieldError>
                  {form.formState.errors.bankname?.message}
                </FieldError>
              </Field>
            </div>

            {/* Branch & IFSC Code */}
            <div className="grid md:grid-cols-2 gap-6 -mt-6">
              <Field>
                <FieldLabel htmlFor="branch" className="">
                  Branch
                </FieldLabel>
                <Input
                  id="branch"
                  placeholder="Enter Branch Name"
                  {...form.register("branch")}
                  className="-mt-2"
                />
                <FieldError>{form.formState.errors.branch?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="ifsccode" className="">
                  IFSC Code
                </FieldLabel>
                <Input
                  id="ifsccode"
                  placeholder="Enter IFSC Code"
                  {...form.register("ifsccode")}
                  className="-mt-2"
                />
                <FieldError>
                  {form.formState.errors.ifsccode?.message}
                </FieldError>
              </Field>
            </div>

            {/* Account Type & MICR Code */}
            <div className="grid md:grid-cols-2 gap-6 -mt-6">
              <Field>
                <FieldLabel htmlFor="accounttype" className="">
                  Type of Account
                </FieldLabel>
                <Input
                  id="accounttype"
                  placeholder="Savings / Current"
                  {...form.register("accounttype")}
                  className="-mt-2"
                />
                <FieldError>
                  {form.formState.errors.accounttype?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="digit" className="">
                  9 Digit MICR Code
                </FieldLabel>
                <Input
                  id="digit"
                  placeholder="Enter 9 Digit MICR Code"
                  {...form.register("digit")}
                  className="-mt-2"
                />
                <FieldError>{form.formState.errors.digit?.message}</FieldError>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="cancelcheque" className="-mt-6">
                Cancelled Cheque
              </FieldLabel>
              <Input
                type="file"
                id="cancelcheque"
                onChange={(e) => handleFileChange(e.target.files)}
                className="-mt-2 "
              />
            </Field>

            {/* Buttons */}
            <div className="flex justify-center gap-6 pt-10">
              <Button
                variant="outline"
                className="w-34"
                type="button"
                onClick={() => router.push("/kycvendor/govt")}
              >
                Back
              </Button>

              <Button variant="default" className="w-34" type="submit">
                Next
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
