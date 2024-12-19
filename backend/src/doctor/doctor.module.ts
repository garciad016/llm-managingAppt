import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';

@Module({
  providers: [DoctorService, PrismaService],
  controllers: [DoctorController]
})
export class DoctorModule {}
