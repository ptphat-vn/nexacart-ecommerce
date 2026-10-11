import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDTO } from './createUser.dto';

export class UpdateUserDTO extends IntersectionType(
  PickType(CreateUserDTO, ['id']),
  PartialType(CreateUserDTO),
) {}
