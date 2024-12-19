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
exports.listOfAppointmentStatus = exports.CreateAppointmentDTO = exports.AppointmentDetails = exports.PatientDetails = void 0;
const swagger_1 = require("@nestjs/swagger");
class PatientDetails {
}
exports.PatientDetails = PatientDetails;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Patient's first name" }),
    __metadata("design:type", String)
], PatientDetails.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Patient's first name" }),
    __metadata("design:type", String)
], PatientDetails.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "PatientDetails health card number" }),
    __metadata("design:type", String)
], PatientDetails.prototype, "healthCardNumber", void 0);
class AppointmentDetails {
}
exports.AppointmentDetails = AppointmentDetails;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Doctor's first name" }),
    __metadata("design:type", String)
], AppointmentDetails.prototype, "doctorFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Doctor's last name" }),
    __metadata("design:type", String)
], AppointmentDetails.prototype, "doctorLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date and time of appointment" }),
    __metadata("design:type", String)
], AppointmentDetails.prototype, "dateTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Reason for visit", required: false }),
    __metadata("design:type", String)
], AppointmentDetails.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Additional notes", required: false }),
    __metadata("design:type", String)
], AppointmentDetails.prototype, "notes", void 0);
class CreateAppointmentDTO {
}
exports.CreateAppointmentDTO = CreateAppointmentDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: PatientDetails, description: "Patient details", required: true }),
    __metadata("design:type", PatientDetails)
], CreateAppointmentDTO.prototype, "patientDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AppointmentDetails, description: "Appointment details", required: true }),
    __metadata("design:type", AppointmentDetails)
], CreateAppointmentDTO.prototype, "appointmentDetails", void 0);
var listOfAppointmentStatus;
(function (listOfAppointmentStatus) {
    listOfAppointmentStatus["scheduled"] = "Scheduled";
    listOfAppointmentStatus["Pending"] = "Pending";
    listOfAppointmentStatus["Confirmed"] = "Confirmed";
    listOfAppointmentStatus["Rescheduled"] = "Rescheduled";
    listOfAppointmentStatus["Cancelled"] = "Cancelled";
    listOfAppointmentStatus["Completed"] = "Completed";
    listOfAppointmentStatus["NoShow"] = "No Show";
    listOfAppointmentStatus["InProgress"] = "In Progress";
    listOfAppointmentStatus["FollowUpRequired"] = "Follow-Up Required";
    listOfAppointmentStatus["Missed"] = "Missed";
    listOfAppointmentStatus["Waiting"] = "Waiting";
    listOfAppointmentStatus["OnHold"] = "On Hold";
    listOfAppointmentStatus["Declined"] = "Declined";
    listOfAppointmentStatus["Transferred"] = "Transferred";
    listOfAppointmentStatus["Emergency"] = "Emergency";
})(listOfAppointmentStatus || (exports.listOfAppointmentStatus = listOfAppointmentStatus = {}));
//# sourceMappingURL=CreateAppointmentDto.js.map