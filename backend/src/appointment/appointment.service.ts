import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAppointmentDTO } from './dto/CreateAppointmentDto';
import { PatientService } from '../patient/patient.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(PatientService.name);

  constructor(private prismaService: PrismaService) {
  }

  async rescheduleAppointment(id: string, newDateTime: Date): Promise<Appointment> {
    return this.prismaService.appointment.update({
      where: { id },
      data: { dateTime: newDateTime, appointmentStatus: 'Rescheduled' },
    });
  }

  async createAppointment(input: CreateAppointmentDTO) {
    const patient = await this.prismaService.patient.findFirst({
      where: { healthCardNumber: input.patientDetails.healthCardNumber },
      select: { id: true }
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const doctor = await this.prismaService.doctor.findFirst({
      where: {
        firstName: input.appointmentDetails.doctorFirstName,
        lastName: input.appointmentDetails.doctorLastName
      },
      select: { id: true }
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    await this.prismaService.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        appointmentStatus: 'Scheduled',
        dateTime: input.appointmentDetails.dateTime,
        reason: input.appointmentDetails.reason,
        notes: input.appointmentDetails.notes,
      }
    });
  }

  async getAllAppointments() {
    return this.prismaService.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
  }
  
  async getAppointmentById(id: string) {
    try {
      const appointment = this.prismaService.appointment.findUnique({
        where: { id }
      })
      return appointment;
    } catch (error) {
      this.logger.error(error)
      throw error;
    }
  }

  async deleteAppointment(id: string) {
    console.log(`Deleting appointment with ID: ${id}`);
    try {
      const appointment = await this.prismaService.appointment.findUnique({
        where: { id },
      });
  
      if (!appointment) {
        console.log(`Appointment with ID ${id} doesn't exist.`);
        return { message: `Appointment with ID ${id} doesn't exist.` };
      }
  
      const deletedAppointment = await this.prismaService.appointment.delete({
        where: { id },
      });
  
      console.log(`Deleted appointment: ${deletedAppointment}`);
      return deletedAppointment;
    } catch (error) {
      console.error(`Error deleting appointment with ID ${id}:`, error);
      throw error;
    }
  }
  
  
}
