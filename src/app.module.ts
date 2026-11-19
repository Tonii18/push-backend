import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoutineModule } from './routines/routine.module';

@Module({
  imports: [AuthModule, RoutineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
