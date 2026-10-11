import { Injectable } from '@nestjs/common';

@Injectable() //khi khai báo thằng này thì sẽ tự động khởi tạo DI
export class AppService {
  getHello(): string {
    return 'Hello World! phatpt';
  }
}
