import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: any): Promise<any> {
    const user = await this.userService.findOne(login.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, id: user.cpf_cnpj };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };

    return token;
  }
}
