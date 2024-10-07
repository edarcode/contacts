import { z } from "zod";

export const imgSchema = z
  .instanceof(File) // Valida que sea una instancia de File
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    // Máximo 5MB
    message: "El archivo no debe superar los 5MB",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    // Solo archivos JPEG y PNG
    message: "Solo se permiten archivos JPEG o PNG",
  });
