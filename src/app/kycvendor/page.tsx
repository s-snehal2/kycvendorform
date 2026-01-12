import { VendorFormProvider } from "./hook/vendorcontext";
import PageWrapper from "./page-wrapper";

function page() {
  return (
    <div>
      <VendorFormProvider>
        <PageWrapper />
      </VendorFormProvider>
    </div>
  );
}

export default page;
