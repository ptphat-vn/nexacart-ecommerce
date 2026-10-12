import { z } from 'zod';
import { FormatResponseSchema } from '../../utils/api-utils/dto/api-util.dto';

export const withResponse = <T extends z.ZodTypeAny>(schema: T) =>
  FormatResponseSchema.extend({
    data: schema,
  });
