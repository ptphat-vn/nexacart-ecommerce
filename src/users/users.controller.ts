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
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userID: number) {
    return this.userService.getUser(userID);
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
  updateUser(
    @Param('id', ParseIntPipe) userID: number,
    @Body() userDataUpdate: Omit<UpdateUserDTO, 'id'>,
  ) {
    return this.userService.updateUser(userID, userDataUpdate);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userID: number) {
    return this.userService.deleteUser(userID);
  }
}
