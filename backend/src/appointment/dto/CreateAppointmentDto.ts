import { Doctor, Patient } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatientDetails {
  @ApiProperty({description: "Patient's first name" })
  firstName: string

  @ApiProperty({description: "Patient's first name"})
  lastName: string

  @ApiProperty({description: "PatientDetails health card number"})
  healthCardNumber: string
}
export class AppointmentDetails {
  @ApiProperty({description: "Doctor's first name"})
  doctorFirstName: string

  @ApiProperty({description: "Doctor's last name"})
  doctorLastName: string

  @ApiProperty({description: "Date and time of appointment"})
  dateTime: string

  @ApiPropertyOptional({description: "Reason for visit", required: false})
  reason?: string

  @ApiPropertyOptional({description: "Additional notes", required: false})
  notes?: string
}
export class CreateAppointmentDTO {
  @ApiProperty({type: PatientDetails, description: "Patient details", required: true })
  patientDetails: PatientDetails

  @ApiProperty({type: AppointmentDetails, description: "Appointment details", required: true })
  appointmentDetails: AppointmentDetails
}

export enum listOfAppointmentStatus {
  scheduled= 'Scheduled',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Rescheduled = 'Rescheduled',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  NoShow = 'No Show',
  InProgress = 'In Progress',
  FollowUpRequired = 'Follow-Up Required',
  Missed = 'Missed',
  Waiting = 'Waiting',
  OnHold = 'On Hold',
  Declined = 'Declined',
  Transferred = 'Transferred',
  Emergency = 'Emergency',
}