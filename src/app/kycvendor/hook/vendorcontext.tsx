"use client";

import React, { createContext, useContext, useState } from "react";
import { VendorDetailForm } from "../vendor-detail/schema";
import { GovtCompliancesForm } from "../govt/schema";
import { BankDetailsFormType } from "../bank-details/scheme";

/* ---------------- Types ---------------- */

type VendorFormContextType = {
  vendor?: VendorDetailForm;
  govtForm?: GovtCompliancesForm;
  bankDetails?: BankDetailsFormType;

  setVendor: (data: VendorDetailForm) => void;
  setGovtForm: (data: GovtCompliancesForm) => void;
  setBankDetails: (data: BankDetailsFormType) => void;
};

/* ---------------- Context ---------------- */

const VendorFormContext = createContext<VendorFormContextType | null>(null);

/* ---------------- Provider ---------------- */

export const VendorFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vendor, setVendor] = useState<VendorDetailForm>();
  const [govtForm, setGovtForm] = useState<GovtCompliancesForm>();
  const [bankDetails, setBankDetails] = useState<BankDetailsFormType>();

  return (
    <VendorFormContext.Provider
      value={{
        vendor,
        govtForm,
        bankDetails,
        setVendor,
        setGovtForm,
        setBankDetails,
      }}
    >
      {children}
    </VendorFormContext.Provider>
  );
};

/* ---------------- Hook ---------------- */

export const useVendorForm = () => {
  const context = useContext(VendorFormContext);
  if (!context) {
    throw new Error("useVendorForm must be used inside VendorFormProvider");
  }
  return context;
};
