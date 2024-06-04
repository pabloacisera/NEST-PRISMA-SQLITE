import { IsNotEmpty, IsString } from 'class-validator'

export class loginUserDto{
  constructor(
    email:string,
    password:string,
  ){
    this.email=email;
    this.password=password;
  }

  @IsNotEmpty()
  @IsString()
  email:string;

  @IsNotEmpty()
  @IsString()
  password:string;
}