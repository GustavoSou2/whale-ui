import { Injectable } from '@nestjs/common';
import { CreateExecutionReportDto } from './dto/create-execution-report.dto';
import { UpdateExecutionReportDto } from './dto/update-execution-report.dto';

@Injectable()
export class ExecutionReportsService {
  create(createExecutionReportDto: CreateExecutionReportDto) {
    return 'This action adds a new executionReport';
  }

  findAll() {
    return `This action returns all executionReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} executionReport`;
  }

  update(id: number, updateExecutionReportDto: UpdateExecutionReportDto) {
    return `This action updates a #${id} executionReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} executionReport`;
  }
}
