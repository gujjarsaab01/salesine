import {  IsEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  readonly title: string;
  
  @IsOptional()
  @IsString()
  readonly description: string;

  @IsEmpty({message: 'You cannot pass user id'})
  readonly user: User
}
