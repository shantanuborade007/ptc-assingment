import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/logindto';
import { SignupDto } from './dto/signupdto';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService:JwtService
    ){}

    async signup(signupDto:SignupDto):Promise<User> {
        const { name, email, password, role, tenetId, clientId, audience, appId } = signupDto; 
        const salt = await bcrypt.genSalt(10);
        // console.log(name,email,password)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = this.userRepository.create({
            name,
            email,
            password:hashedPassword,
            role,
            tenetId,
            clientId,
            audience,
            appId,
            jobs:[]
        });

        return this.userRepository.save(newUser);
    }


    async validateUser(loginDto:LoginDto): Promise<User> {
        // const user = await this.userRepository.findOne({ where: { loginDet } });
        const email = loginDto.email;
        const user = await this.userRepository.findOne({where : {email}})
        if (user && await bcrypt.compare(loginDto.password, user.password)) {
            return user;
        }
        throw new UnauthorizedException();
    }

    async login(user:User){
        const payload = {email:user.email,sub:user.id,role:user.role,tenetId:user.tenetId,clientId:user.clientId,};
        return {
            access_token:this.jwtService.sign(payload)
        }
    }

}
