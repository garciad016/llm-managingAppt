"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const patient_service_1 = require("../patient/patient.service");
let AppointmentService = class AppointmentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(patient_service_1.PatientService.name);
    }
    async rescheduleAppointment(id, newDateTime) {
        return this.prismaService.appointment.update({
            where: { id },
            data: { dateTime: newDateTime, appointmentStatus: 'Rescheduled' },
        });
    }
    async createAppointment(input) {
        const patient = await this.prismaService.patient.findFirst({
            where: { healthCardNumber: input.patientDetails.healthCardNumber },
            select: { id: true }
        });
        if (!patient) {
            throw new common_1.NotFoundException('Patient not found');
        }
        const doctor = await this.prismaService.doctor.findFirst({
            where: {
                firstName: input.appointmentDetails.doctorFirstName,
                lastName: input.appointmentDetails.doctorLastName
            },
            select: { id: true }
        });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor not found');
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
    async getAppointmentById(id) {
        try {
            const appointment = this.prismaService.appointment.findUnique({
                where: { id }
            });
            return appointment;
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async deleteAppointment(id) {
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
        }
        catch (error) {
            console.error(`Error deleting appointment with ID ${id}:`, error);
            throw error;
        }
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map