import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('seedDB')
  async seedDatabase() {
    return this.appService.seedDB();
  }
  @Get('patients')
  async getPatients() {
    return this.appService.getPatients();
  }

  // GET endpoint to retrieve all doctors
  @Get('doctors')
  async getDoctors() {
    return this.appService.getDoctors();
  }
}
