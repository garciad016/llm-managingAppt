import { PrismaService } from './prisma.service';
export declare class AppService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getHello(): string;
    seedDB(): Promise<string>;
    getPatients(): Promise<any>;
    getDoctors(): Promise<any>;
}
