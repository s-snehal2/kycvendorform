"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, PlusIcon, Trash2 } from "lucide-react";
import { z } from "zod/v3";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form } from "@/components/ui/form";

import { formSchema, GovtCompliancesForm } from "./schema";
import { yesNoEnum, ITR_YEARS } from "./constant";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Govt() {
  const router = useRouter();
  const [panFileName, setPanFileName] = useState("");

  const form = useForm<GovtCompliancesForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itr: [],
      panLinkedWithAadhaar: "Yes",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itr",
  });

  /* ------------------ ITR YEAR CONTROL ------------------ */
  const addedYears = fields.map((f) => f.year);
  const remainingYears = ITR_YEARS.filter((year) => !addedYears.includes(year));

  const handleAddYear = () => {
    if (remainingYears.length > 0) {
      append({
        year: remainingYears[0],
        ackNo: "",
        date: new Date(),
      });
    }
  };

  /* ------------------ FILE HANDLER ------------------ */
  const handleFileChange = (
    fieldName: keyof GovtCompliancesForm,
    files: FileList | null
  ) => {
    form.setValue(fieldName, files ? files : "");
  };

  function onSubmit(values: GovtCompliancesForm) {
    console.log(values);
    toast.success("Govt Compliances Saved");
    router.push("/kycvendor/bank-details");
  }

  return (
    <div className="min-h-screen bg-muted/40 py-4 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-3xl mx-auto space-y-6 bg-background p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold text-center">
              Govt Compliances
            </h2>

            {/* ------------------ PAN / TAN ------------------ */}
            <div className="grid md:grid-cols-2 gap-6 -mt-4">
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-9">
                  <Field>
                    <FieldLabel>PAN No</FieldLabel>
                    <Input type="text" placeholder="Enter PAN Number" />
                  </Field>
                </div>

                <div className="col-span-3">
                  <Field>
                    <FieldLabel className="text-center"></FieldLabel>

                    <div className="flex justify-center">
                      <PlusIcon
                        className="h-5 w-5 text-muted-foreground cursor-pointer"
                        onClick={() =>
                          (
                            document.getElementById(
                              "pan-file-input"
                            ) as HTMLInputElement
                          )?.click()
                        }
                      />
                    </div>

                    <Input
                      id="pan-file-input"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPanFileName(file.name);
                          handleFileChange("pan", e.target.files);
                        }
                      }}
                    />

                    {panFileName && (
                      <p className="text-xs text-muted-foreground mt-1 text-center">
                        ✔ {panFileName} attached
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              {panFileName && (
                <p className="text-sm text-green-600 mt-1">
                  File attached: {panFileName}
                </p>
              )}

              {/*TAN Document*/}

              <Field>
                <FieldLabel className="">TAN Document</FieldLabel>
                <Input
                  type="file"
                  onChange={(e) => handleFileChange("tan", e.target.files)}
                  className="-mt-2"
                />
              </Field>
            </div>

            {/* ------------------ PAN LINK ------------------ */}
            <Field className="-mt-6">
              <FieldLabel className="">PAN linked with Aadhaar</FieldLabel>
              <RadioGroup
                value={form.watch("panLinkedWithAadhaar")}
                onValueChange={(v) =>
                  form.setValue(
                    "panLinkedWithAadhaar",
                    v as z.infer<typeof yesNoEnum>
                  )
                }
                className="flex gap-6 border rounded-lg p-4 -mt-2"
              >
                {["Yes", "No"].map((v) => (
                  <label key={v} className="flex items-center gap-2">
                    <RadioGroupItem value={v} />
                    <span>{v}</span>
                  </label>
                ))}
              </RadioGroup>
            </Field>

            {/* ------------------ GST ------------------ */}
            <div className="grid md:grid-cols-2 gap-6 -mt-6">
              <Field>
                <FieldLabel className="">GST Registration No</FieldLabel>
                <Input {...form.register("gstregno")} className="-mt-2" />
              </Field>

              <Field>
                <FieldLabel className="">GST Certificate</FieldLabel>
                <Input
                  type="file"
                  onChange={(e) =>
                    handleFileChange("gstcertificate", e.target.files)
                  }
                  className="-mt-2"
                />
              </Field>
            </div>

            {/* ------------------ MSME ------------------ */}
            <div className="grid md:grid-cols-2 gap-6 -mt-6">
              <Field>
                <FieldLabel className="">MSME Registration No</FieldLabel>
                <Input {...form.register("msmeregno")} className="-mt-2" />
              </Field>

              <Field>
                <FieldLabel className="">MSME Certificate</FieldLabel>
                <Input
                  type="file"
                  onChange={(e) =>
                    handleFileChange("msmecertificate", e.target.files)
                  }
                  className="-mt-2"
                />
              </Field>
            </div>

            {/* ------------------ ITR SECTION ------------------ */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold flex flex-col">
                  ITR Filed
                  <span>(FY 2024–25 & 2023–24)</span>
                </h4>

                {remainingYears.length > 0 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddYear}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                  </Button>
                )}
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border rounded-lg p-4 space-y-4 bg-muted/20"
                >
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">
                      Financial Year:{" "}
                      <span className="text-primary">{field.year}</span>
                    </h5>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(index)}
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 -mt-2">
                    <Field>
                      <FieldLabel>ITR Acknowledge No</FieldLabel>
                      <Input {...form.register(`itr.${index}.ackNo`)} />
                      <FieldError>
                        {form.formState.errors.itr?.[index]?.ackNo?.message}
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Date of Filing</FieldLabel>
                      <Input
                        type="date"
                        {...form.register(`itr.${index}.date`)}
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
            {/* IMPORTANT NOTE */}
            <p className="text-sm text-red-600 font-semibold border-l-4 border-red-500 pl-3 py-2 bg-red-50 rounded">
              If Income Tax Return as per Section 139(1) for the financial year
              2020-21 is not filed then, I undertake you to provide the ITR
              acknowledgement after filing the ITR and if the same is not
              provided then you can deduct the TDS as per section 206AB/206CCA,
              and we undertake to reimburse applicable Interest/Penalty on same.
            </p>

            {/* ------------------ ACTIONS ------------------ */}
            <div className="flex justify-center gap-6 pt-6 -mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
                className="w-34"
              >
                Back
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
