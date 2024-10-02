import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Mín 6 digítos." })
  .max(127, { message: "Max 127 digítos." });
