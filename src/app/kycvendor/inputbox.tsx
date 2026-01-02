import { Input } from "@/components/ui/input";
import React, { useState } from "react";

function InputBox({
  className,
  type = "file",
  ...props
}: React.ComponentProps<"input">) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="w-full max-w-xl">
      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center justify-center w-full h-40
                   border-2 border-dashed rounded-lg cursor-pointer
                   hover:border-primary bg-muted/40 hover:bg-muted"
      >
        {fileName ? (
          <p className="text-sm font-medium text-primary">{fileName}</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, PDF up to 10MB
            </p>
          </>
        )}

        <Input
          id="fileUpload"
          type={type}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file ? file.name : null);
            props.onChange?.(e); // keep external handlers working
          }}
          {...props}
        />
      </label>
    </div>
  );
}

export default InputBox;
