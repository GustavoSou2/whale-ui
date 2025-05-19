import { Module } from '@nestjs/common';
import { ExecutionReportsService } from './execution-reports.service';
import { ExecutionReportsController } from './execution-reports.controller';

@Module({
  controllers: [ExecutionReportsController],
  providers: [ExecutionReportsService],
})
export class ExecutionReportsModule {}
