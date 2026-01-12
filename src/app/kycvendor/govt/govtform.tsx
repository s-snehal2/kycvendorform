"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { PlusIcon, Trash } from "lucide-react";
import { z } from "zod/v3";
import { useState } from "react";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";

import { formSchema, GovtCompliancesForm } from "./schema";
import { yesNoEnum, plannedITRYears } from "./constant";
import { useVendorForm } from "../hook/vendorcontext";

export default function GovtForm() {
  const router = useRouter();
  const { vendor } = useVendorForm();
  const { setGovtForm } = useVendorForm();

  const [panFileName, setPanFileName] = useState<string | null>(null);
  const [tanFileName, setTanFileName] = useState<string | null>(null);
  const [gstFileName, setGstFileName] = useState<string | null>(null);
  const [msmeFileName, setMsmeFileName] = useState<string | null>(null);

  const form = useForm<GovtCompliancesForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      panLinkedWithAadhaar: "Yes",
      msmeregister: "No",
      itr: plannedITRYears.map((y) => ({
        year: y.year.replace("–", "-") as "2024-25" | "2023-24",
        ackNo: "",
        date: undefined,
      })),
    },
  });
  const msmeregister = form.watch("msmeregister");

  // const searchParams = useSearchParams();
  // const constitution = searchParams.get("constitution");
  const constitution = vendor?.constitution !== "Individual";

  /* ------------------ FILE HANDLER ------------------ */
  const handleFileChange = (
    fieldName: keyof GovtCompliancesForm,
    files: FileList | null
  ) => {
    form.setValue(fieldName, files ? files : "");
  };

  /* ------------------ PAN ------------------ */
  const handlePanFileDelete = () => {
    setPanFileName(null);
    const input = document.getElementById("pan-file-input") as HTMLInputElement;
    if (input) input.value = "";
    handleFileChange("panFile", null);
  };

  /* ------------------ TAN ------------------ */
  const handleTanFileDelete = () => {
    setTanFileName(null);
    const input = document.getElementById("tan-file-input") as HTMLInputElement;
    if (input) input.value = "";
    handleFileChange("tanFile", null);
  };

  /* ------------------ GST ------------------ */
  const handleGstFileDelete = () => {
    setGstFileName(null);
    const input = document.getElementById("gst-file-input") as HTMLInputElement;
    if (input) input.value = "";
    handleFileChange("gstFile", null);
  };

  /* ------------------ MSME ------------------ */
  const handleMsmeFileDelete = () => {
    setMsmeFileName(null);
    const input = document.getElementById(
      "msme-file-input"
    ) as HTMLInputElement;
    if (input) input.value = "";
    handleFileChange("msmeFile", null);
  };

  function onSubmit(values: GovtCompliancesForm) {
    setGovtForm(values);
    // toast.success("Govt Compliances Saved");
    // router.push("/kycvendor/bank-details");
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PAN */}
              <div>
                <div className="grid grid-cols-12 gap-2 items-end md:mt-1">
                  <div className="col-span-10">
                    <Field>
                      <FieldLabel>PAN No</FieldLabel>
                      <Input
                        type="text"
                        className="-mt-2"
                        {...form.register("pan")}
                      />
                    </Field>
                  </div>
                  <div className="col-span-2">
                    {!panFileName && (
                      <div className="flex justify-center border rounded-lg">
                        <PlusIcon
                          className="h-8.5 cursor-pointer"
                          onClick={() =>
                            (
                              document.getElementById(
                                "pan-file-input"
                              ) as HTMLInputElement
                            )?.click()
                          }
                        />
                      </div>
                    )}
                    <Input
                      id="pan-file-input"
                      type="file"
                      className="hidden"
                      {...form.register("panFile")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPanFileName(file.name);
                          handleFileChange("panFile", e.target.files);
                        }
                      }}
                    />
                  </div>
                </div>
                {panFileName && (
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-green-600">{panFileName}</p>
                    <button type="button" onClick={handlePanFileDelete}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                )}
              </div>

              {/* TAN */}
              <div>
                <div className="grid grid-cols-12 gap-2 items-end -mt-2 md:mt-1">
                  <div className="col-span-10">
                    <Field>
                      <FieldLabel>TAN No</FieldLabel>
                      <Input
                        type="text"
                        className="-mt-2"
                        {...form.register("tan")}
                      />
                    </Field>
                  </div>
                  <div className="col-span-2">
                    {!tanFileName && (
                      <div className="flex justify-center border rounded-lg">
                        <PlusIcon
                          className="h-8.5 cursor-pointer"
                          onClick={() =>
                            (
                              document.getElementById(
                                "tan-file-input"
                              ) as HTMLInputElement
                            )?.click()
                          }
                        />
                      </div>
                    )}
                    <Input
                      id="tan-file-input"
                      type="file"
                      className="hidden"
                      {...form.register("tanFile")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setTanFileName(file.name);
                          handleFileChange("tanFile", e.target.files);
                        }
                      }}
                    />
                  </div>
                </div>
                {tanFileName && (
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-green-600">{tanFileName}</p>
                    <button type="button" onClick={handleTanFileDelete}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ------------------ PAN LINK ------------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field className="-mt-8">
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
                      <RadioGroupItem value={v} /> <span>{v}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>

              {/* ------------------ Msme register yes no ------------------ */}
              <Field className="mt-2 md:-mt-8">
                <FieldLabel className="">MSME Registered</FieldLabel>
                <RadioGroup
                  value={form.watch("msmeregister")}
                  onValueChange={(v) =>
                    form.setValue(
                      "msmeregister",
                      v as z.infer<typeof yesNoEnum>
                    )
                  }
                  className="flex gap-6 border rounded-lg p-4 -mt-2"
                >
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2">
                      <RadioGroupItem value={v} /> <span>{v}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>
            </div>
            {/* ------------------ GST / MSME ------------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-8">
              {/* GST SECTION (ONLY when NOT Individual) */}
              {constitution && (
                <div
                  className={`${
                    msmeregister === "Yes" ? "md:col-span-1" : "md:col-span-2"
                  }`}
                >
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-10">
                      <Field>
                        <FieldLabel>GST Registration No</FieldLabel>
                        <div>
                          <Input
                            className="-mt-2"
                            {...form.register("gstregno")}
                          />
                        </div>
                      </Field>
                    </div>

                    <div className="col-span-2 ">
                      {!gstFileName && (
                        <div className="flex justify-center border rounded-lg  ">
                          <PlusIcon
                            className="h-8.5 cursor-pointer"
                            onClick={() =>
                              (
                                document.getElementById(
                                  "gst-file-input"
                                ) as HTMLInputElement
                              )?.click()
                            }
                          />
                        </div>
                      )}
                      <Input
                        id="gst-file-input"
                        type="file"
                        className="hidden"
                        {...form.register("gstFile")}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setGstFileName(file.name);
                            handleFileChange("gstFile", e.target.files);
                          }
                        }}
                      />
                    </div>
                  </div>

                  {gstFileName && (
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-green-600">{gstFileName}</p>
                      <button type="button" onClick={handleGstFileDelete}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MSME SECTION */}
              {msmeregister === "Yes" && (
                <div
                  className={`${
                    constitution ? "md:col-span-2" : "md:col-span-1"
                  }`}
                >
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-10">
                      <Field>
                        <FieldLabel>MSME Registration No</FieldLabel>
                        <Input
                          className="-mt-2"
                          {...form.register("msmeregno")}
                        />
                        <FieldError>
                          {form.formState.errors.msmeregno?.message}
                        </FieldError>
                      </Field>
                    </div>

                    <div className="col-span-2">
                      {!msmeFileName && (
                        <div className="flex justify-center border rounded-lg">
                          <PlusIcon
                            className="h-8.5 cursor-pointer"
                            onClick={() =>
                              (
                                document.getElementById(
                                  "msme-file-input"
                                ) as HTMLInputElement
                              )?.click()
                            }
                          />
                        </div>
                      )}
                      <Input
                        id="msme-file-input"
                        type="file"
                        className="hidden"
                        {...form.register("msmeFile")}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setMsmeFileName(file.name);
                            handleFileChange("msmeFile", e.target.files);
                          }
                        }}
                      />
                    </div>
                  </div>

                  {msmeFileName && (
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-green-600">{msmeFileName}</p>
                      <button type="button" onClick={handleMsmeFileDelete}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ------------------ ITR SECTION ------------------ */}
            <div className={` ${msmeregister === "Yes" ? "mt-0" : ""}`}>
              <div className="space-y-2">
                <div className="flex justify-between items-center -mt-7 md:-mt-8">
                  <h4 className="text-md font-semibold flex flex-row gap-2 md:gap-1">
                    ITR Filed
                    <span>(FY 2024–25 & 2023–24)</span>
                  </h4>
                </div>

                {plannedITRYears.map((item, index) => (
                  <div
                    key={item.year}
                    className="border rounded-lg p-4 space-y-4 bg-muted/20"
                  >
                    <input
                      type="hidden"
                      {...form.register(`itr.${index}.year`)}
                      value={item.year.replace("–", "-")}
                      className=""
                    />

                    <div className="flex justify-between items-center">
                      <h5 className="font-medium">
                        Financial Year:
                        <span className="text-primary">{item.year}</span>
                      </h5>
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
            </div>
            {/* IMPORTANT NOTE */}
            <p className="text-sm text-destructive/95 font-semibold border-l-4 border-destructive/65 pl-3 py-1 bg-destructive/30 rounded -mt-4">
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
                onClick={() => router.push("/kycvendor/personaldetail")}
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
