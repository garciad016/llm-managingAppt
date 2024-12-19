import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateDoctorDTO } from './dto/CreateDoctorDto';
import { DoctorService } from './doctor.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePatientDTO } from '../patient/dto/CreatePatientDto';

@Controller('doctor')
@ApiTags('Doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiBody( {description: 'Enter the doctor details in the body', type: CreateDoctorDTO, required: true})
  @ApiResponse( {status: 201, description: 'Doctor created successfully'})
  createDoctor(@Body() body: CreateDoctorDTO) {
    return this.doctorService.createDoctor(body)
  }
  @Get()
  @ApiOperation({summary: 'Get the list of all doctors'})
  @ApiResponse( {status: 200, description: 'All doctors retrieved successfully'})
  getDoctor() {
    return this.doctorService.getAllDoctors();
  }
  @Get('/:id')
  @ApiOperation({summary: 'Get the doctor details by id'})
  @ApiResponse( {status: 200, description: 'Doctor detail is retrieved successfully'})
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id)
  }

  @Delete('/:id')
  @ApiOperation({summary: 'Delete the doctor details by id'})
  @ApiResponse( {status: 200, description: 'Doctor detail is deleted successfully'})
  deleteDoctorById(@Param('id') id: string) {
    return this.doctorService.deleteDoctorById(id)
  }

}
