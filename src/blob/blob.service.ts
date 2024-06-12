import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { Blob } from 'src/auth/entities/blob.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class BlobService {

    constructor(
        @InjectRepository(Blob) private blobRepository:Repository<Blob>
    ){}

    async processImage(file: Express.Multer.File): Promise<{ content: string; md5: string }> {
        if (!file) {
          throw new NotFoundException('No image file uploaded');
        }
    
        const buffer = await fs.promises.readFile(file.path);
    
        const content = buffer.toString('base64');
        const md5 = crypto.createHash('md5').update(buffer).digest('hex');
    
        await fs.promises.unlink(file.path); // Clean up temporary file
    
        return { content, md5 };
    }
    async createBlob(blobData: any): Promise<Blob> {
        console.log("im in create blob")
        const { content, md5 } = blobData;
        // console.log(blobData)
        const blob =  this.blobRepository.create({
            content,
            md5,
            encoding:"base64"
        })
         
        await this.blobRepository.save(blob);
        return blob;
    }
}
