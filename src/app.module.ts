import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { Job } from './auth/entities/job.entity';
import { WorkerModule } from './worker/worker.module';
import { BlobModule } from './blob/blob.module';
import { Blob } from './auth/entities/blob.entity';


@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type:'mongodb',
      url:'mongodb://127.0.0.1:27017/ptc',
      entities:[User,Job,Blob],
      synchronize:true
    }),
    TypeOrmModule.forFeature([User,Job,Blob]),
    WorkerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
