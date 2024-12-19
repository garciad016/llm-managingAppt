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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const prisma_service_1 = require("./prisma.service");
let AppService = class AppService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getHello() {
        return 'Hello World!';
    }
    async seedDB() {
        try {
            const patientsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../sample_data/patients.json'), 'utf-8'));
            const doctorsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../sample_data/doctors.json'), 'utf-8'));
            for (const patient of patientsData) {
                await this.prismaService.patient.create({
                    data: patient,
                });
            }
            for (const doctor of doctorsData) {
                await this.prismaService.doctor.create({
                    data: doctor,
                });
            }
            return 'Database seeded successfully';
        }
        catch (error) {
            console.error('Error seeding the database:', error);
            throw error;
        }
    }
    async getPatients() {
        const patients = JSON.parse(fs.readFileSync(path.join(__dirname, '../sample_data/patients.json'), 'utf-8'));
        return patients;
    }
    async getDoctors() {
        const doctors = JSON.parse(fs.readFileSync(path.join(__dirname, '../sample_data/doctors.json'), 'utf-8'));
        return doctors;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map