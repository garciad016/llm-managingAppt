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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("./appointment.service");
const swagger_1 = require("@nestjs/swagger");
const CreateAppointmentDto_1 = require("./dto/CreateAppointmentDto");
let AppointmentController = class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    createAppointment(body) {
        return this.appointmentService.createAppointment(body);
    }
    getAppointment() {
        return this.appointmentService.getAllAppointments();
    }
    getAppointmentById(id) {
        return this.appointmentService.getAppointmentById(id);
    }
    deleteAppointmentById(id) {
        return this.appointmentService.deleteAppointment(id);
    }
    rescheduleAppointment(id, newDateTime) {
        return this.appointmentService.rescheduleAppointment(id, new Date(newDateTime));
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create an appointment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAppointmentDto_1.CreateAppointmentDTO]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get the list of all appointments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All appointment details retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "getAppointment", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get appointment details by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Appointment details retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "getAppointmentById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete appointment details by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Appointment details deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "deleteAppointmentById", null);
__decorate([
    (0, common_1.Patch)('reschedule/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Reschedule an appointment by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Appointment rescheduled successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Appointment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('newDateTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "rescheduleAppointment", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.Controller)('appointment'),
    (0, swagger_1.ApiTags)('Appointment'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map