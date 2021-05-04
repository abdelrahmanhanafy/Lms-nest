import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseRepository)
    private CourseRepository: CourseRepository,
  ) {}

  async getAllCourses(): Promise<Course[]> {
    return await this.CourseRepository.find();
  }

  async getCourseById(id: number): Promise<Course> {
    const courseFound = await this.CourseRepository.findOne(id);

    if (!courseFound) {
      throw new NotFoundException();
    }

    return courseFound;
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.CourseRepository.createCourse(createCourseDto);
  }

  async deleteCourse(id: number): Promise<void> {
    const courseDeleted = await this.CourseRepository.delete(id);
    if (courseDeleted.affected === 0) throw new NotFoundException();
  }
}
