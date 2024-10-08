import { z } from "zod";
import { nameSchema } from "../../../zod-schemas/nameSchema";
import { tellSchema } from "../../../zod-schemas/tellSchema";

export const addContactSchema = z
  .object({
    img: z
      .instanceof(FileList)
      .optional() // Hace que sea opcional
      .refine(
        (files) =>
          !files || files.length === 0 || files[0]?.size <= 5 * 1024 * 1024,
        {
          message: "El archivo debe tener menos de 5MB",
        }
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ["image/jpeg", "image/png"].includes(files[0]?.type),
        {
          message: "Solo se permiten archivos JPEG o PNG",
        }
      ),
    name: nameSchema,
    tell: tellSchema,
  })
  .strict();
