import { PartialType } from '@nestjs/mapped-types';
import { CreateExecutionReportDto } from './create-execution-report.dto';

export class UpdateExecutionReportDto extends PartialType(CreateExecutionReportDto) {}
