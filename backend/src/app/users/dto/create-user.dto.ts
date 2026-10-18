import { createZodDto } from 'nestjs-zod';
import { UserCreateInputSchema } from '../../../generated/zod';

export class CreateUserDto extends createZodDto(UserCreateInputSchema) {}
