import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/create-user.dto';
type User = {
  id: number;
  name: string;
  age: number;
};
@Injectable() //khi khai báo thằng này thì sẽ tự động khởi tạo DI
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'phat', age: 22 },
    { id: 2, name: 'phat', age: 22 },
  ];
  private findUser(userID: number) {
    const userFound = this.users.find((user) => user.id === userID);
    if (!userFound) throw new BadRequestException('User not found');
    return userFound;
  }
  //   get User
  getUsers() {
    return this.users;
  }
  // get detail User
  getUser(userID: number) {
    const userFound = this.findUser(userID);
    return userFound;
  }
  createUser(userDataCreate: CreateUserDto) {
    this.users.push(userDataCreate);
    return userDataCreate;
  }
  updateUser(userID: number, userDataUpdate: Omit<UpdateUserDTO, 'id'>) {
    const userUpdate = this.findUser(userID);
    const userUpdated = { ...userUpdate, ...userDataUpdate, id: userUpdate.id };
    this.users = this.users.map((user) =>
      user.id === userUpdated.id ? userUpdated : user,
    );
    return userUpdated;
  }
  deleteUser(userID: number) {
    const userDelete = this.findUser(userID);

    const userDeleted = this.users.filter((user) => user.id !== userDelete.id);
    this.users = userDeleted;
    return userDelete;
  }
}
