import { z } from "zod";
import { REGEX } from "../regex/regex";

export const tellSchema = z
  .string()
  .min(1)
  .max(25)
  .refine((tell) => REGEX.tell.test(tell), {
    message: "No es un tell",
  });
