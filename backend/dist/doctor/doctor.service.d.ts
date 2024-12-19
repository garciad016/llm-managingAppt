import { PrismaService } from '../prisma.service';
import { CreateDoctorDTO } from './dto/CreateDoctorDto';
export declare class DoctorService {
    private prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    createDoctor(input: CreateDoctorDTO): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllDoctors(): Promise<{
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
