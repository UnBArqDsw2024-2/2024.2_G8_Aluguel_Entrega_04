import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(11, 14)
  cpf_cnpj: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  confirmPassword?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  site?: string;

  @IsOptional()
  telephone: Telephone[];
}

export class Telephone {
  number: string;
  userId: string;
}
