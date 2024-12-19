import { PatientService } from './patient.service';
import { CreatePatientDTO } from './dto/CreatePatientDto';
export declare class PatientController {
    private patientService;
    constructor(patientService: PatientService);
    createPatient(body: CreatePatientDTO): Promise<string>;
    getPatient(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        address: string | null;
        history: string | null;
        healthCardNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getPatientById(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        address: string | null;
        history: string | null;
        healthCardNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePatientAddress(id: string, address: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        address: string | null;
        history: string | null;
        healthCardNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletePatientById(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        address: string | null;
        history: string | null;
        healthCardNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
