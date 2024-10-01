import { z } from "zod";

export const limitSchema = z.coerce.number().min(1);
