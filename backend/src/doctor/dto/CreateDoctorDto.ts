import { Appointment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({format: 'email'})
  email: string;

  @ApiProperty()
  phoneNumber: string;
}
