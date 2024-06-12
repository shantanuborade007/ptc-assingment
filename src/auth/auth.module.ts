import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:'shantanu',
      signOptions:{
        expiresIn:'1h'
      }
    }),
    PassportModule,
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
