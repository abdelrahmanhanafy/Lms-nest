import { EntityRepository, Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { title, description, requirements } = createCourseDto;

    const course = new Course();
    course.title = title;
    course.description = description;
    course.requirements = requirements;
    await course.save();

    return course;
  }
}
