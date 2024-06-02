import { Injectable } from '@nestjs/common';

@Injectable()
export class UserModuleService {
  getUserId() {
    return [
      {
        id: "1",
        name:"pablo",
        email: "pablo@gmail.com"
      }
    ];
  }
}
