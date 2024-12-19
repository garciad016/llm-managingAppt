"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const patient_module_1 = require("./patient/patient.module");
const doctor_module_1 = require("./doctor/doctor.module");
const appointment_module_1 = require("./appointment/appointment.module");
const prisma_service_1 = require("./prisma.service");
const appointment_controller_1 = require("./appointment/appointment.controller");
const appointment_service_1 = require("./appointment/appointment.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [patient_module_1.PatientModule, doctor_module_1.DoctorModule, appointment_module_1.AppointmentModule],
        controllers: [app_controller_1.AppController, appointment_controller_1.AppointmentController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, appointment_service_1.AppointmentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map