export declare class PatientDetails {
    firstName: string;
    lastName: string;
    healthCardNumber: string;
}
export declare class AppointmentDetails {
    doctorFirstName: string;
    doctorLastName: string;
    dateTime: string;
    reason?: string;
    notes?: string;
}
export declare class CreateAppointmentDTO {
    patientDetails: PatientDetails;
    appointmentDetails: AppointmentDetails;
}
export declare enum listOfAppointmentStatus {
    scheduled = "Scheduled",
    Pending = "Pending",
    Confirmed = "Confirmed",
    Rescheduled = "Rescheduled",
    Cancelled = "Cancelled",
    Completed = "Completed",
    NoShow = "No Show",
    InProgress = "In Progress",
    FollowUpRequired = "Follow-Up Required",
    Missed = "Missed",
    Waiting = "Waiting",
    OnHold = "On Hold",
    Declined = "Declined",
    Transferred = "Transferred",
    Emergency = "Emergency"
}
