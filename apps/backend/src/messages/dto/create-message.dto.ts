import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content?: string = 'Hello World';
}
