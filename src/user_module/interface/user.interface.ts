// user.interface.ts
import { IsString, IsEmail, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
  constructor(name: string, email: string, password: string, area: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.area = area;
  }

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  area: string;
}
