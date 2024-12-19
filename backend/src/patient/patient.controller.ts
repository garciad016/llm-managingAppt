import { All, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDTO } from './dto/CreatePatientDto';
import { Patient, Prisma, PrismaPromise } from '@prisma/client';
import { DefaultArgs, GetFindResult } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';
import { updateFileWithText } from 'ts-loader/dist/servicesHost';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';

@Controller('patient')
@ApiTags('Patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiBody( {description: 'Enter the patient details in the body', type: CreatePatientDTO, required: true})
  @ApiResponse( {status: 201, description: 'Patient created successfully'})
  @HttpCode(201)
  createPatient(@Body() body: CreatePatientDTO) {
    return this.patientService.createPatient(body);
  }

  @Get()
  @ApiOperation({summary: 'Get the list of all patients'})
  @ApiResponse( {status: 200, description: 'All patients retrieved successfully'})
  getPatient() {
    return this.patientService.getAllPatients();
}
  @Get('/:id')
  @ApiOperation({summary: 'Get the patient details by id'})
  @ApiResponse( {status: 200, description: 'Patient detail is retrieved successfully'})
  getPatientById(@Param('id') id: string) {
    return this.patientService.getPatientById(id)
  }
  @Patch('/:id/address')
  @ApiOperation({summary: 'Update the patient address by id'})
  @ApiResponse( {status: 200, description: 'Patient address is updated successfully'})
  updatePatientAddress(
    @Param('id') id: string,
    @Body('address') address: string
  ) {
    return this.patientService.updatePatientAddress(id, address)
  }

  @Delete('/:id')
  @ApiOperation({summary: 'Delete the patient details by id'})
  @ApiResponse( {status: 200, description: 'Patient detail is deleted successfully'})
  deletePatientById(@Param('id') id: string) {
      return this.patientService.deletePatientById(id)
  }
}
