"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const router = useRouter();

  const [personalDetails, setPersonalDetails] = useState<any>(null);
  const [govtDetails, setGovtDetails] = useState<any>(null);
  const [bankDetails, setBankDetails] = useState<any>(null);

  useEffect(() => {
    const personal = localStorage.getItem("personalDetails");
    const govt = localStorage.getItem("govtDetails");
    const bank = localStorage.getItem("bankDetails");

    if (personal) setPersonalDetails(JSON.parse(personal));
    if (govt) setGovtDetails(JSON.parse(govt));
    if (bank) setBankDetails(JSON.parse(bank));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Review Details</h2>

      {/* Personal Details */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Personal Details</h3>
        <pre className="text-sm bg-muted p-3 rounded">
          {JSON.stringify(personalDetails, null, 2)}
        </pre>
      </div>

      {/* Govt Details */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Govt Compliances</h3>
        <pre className="text-sm bg-muted p-3 rounded">
          {JSON.stringify(govtDetails, null, 2)}
        </pre>
      </div>

      {/* Bank Details */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Bank Details</h3>
        <pre className="text-sm bg-muted p-3 rounded">
          {JSON.stringify(bankDetails, null, 2)}
        </pre>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>

        <Button
          onClick={() => {
            console.log({
              personalDetails,
              govtDetails,
              bankDetails,
            });
            alert("All details submitted successfully!");
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
