import { Body, Controller, Res,Post ,Req, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Response } from 'express';
import { LoginDto } from './dto/logindto';
import { SignupDto } from './dto/signupdto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @ApiTags('signup')
    @Post('signup')
    async signup(@Body() signupDto:SignupDto){
        const user = await this.authService.signup(signupDto);
        return user;
    }

    @ApiTags('login')
    @Post('login')
    async login(@Body() loginDto:LoginDto,@Res() res:Response){
        console.log('here 1')
        const user = await this.authService.validateUser(loginDto);
        if(!user){
            throw new UnauthorizedException();
        }

        const token = await this.authService.login(user);
        res.cookie('jwt',token.access_token,{httpOnly:true});
        res.send(user);
    }    

    

}

