"use client";
import React, { useState } from "react";
import VendorDetails from "./vendor-detail/vendordetail";
import GovtForm from "./govt/govtform";
import BankDetails from "./bank-details/bankdetail";
import Preview from "./preview/preview";
import { useVendorForm } from "./hook/vendorcontext";

const PageWrapper = () => {
  const [step, setStep] = useState(false);
  const { vendor, govtForm, bankDetails } = useVendorForm();
  console.log(vendor, govtForm, bankDetails);
  return (
    <div>
      <VendorDetails />
      <GovtForm />
      <BankDetails />
      <Preview />
    </div>
  );
};

export default PageWrapper;
