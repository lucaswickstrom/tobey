"use client";

import { CheckRegularWeb } from "@tobey/icons/src/index.web";
import { getSupportedCallingCodes } from "awesome-phonenumber";
import { useState } from "react";
import { Button } from "@/components/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { cn } from "@/helpers/cn";

const options = getSupportedCallingCodes().map(
  (callingCode) => `+${callingCode}`
);
options.sort((a, b) => a.localeCompare(b));

export function SelectPhoneCountryCode({ defaultValue = "+46" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button aria-expanded={open} role="combobox" variant="outline">
          {value}
          {/* <ChevronDownRegularWeb className="ml-2 h-4 w-4 shrink-0 opacity-50 rotate-180" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-28 p-0">
        <Command>
          <CommandInput placeholder="Sök" />
          <CommandEmpty>Not found</CommandEmpty>
          <CommandGroup className="max-h-96 overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                value={option}
              >
                <CheckRegularWeb
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
