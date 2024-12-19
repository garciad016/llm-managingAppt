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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const CreateDoctorDto_1 = require("./dto/CreateDoctorDto");
const doctor_service_1 = require("./doctor.service");
const swagger_1 = require("@nestjs/swagger");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    createDoctor(body) {
        return this.doctorService.createDoctor(body);
    }
    getDoctor() {
        return this.doctorService.getAllDoctors();
    }
    getDoctorById(id) {
        return this.doctorService.getDoctorById(id);
    }
    deleteDoctorById(id) {
        return this.doctorService.deleteDoctorById(id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new doctor' }),
    (0, swagger_1.ApiBody)({ description: 'Enter the doctor details in the body', type: CreateDoctorDto_1.CreateDoctorDTO, required: true }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Doctor created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateDoctorDto_1.CreateDoctorDTO]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "createDoctor", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get the list of all doctors' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All doctors retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getDoctor", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the doctor details by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor detail is retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getDoctorById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete the doctor details by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor detail is deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "deleteDoctorById", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctor'),
    (0, swagger_1.ApiTags)('Doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map