import { z } from "zod";
import { REGEX } from "../regex/regex";

export const nameSchema = z
  .string()
  .min(1)
  .max(50)
  .refine((name) => !REGEX.mayus.test(name), {
    message: "No capital letters",
  })
  .refine((name) => !REGEX.startWithSpace.test(name), {
    message: "No start with space",
  })
  .refine((name) => !REGEX.endWithSpace.test(name), {
    message: "No end with space",
  })
  .refine((name) => !REGEX.specialCharacters.test(name), {
    message: "No special characters",
  })
  .refine((name) => !REGEX.numbers.test(name), {
    message: "No numbers",
  });
