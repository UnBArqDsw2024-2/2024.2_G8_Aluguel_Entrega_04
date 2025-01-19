export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  name: string;
  cpf_cnpj: string;
  email: string;
  password: string;
  confirmPassword: string;
  site?: string;
}
