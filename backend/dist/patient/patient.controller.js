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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("./patient.service");
const CreatePatientDto_1 = require("./dto/CreatePatientDto");
const swagger_1 = require("@nestjs/swagger");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    createPatient(body) {
        return this.patientService.createPatient(body);
    }
    getPatient() {
        return this.patientService.getAllPatients();
    }
    getPatientById(id) {
        return this.patientService.getPatientById(id);
    }
    updatePatientAddress(id, address) {
        return this.patientService.updatePatientAddress(id, address);
    }
    deletePatientById(id) {
        return this.patientService.deletePatientById(id);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new patient' }),
    (0, swagger_1.ApiBody)({ description: 'Enter the patient details in the body', type: CreatePatientDto_1.CreatePatientDTO, required: true }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Patient created successfully' }),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePatientDto_1.CreatePatientDTO]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "createPatient", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get the list of all patients' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All patients retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "getPatient", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the patient details by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient detail is retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "getPatientById", null);
__decorate([
    (0, common_1.Patch)('/:id/address'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the patient address by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient address is updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "updatePatientAddress", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete the patient details by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient detail is deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "deletePatientById", null);
exports.PatientController = PatientController = __decorate([
    (0, common_1.Controller)('patient'),
    (0, swagger_1.ApiTags)('Patient'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map