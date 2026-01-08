"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { formSchema, InternalForm } from "./schema";

export default function MyForm() {
  const form = useForm<InternalForm>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 text-sm">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch {
      toast.error("Failed to submit the form");
    }
  }

  return (
    <div className="min-h-screen bg-muted/40 py-4 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-3xl mx-auto space-y-6 bg-background p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold text-center">
              Internal Form
            </h2>

            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6">
                <Field className="flex flex-row items-center gap-3">
                  <FieldLabel className="w-32">Account Group</FieldLabel>
                  <Select {...form.register("accountgroup")}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError />
                </Field>
              </div>

              <div className="md:col-span-6">
                <Field className="flex flex-row items-center gap-3">
                  <FieldLabel className="w-32">Recon. Account</FieldLabel>
                  <Select {...form.register("reconaccount")}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError />
                </Field>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 -mt-8">
              <div className="md:col-span-6">
                <Field className="flex flex-row items-center gap-3">
                  <FieldLabel className="w-32">Plant</FieldLabel>
                  <Select {...form.register("plant")}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError />
                </Field>
              </div>

              <div className="md:col-span-6">
                <Field className="flex flex-row items-center gap-3">
                  <FieldLabel className="w-32">Purchasing Org</FieldLabel>
                  <Select {...form.register("purchasingorg")}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError />
                </Field>
              </div>
            </div>
            <div className="border border-border p-2 rounded-md -mt-6">
              <h4 className="font-bold mb-2 p-1">Invoice:</h4>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-1 items-center -mt-4">
                <div className="md:col-span-3">
                  <Field className="flex flex-row items-center gap-2">
                    <FieldLabel className="whitespace-nowrap">
                      W/Tax Type
                    </FieldLabel>
                    <Select {...form.register("wtaxtype")}>
                      <SelectTrigger className="w-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field className="flex flex-row items-center gap-2">
                    <FieldLabel className="whitespace-nowrap">
                      W/Tax Code
                    </FieldLabel>
                    <Select {...form.register("wtaxcode")}>
                      <SelectTrigger className="w-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field className="flex flex-row items-center gap-2">
                    <FieldLabel className="whitespace-nowrap">
                      Recipient Type
                    </FieldLabel>
                    <Select {...form.register("recipienttype")}>
                      <SelectTrigger className="w-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <div className="flex flex-row gap-4">
                    <FieldLabel className="whitespace-nowrap">
                      Subject
                    </FieldLabel>
                    <Checkbox checked disabled {...form.register("subject")} />
                  </div>
                </div>
              </div>
              <h4 className="font-bold mb-2 p-1">Payment: </h4>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-1 items-center -mt-4">
                <div className="md:col-span-3">
                  <Field className="flex flex-row items-center gap-2">
                    <FieldLabel className="whitespace-nowrap">
                      W/Tax Type
                    </FieldLabel>
                    <Select {...form.register("wtaxtype")}>
                      <SelectTrigger className="w-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field className="flex flex-row items-center gap-2">
                    <FieldLabel className="whitespace-nowrap">
                      W/Tax Code
                    </FieldLabel>
                    <Select {...form.register("wtaxcode")}>
                      <SelectTrigger className="w-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field className="flex flex-row items-center gap-2">
                    <FieldLabel className="whitespace-nowrap">
                      Recipient Type
                    </FieldLabel>
                    <Select {...form.register("recipienttype")}>
                      <SelectTrigger className="w-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <div className="flex flex-row gap-4">
                    <FieldLabel className="whitespace-nowrap">
                      Subject
                    </FieldLabel>
                    <Checkbox checked disabled {...form.register("subject")} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 -mt-6">
              <Field>
                <div className="flex flex-row gap-4">
                  <FieldLabel className="whitespace-nowrap ">
                    Payment Term
                  </FieldLabel>
                  <div className="flex-1">
                    <Select {...form.register("paymentterm")}>
                      <SelectTrigger className="w-42">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <FieldError />
                </div>
              </Field>
            </div>

            <div className="flex justify-center pt-4">
              <Button className="px-10">Submit</Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
