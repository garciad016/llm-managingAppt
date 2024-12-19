import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDTO {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty({format: 'email'})
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    history: string;

    @ApiProperty()
    healthCardNumber: string;
}