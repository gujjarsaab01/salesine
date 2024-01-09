import { IsEmpty, IsNotEmpty, IsString } from "class-validator"
import { User } from "src/auth/schema/user.schema"

export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsString()
    readonly description: string

    @IsEmpty({message: 'You cannot pass user id'})
    readonly user: User
}