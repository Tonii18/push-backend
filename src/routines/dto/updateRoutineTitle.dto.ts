import { IsString, MinLength } from "class-validator";

export class UpdateRoutineTitleDto {

    @IsString({message: 'Title must be a string of characters'})
    @MinLength(1)
    title: string;
}