import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Param, Patch, Delete } from '@nestjs/common';
import { ExerciseDto } from './dto/exercise.dto';
import { RoutineService } from './routine.service';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('routines')
export class RoutineController {

    constructor(private readonly routineService: RoutineService) {}

    @Get(':day')
    async getByDay(@Req() req: any, @Param('day') day: string) {
        const userId = req.user?.id ?? req.user?.sub ?? req.user?.userId;

        return this.routineService.getByDay(userId, day);
    }

    @Post(':day/exercises')
    async addExercise(@Req() req: any, @Param('day') day: string, @Body() exerciseDto: ExerciseDto) {
        const userId = req.user?.id ?? req.user?.sub ?? req.user?.userId;

        return this.routineService.addExercise(userId, day, exerciseDto);
    }

    @Patch('exercises/:id')
    async updateExercise(@Req() req: any, @Param('id') exerciseId: string, @Body() exerciseDto: ExerciseDto) {
        const userId = req.user?.id ?? req.user?.sub ?? req.user?.userId;

        return this.routineService.updateExercise(userId, exerciseId, exerciseDto);
    }

    @Delete('exercises/:id')
    async deleteExercise(@Req() req: any, @Param('id') exerciseId: string) {
        const userId = req.user?.id ?? req.user?.sub ?? req.user?.userId;

        return this.routineService.deleteExercise(userId, exerciseId)
    }
}