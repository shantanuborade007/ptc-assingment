import { Module } from '@nestjs/common';
import { BlobService } from './blob.service';
import { BlobController } from './blob.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blob } from 'src/auth/entities/blob.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Blob])
  ],
  providers: [BlobService],
  controllers: [BlobController],
  exports:[BlobService]
})
export class BlobModule {}
