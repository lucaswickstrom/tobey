"use client";

import {
  CheckRegularWeb,
  PaperPlaneTopRegularWeb,
} from "@tobey/icons/src/index.web";
import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { parsePhoneNumber } from "awesome-phonenumber";
import { sendAppLink } from "@/actions/sendAppLink";
import { Button } from "./Button";
import { InputPhone } from "./InputPhone";
import { Loading } from "./Loading";

const schema = z.object({
  phone: z
    .string()
    .refine((phone) => parsePhoneNumber(phone).valid, "Invalid phone number"),
});

export function PhoneForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const timeout = setTimeout(() => {
        setIsError(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isError]);

  let icon = <PaperPlaneTopRegularWeb className="w-5 h-5 fill-white" />;
  if (isPending) {
    icon = <Loading className="w-5 h-5" />;
  } else if (isSuccess) {
    icon = <CheckRegularWeb className="w-5 h-5 fill-white" />;
  }

  return (
    <form
      action={(data) => {
        startTransition(async () => {
          try {
            schema.parse(Object.fromEntries(data));
            await sendAppLink(data);
            setIsSuccess(true);
          } catch (error) {
            setIsError(true);
          }
        });
      }}
      className="flex flex-row gap-2"
    >
      <InputPhone
        // eslint-disable-next-line jsx-a11y/no-autofocus -- comment
        autoFocus
        className={isError ? "bg-destructive/20" : ""}
        key={isSuccess ? 1 : 0}
        name="phone"
      />
      <Button disabled={isPending} type="submit" variant="secondary">
        {icon}
      </Button>
    </form>
  );
}
