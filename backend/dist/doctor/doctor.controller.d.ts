import { CreateDoctorDTO } from './dto/CreateDoctorDto';
import { DoctorService } from './doctor.service';
export declare class DoctorController {
    private doctorService;
    constructor(doctorService: DoctorService);
    createDoctor(body: CreateDoctorDTO): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getDoctor(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getDoctorById(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteDoctorById(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
