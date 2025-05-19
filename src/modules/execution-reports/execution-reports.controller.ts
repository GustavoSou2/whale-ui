import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExecutionReportsService } from './execution-reports.service';
import { CreateExecutionReportDto } from './dto/create-execution-report.dto';
import { UpdateExecutionReportDto } from './dto/update-execution-report.dto';

@Controller('execution-reports')
export class ExecutionReportsController {
  constructor(private readonly executionReportsService: ExecutionReportsService) {}

  @Post()
  create(@Body() createExecutionReportDto: CreateExecutionReportDto) {
    return this.executionReportsService.create(createExecutionReportDto);
  }

  @Get()
  findAll() {
    return this.executionReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.executionReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExecutionReportDto: UpdateExecutionReportDto) {
    return this.executionReportsService.update(+id, updateExecutionReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.executionReportsService.remove(+id);
  }
}
