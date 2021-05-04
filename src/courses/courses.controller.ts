import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Get()
  getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Get('/:id')
  getCourseById(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.courseService.getCourseById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Delete('/:id')
  deleteCourse(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.courseService.deleteCourse(id);
  }
}
