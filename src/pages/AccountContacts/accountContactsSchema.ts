import { z } from "zod";
import { nameSchema } from "../../zod-schemas/nameSchema";
import { pageSchema } from "../../zod-schemas/pageSchema";
import { limitSchema } from "../../zod-schemas/limitSchema";

export const accountContactsSchema = z.object({
  token: z.string(),
  name: nameSchema,
  page: pageSchema,
  limit: limitSchema,
});
