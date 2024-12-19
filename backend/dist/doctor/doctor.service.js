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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const patient_service_1 = require("../patient/patient.service");
const library_1 = require("@prisma/client/runtime/library");
let DoctorService = class DoctorService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(patient_service_1.PatientService.name);
    }
    async createDoctor(input) {
        try {
            const newDoctor = await this.prismaService.doctor.create({
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    phoneNumber: input.phoneNumber
                }
            });
            return newDoctor;
        }
        catch (err) {
            this.logger.error(`Failed to create doctor: ${err.message}`);
            throw new Error('Could not create doctor.');
        }
    }
    async getAllDoctors() {
        try {
            const doctors = this.prismaService.doctor.findMany();
            return doctors;
        }
        catch (error) {
            this.logger.error(`Doctors ${error} not found`);
            throw error;
        }
    }
    async getDoctorById(id) {
        try {
            const doctor = await this.prismaService.doctor.findUnique({
                where: { id },
            });
            if (!doctor) {
                throw new common_1.NotFoundException("Doctor not found");
            }
            return doctor;
        }
        catch (error) {
            this.logger.error(`Doctor with ${id} doesn't exist`);
            throw error;
        }
    }
    async deleteDoctorById(id) {
        try {
            const deleteDoctor = await this.prismaService.doctor.delete({
                where: { id }
            });
            return deleteDoctor;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                this.logger.error(`Doctor with ${id} doesn't exist, couldn't delete the doctor`);
                throw new common_1.NotFoundException("Doctor not found");
            }
        }
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map