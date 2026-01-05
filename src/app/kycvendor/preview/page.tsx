"use client";

import React from "react";
import { PersonalData } from "./data";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

type PreviewProps = {
  data?: typeof PersonalData;
};

export default function Preview({ data = PersonalData }: PreviewProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-muted/30 py-4 px-4">
      <div className="max-w-3xl mx-auto space-y-6 bg-background p-2 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-center mb-6 pt-6">
          KYC Preview
        </h2>

        {/* ---------------- Personal Details ---------------- */}
        <Card className=" border-none  shadow-none -mt-2">
          <CardHeader className="">
            <CardTitle className="text-xl font-medium underline">
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4 -mt-2 border-b-2 pb-8">
            <p className="-mt-2">
              Name: <span className="font-semibold ">{data.name}</span>
            </p>
            <p className="-mt-2">
              Address: <span className="font-semibold">{data.address}</span>
            </p>
            <p className="-mt-2">
              Pincode: <span className="font-semibold">{data.pincode}</span>
            </p>
            <p className="-mt-2">
              District: <span className="font-semibold">{data.district}</span>
            </p>
            <p className="-mt-2">
              State: <span className="font-semibold">{data.state}</span>
            </p>
            <p className="-mt-2">
              City: <span className="font-semibold">{data.city}</span>
            </p>
            <p className="-mt-2">
              DOB / DOI:{" "}
              <span className="font-semibold">
                {data.dobdoi.toDateString()}
              </span>
            </p>
            <p className="-mt-2">
              Status: <span className="font-semibold">{data.status}</span>
            </p>
            <p className="-mt-2">
              Constitution:{" "}
              <span className="font-semibold">{data.constitution}</span>
            </p>
            <p className="-mt-2">
              Proprietor / Director:{" "}
              <span className="font-semibold">{data.proprietorname}</span>
            </p>
            <p className="-mt-2">
              Designation:{" "}
              <span className="font-semibold">{data.designation}</span>
            </p>
            <p className="-mt-2">
              Mobile: <span className="font-semibold">{data.mobileno}</span>
            </p>
            <p className="-mt-2">
              Email: <span className="font-semibold">{data.email}</span>
            </p>
          </CardContent>
        </Card>

        {/* ---------------- Government Documents ---------------- */}
        <Card className="border-none shadow-none -mt-8">
          <CardHeader className="">
            <CardTitle className="text-xl font-medium underline">
              Govt Compliances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 -mt-2  border-b-2 pb-8">
            {/* ---------------- ITR DETAILS ---------------- */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase">
                Income Tax Returns
              </h4>

              {data.itr.length > 0 ? (
                data.itr.map((item) => (
                  <div
                    key={item.year}
                    className="rounded-lg border bg-muted/20 p-4 space-y-3"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">
                          Financial Year
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                          {item.year}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            ITR Acknowledgement No
                          </p>
                          <p className="font-medium break-all">
                            {item.ackNo || "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">
                            Date of Filing
                          </p>
                          <p className="font-medium ">
                            {new Date(item.date).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No ITR details provided
                </p>
              )}
            </div>

            <p>
              PAN:{" "}
              <span className="font-semibold">
                {data.pan.map((f: any) => f.name).join(", ")}
              </span>
            </p>
            <p>
              TAN:{" "}
              <span className="font-semibold">
                {data.tan.map((f: any) => f.name).join(", ")}
              </span>
            </p>
            <p>
              GST Reg No: <span className="font-semibold">{data.gstregno}</span>
            </p>
            <p>
              GST Certificate:{" "}
              <span className="font-semibold">
                {data.gstcertificate.map((f: any) => f.name).join(", ")}
              </span>
            </p>
            <p>
              MSME Reg No:{" "}
              <span className="font-semibold">{data.msmeregno}</span>
            </p>
            <p>
              MSME Certificate:{" "}
              <span className="font-semibold">
                {data.msmecertificate.map((f: any) => f.name).join(", ")}
              </span>
            </p>
            <p>
              PAN Linked with Aadhaar:{" "}
              <span className="font-semibold">{data.panLinkedWithAadhaar}</span>
            </p>
          </CardContent>
        </Card>

        {/* ---------------- Bank Details ---------------- */}
        <Card className="border-none shadow-none -mt-8">
          <CardHeader className="">
            <CardTitle className="text-xl font-medium underline">
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4 -mt-2">
            <p className="-mt-2">
              Bank Name: <span className="font-semibold">{data.bankname}</span>
            </p>
            <p className="-mt-2">
              Cancelled Cheque:{" "}
              <span className="font-semibold">
                {data.cancelcheque.map((f: any) => f.name).join(", ")}
              </span>
            </p>
            <p className="-mt-2">
              Branch: <span className="font-semibold">{data.branch}</span>
            </p>
            <p className="-mt-2">
              IFSC Code: <span className="font-semibold">{data.ifsccode}</span>
            </p>
            <p className="-mt-2">
              Account Type:{" "}
              <span className="font-semibold">{data.accounttype}</span>
            </p>
            <p className="-mt-2">
              MICR Code: <span className="font-semibold">{data.digit}</span>
            </p>
            <p className="-mt-2">
              Account Number:{" "}
              <span className="font-semibold">{data.accountno}</span>
            </p>
          </CardContent>
        </Card>
        <div className="flex justify-center gap-6 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-34"
            onClick={() => router.push("/kycvendor/bank-details")}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-34">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
