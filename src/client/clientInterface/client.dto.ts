import { IsString, IsInt, IsEmail, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClientDto {
  constructor(
    nombre: string,
    dni: string,
    edad: number,
    fechaNacimiento: Date,
    direccion: string,
    localidad: string,
    telefono: string,
    email: string,
    obraSocial: string,
    observaciones?: string,
  ) {
    this.nombre = nombre;
    this.dni = dni;
    this.edad = edad;
    this.fechaNacimiento = fechaNacimiento;
    this.direccion = direccion;
    this.localidad = localidad;
    this.telefono = telefono;
    this.email = email;
    this.obraSocial = obraSocial;
    this.observaciones = observaciones;
  }

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsInt()
  @IsNotEmpty()
  edad: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fechaNacimiento: Date;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  localidad: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  obraSocial: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
