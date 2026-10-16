import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDTO extends IntersectionType(
  PickType(CreateUserDto, ['id']),
  PartialType(CreateUserDto),
) {}
