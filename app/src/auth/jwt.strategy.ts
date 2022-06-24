import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// 다른곳에서도 주입해서 사용하기 위해
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // secretOrKey - 토큰인지 유효한지 확인
    // jwtFromRequest - 토큰위치
    super({
      secretOrKey: '1234secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 토큰이 유호한지 체크가 되면 validate 메소드에서 payload에 있는 유저이름이
  // 데이터베이스에 있는 유저인지 확인 후 유저 객체를 return
  // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어감
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
