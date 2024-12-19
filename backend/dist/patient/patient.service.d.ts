import { PrismaService } from 'src/prisma.service';
import { CreatePatientDTO } from './dto/CreatePatientDto';
export declare class PatientService {
    private prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    createPatient(input: CreatePatientDTO): Promise<string>;
    getAllPatients(): Promise<{
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
    updatePatientAddress(id: string, newAddress: string): Promise<{
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
