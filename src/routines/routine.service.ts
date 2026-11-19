import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExerciseDto } from './dto/exercise.dto';

@Injectable()
export class RoutineService {

    constructor(private prisma: PrismaService) {}

    async getByDay(userId: string, day: string) {
        const normalizedDay = day.toLowerCase();

        return this.prisma.routine.findUnique({
            where: {
                userId_dayOfWeek: {
                    userId,
                    dayOfWeek: normalizedDay,
                },
            },
            include: {
                exercises: {
                    orderBy: {createdAt: 'asc'},
                },
            },
        });
    }

    async addExercise(userId: string, day: string, exerciseDto: ExerciseDto) {
        const normalizedDay = day.toLowerCase();

        let routine = await this.prisma.routine.findUnique({
            where: {
                userId_dayOfWeek: {
                    userId,
                    dayOfWeek: normalizedDay,
                },
            },
        });

        if(!routine) {
            routine = await this.prisma.routine.create({
                data: {
                    userId,
                    dayOfWeek: normalizedDay,
                    title: `${normalizedDay.charAt(0).toUpperCase() + normalizedDay.slice(1)} Routine`,
                },
            });
        }

        return this.prisma.exercise.create({
            data: {
                routineId: routine.id,
                name: exerciseDto.name,
                sets: exerciseDto.sets,
                reps: exerciseDto.reps,
                weight: exerciseDto.weight ?? null,
            },
        });
    }

    async updateExercise(userId: string, exerciseId: string, exerciseDto: ExerciseDto) {
        const exercise = await this.prisma.exercise.findFirst({
            where: {
                id: exerciseId,
                routine: {userId},
            },
        });

        if(!exercise) {
            throw new NotFoundException('Exercise not found');
        }

        return this.prisma.exercise.update({
            where: {id: exerciseId},
            data: {
                name: exerciseDto.name,
                sets: exerciseDto.sets,
                reps: exerciseDto.reps,
                weight: exerciseDto.weight ?? null,
            },
        });
    }

    async deleteExercise(userId: string, exerciseId: string) {
        const exercise = await this.prisma.exercise.findFirst({
            where: {
                id: exerciseId,
                routine: {userId},
            },
        });

        if(!exercise) {
            throw new NotFoundException('Exercise not found');
        }

        return this.prisma.exercise.delete({
            where: {id: exerciseId},
        });
    }
}