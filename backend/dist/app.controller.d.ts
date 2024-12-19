import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    seedDatabase(): Promise<string>;
    getPatients(): Promise<any>;
    getDoctors(): Promise<any>;
}
