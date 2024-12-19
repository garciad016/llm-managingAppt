import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async seedDB() {
    try {
     // console.log(__dirname)

      const patientsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../sample_data/patients.json'), 'utf-8'));
      const doctorsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../sample_data/doctors.json'), 'utf-8'));

      // Insert patient records
      for (const patient of patientsData) {
        await this.prismaService.patient.create({
          data: patient,
        });
      }

      // Insert doctor records
      for (const doctor of doctorsData) {
        await this.prismaService.doctor.create({
          data: doctor,
        });
      }

      return 'Database seeded successfully';
    } catch (error) {
      console.error('Error seeding the database:', error);
      throw error;
    }
  }

  async getPatients() {
    const patients = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../sample_data/patients.json'), 'utf-8')
    );
    return patients;
  }

  async getDoctors() {
    const doctors = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../sample_data/doctors.json'), 'utf-8')
    );
    return doctors;
  }
}
