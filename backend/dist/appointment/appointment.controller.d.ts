import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/CreateAppointmentDto';
export declare class AppointmentController {
    private appointmentService;
    constructor(appointmentService: AppointmentService);
    createAppointment(body: CreateAppointmentDTO): Promise<void>;
    getAppointment(): Promise<({
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
    ç: any;
    deleteAppointmentById(id: string): Promise<{
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
    rescheduleAppointment(id: string, newDateTime: string): Promise<{
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
}
