import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import {Job} from '../auth/entities/job.entity'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { BlobService } from 'src/blob/blob.service';
import { BlobModule } from 'src/blob/blob.module';


@Module({
  imports :[
    TypeOrmModule.forFeature([User,Job]),
    JwtModule.register({
      secret:'shantanu',
      signOptions:{expiresIn:'1h'}
    }),
    BlobModule,
  ],
  providers: [WorkerService,JwtStrategy],
  controllers: [WorkerController]
})
export class WorkerModule {}
