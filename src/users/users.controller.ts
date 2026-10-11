import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') userID: string) {
    return this.userService.getUser(userID);
  }

  // /users?name=phat
  // @Get('query')
  // getUser(@Query('name') name: string, @Query('age') age: string) {
  //   console.log('>>>> query: ', name, age);
  // }
  @Post()
  createUser(@Body() userCreate: CreateUserDTO) {
    return this.userService.createUser(userCreate);
  }
  @Patch(':id')
  // @Put('id')
  updateUser(
    @Param('id') userID: string,
    @Body() userDataUpdate: Omit<UpdateUserDTO, 'id'>,
  ) {
    return this.userService.updateUser(userID, userDataUpdate);
  }
  @Delete(':id')
  deleteUser(@Param('id') userID: string) {
    return this.userService.deleteUser(userID);
  }
}
