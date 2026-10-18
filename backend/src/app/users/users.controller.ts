import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { query } from 'winston';
import { GetUsersPaginationDto } from './dto/get-user.dto';
import { IDDto } from '../../common/dto/param.dto';
import { User } from '../../common/decorators/user.decorator';
// @Controller({ path: 'users', version: '1' })
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Query() query: GetUsersPaginationDto) {
    return this.userService.getUsers(query);
  }

  @Get(':id')
  getUser(@Param() { id }: IDDto, @User() user) {
    return this.userService.getUser({ id });
  }

  // /users?name=phat
  // @Get('query')
  // getUser(@Query('name') name: string, @Query('age') age: string) {
  //   console.log('>>>> query: ', name, age);
  // }
  @Post()
  createUser(@Body() userCreate: CreateUserDto) {
    return this.userService.createUser(userCreate);
  }
  @Patch(':id')
  // @Put('id')
  updateUser(@Param() { id }: IDDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({
      data: updateUserDto,
      where: { id },
    });
  }
  @Delete(':id')
  deleteUser(@Param() { id }: IDDto) {
    return this.userService.deleteUser({ id });
  }
}
