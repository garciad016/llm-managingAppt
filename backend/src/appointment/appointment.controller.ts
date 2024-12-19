import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentDTO } from './dto/CreateAppointmentDto';
//import { createAppointmentDTO } from './dto/AppointmentDto';

@Controller('appointment')
@ApiTags('Appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({summary: 'Create an appointment'})
  createAppointment(@Body() body: CreateAppointmentDTO) {
    //const d = ""

    return this.appointmentService.createAppointment(body);
  }
  @Get()
  @ApiOperation({summary: 'Get the list of all appointments'})
  @ApiResponse( {status: 200, description: 'All appointment details retrieved successfully'})
  getAppointment() {
    return this.appointmentService.getAllAppointments();
  }
  @Get('/:id')
  @ApiOperation({summary: 'Get appointment details by id'})
  @ApiResponse( {status: 200, description: 'Appointment details retrieved successfully'})
  getAppointmentById(@Param('id') id: string) {
    return this.appointmentService.getAppointmentById(id)
  }
ç
  @Delete('/:id')
  @ApiOperation({summary: 'Delete appointment details by id'})
  @ApiResponse( {status: 200, description: 'Appointment details deleted successfully'})
  deleteAppointmentById(@Param('id') id: string) {
    return this.appointmentService.deleteAppointment(id)
  }

  @Patch('reschedule/:id')
  @ApiOperation({ summary: 'Reschedule an appointment by ID' })
  @ApiResponse({ status: 200, description: 'Appointment rescheduled successfully' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  rescheduleAppointment(
      @Param('id') id: string,
      @Body('newDateTime') newDateTime: string,
  ) {
    return this.appointmentService.rescheduleAppointment(id, new Date(newDateTime));
  }

}
