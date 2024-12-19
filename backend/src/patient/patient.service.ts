import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePatientDTO } from './dto/CreatePatientDto';
import { Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { catchError } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(private prismaService: PrismaService) {
  }

  async createPatient(input: CreatePatientDTO) {
    try {
      await this.prismaService.patient.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phoneNumber: input.phoneNumber,
          address: input.address,
          history: input.history,
          healthCardNumber: input.healthCardNumber,
        },
      });
      return 'This action adds a new patient';
    } catch (err) {
      this.logger.error(err)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: err },
      );
    }
  }

  async getAllPatients() {
    try {
      const patients = await this.prismaService.patient.findMany();
      if (patients.length == 0) {
        throw new NotFoundException("Patients not found in database ");
      }
      return patients
    } catch (error) {
      this.logger.error(error)
      throw error;
    }
  }
  async getPatientById(id: string) {
    try {
      const patient = await this.prismaService.patient.findUnique({
        where: { id },
      });
      if (!patient) {
        throw new NotFoundException("Patient not found");
      }
      return patient;
    } catch (error) {
      this.logger.error("Patient not found")
      throw error;
    }

  }

  async updatePatientAddress(id: string, newAddress: string) {
    try {
      const updatePatientAddress = await this.prismaService.patient.update({
        data: { address: newAddress },
        where: { id },
      });
      if (!updatePatientAddress) {
        throw new NotFoundException("Patient address not found");
      }
      return updatePatientAddress;
    } catch (error) {
      this.logger.error("Error in updating patient address")
      throw error;
    }
  }

  async deletePatientById(id: string) {
    try {
      const deletePatient = await this.prismaService.patient.delete({
      where: { id },
    });
      return deletePatient
  } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        this.logger.error(`Patient with ${id} doesn't exist`)
        throw new NotFoundException("Patient not found");
      }
    }
  }


}
