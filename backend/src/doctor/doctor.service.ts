import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDoctorDTO } from './dto/CreateDoctorDto';
import { PatientService } from '../patient/patient.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class DoctorService {
  private readonly logger = new Logger(PatientService.name);

  constructor(private prismaService: PrismaService) {
  }

  async createDoctor(input: CreateDoctorDTO) {
   try {

     const newDoctor = await this.prismaService.doctor.create({
       data: {
         firstName: input.firstName,
         lastName: input.lastName,
         email: input.email,
         phoneNumber: input.phoneNumber
       }
     })
     return newDoctor
   } catch (err) {
     this.logger.error(`Failed to create doctor: ${err.message}`);
     throw new Error('Could not create doctor.');
   }
  }

  async getAllDoctors() {
    try {
      const doctors = this.prismaService.doctor.findMany()
      return doctors;
    } catch (error) {
      this.logger.error(`Doctors ${error} not found`)
      throw error;
    }
  }
  async getDoctorById(id: string) {
    try {
      const doctor = await this.prismaService.doctor.findUnique({
        where: { id },
      });
      if (!doctor) {
        throw new NotFoundException("Doctor not found");
      }
      return doctor;
    } catch (error) {
      this.logger.error(`Doctor with ${id} doesn't exist`)
      throw error;
    }
  }
  async deleteDoctorById(id: string) {
   try {
     const deleteDoctor = await this.prismaService.doctor.delete( {
       where: {id}
     });
     return deleteDoctor;
   } catch (error) {
     if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
       this.logger.error(`Doctor with ${id} doesn't exist, couldn't delete the doctor`)
       throw new NotFoundException("Doctor not found");
     }
   }

  }

}

