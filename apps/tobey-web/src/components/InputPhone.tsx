"use client";

import { parsePhoneNumber } from "awesome-phonenumber";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { ReactCountryFlag } from "react-country-flag";
import { cn } from "@/helpers/cn";
import { inputVariants } from "./Input";

const usePhoneInput = () => {
  const [value, setValue] = useState({ phone: "+46", regionCode: "SE" });

  const onInput = (inputValue: string) => {
    const parsedNumber = parsePhoneNumber(inputValue, {
      regionCode: value.regionCode,
    });
    setValue({
      phone: parsedNumber.number?.international || inputValue,
      regionCode: parsedNumber.regionCode || value.regionCode,
    });
  };

  return { ...value, onInput };
};

export function InputPhone({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const { phone, regionCode, onInput } = usePhoneInput();

  return (
    <div
      className={cn(
        inputVariants({ focus: "within" }),
        "flex flex-row items-center gap-2",
        className
      )}
    >
      <ReactCountryFlag countryCode={regionCode} svg />
      <input
        className="focus:outline-none flex-1 bg-transparent"
        onInput={({ currentTarget }) => {
          onInput(currentTarget.value);
        }}
        placeholder="Mobilnummer"
        type="tel"
        value={phone}
        {...props}
      />
    </div>
  );
}
