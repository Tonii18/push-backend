import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class ExerciseDto {

    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string of characters'})
    name: string;

    @IsNotEmpty({message: 'Sets is required'})
    @IsNumber({}, {message: 'Sets must be a number'})
    sets: number;

    @IsNotEmpty({message: 'Reps is required'})
    @IsNumber({}, {message: 'Reps must be a number'})
    reps: number;
    
    @IsNotEmpty({message: 'Weight is required'})
    @IsNumber({}, {message: 'Weight must be a number'})
    @IsOptional()
    weight?: number
}