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
var PatientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const common_2 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
let PatientService = PatientService_1 = class PatientService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.logger = new common_2.Logger(PatientService_1.name);
    }
    async createPatient(input) {
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
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: err,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, { cause: err });
        }
    }
    async getAllPatients() {
        try {
            const patients = await this.prismaService.patient.findMany();
            if (patients.length == 0) {
                throw new common_1.NotFoundException("Patients not found in database ");
            }
            return patients;
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async getPatientById(id) {
        try {
            const patient = await this.prismaService.patient.findUnique({
                where: { id },
            });
            if (!patient) {
                throw new common_1.NotFoundException("Patient not found");
            }
            return patient;
        }
        catch (error) {
            this.logger.error("Patient not found");
            throw error;
        }
    }
    async updatePatientAddress(id, newAddress) {
        try {
            const updatePatientAddress = await this.prismaService.patient.update({
                data: { address: newAddress },
                where: { id },
            });
            if (!updatePatientAddress) {
                throw new common_1.NotFoundException("Patient address not found");
            }
            return updatePatientAddress;
        }
        catch (error) {
            this.logger.error("Error in updating patient address");
            throw error;
        }
    }
    async deletePatientById(id) {
        try {
            const deletePatient = await this.prismaService.patient.delete({
                where: { id },
            });
            return deletePatient;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                this.logger.error(`Patient with ${id} doesn't exist`);
                throw new common_1.NotFoundException("Patient not found");
            }
        }
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = PatientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientService);
//# sourceMappingURL=patient.service.js.map