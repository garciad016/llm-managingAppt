import { PrismaService } from '../prisma.service';
import { CreateAppointmentDTO } from './dto/CreateAppointmentDto';
import { Appointment } from '@prisma/client';
export declare class AppointmentService {
    private prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    rescheduleAppointment(id: string, newDateTime: Date): Promise<Appointment>;
    createAppointment(input: CreateAppointmentDTO): Promise<void>;
    getAllAppointments(): Promise<({
        patient: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string | null;
            address: string | null;
            history: string | null;
            healthCardNumber: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        doctor: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dateTime: Date;
        reason: string | null;
        notes: string | null;
        appointmentStatus: string;
        doctorId: string;
        patientId: string;
    })[]>;
    getAppointmentById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dateTime: Date;
        reason: string | null;
        notes: string | null;
        appointmentStatus: string;
        doctorId: string;
        patientId: string;
    }>;
    deleteAppointment(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dateTime: Date;
        reason: string | null;
        notes: string | null;
        appointmentStatus: string;
        doctorId: string;
        patientId: string;
    } | {
        message: string;
    }>;
}
