import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobDto } from 'src/auth/dto/jobdto';
import { Job } from 'src/auth/entities/job.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
const {ObjectId} = require('mongodb');

@Injectable()
export class WorkerService {

    constructor(
        @InjectRepository(User) private usersRepository :Repository<User>,
        @InjectRepository(Job) private jobsRepository: Repository<Job>
    ){}

    async createJob(user:User,jobData:JobDto):Promise<Job>{
        // console.log(jobData)
        const {imgURL,status} = jobData
        const job = this.jobsRepository.create({
            imgURL,
            status,
            userID:user.id.toString(),
            tenetId:user.tenetId,
            clientId:user.clientId
        });
    

        await this.jobsRepository.save(job);

        user.jobs.push(job.id.toString());

        await this.usersRepository.save(user);

        return job;
    }

    async findByid(id:string):Promise<Job>{
        const newId = new ObjectId(id)
        return await this.jobsRepository.findOne(newId);
    }

    async findJobStatus(id:string):Promise<any>{
        const newId = new ObjectId(id)
        const job = await this.jobsRepository.findOne(newId);
        return job.status
    }
}
