import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    name: 'email',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    type: String,
    name: 'password',
    description: 'The password of the user',
  })
  password: string;
}
