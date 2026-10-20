import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { User, type UserInfo } from '../../common/decorators/user.decorator';
import { IDDto } from '../../common/dto/param.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRolesPaginationDto } from './dto/get-role.dto';
import { GetOptionsParams } from '../../common/query/options.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto, @User() user: UserInfo) {
    return this.rolesService.createRole({ ...createRoleDto, user });
  }

  @Patch(':id')
  updateRole(@Param() { id }: IDDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole({
      data: updateRoleDto,
      where: { id },
    });
  }

  @Get()
  getRoles(@Query() query: GetRolesPaginationDto) {
    return this.rolesService.getRoles(query);
  }
  @Get('options')
  getRoleOption(@Query() query: GetOptionsParams) {
    return this.rolesService.getOptions(query);
  }
  @Get(':id')
  getRole(@Param() { id }: IDDto) {
    return this.rolesService.getRole({ id });
  }
  @Delete(':id')
  deleteRole(@Param() { id }: IDDto) {
    return this.rolesService.deleteUser({ id });
  }
}
