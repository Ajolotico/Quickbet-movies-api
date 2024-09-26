import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String }) first_name: string;
  @ApiProperty({ type: String }) last_name: string;
  @ApiProperty({ type: String }) email: string;
  @ApiProperty({ type: String }) password: string;
}
