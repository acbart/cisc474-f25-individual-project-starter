import { Link } from 'links/entities/link.entity';
import { Course } from 'courses/entities/course.entity';

import { CreateLinkDto } from 'links/dto/create-link.dto';
import { UpdateLinkDto } from 'links/dto/update-link.dto';
import { CreateCourseDto } from 'courses/dto/create-course.dto';
import { UpdateCourseDto } from 'courses/dto/update-course.dto';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  entities: {
    Link,
  },
};

export const courses = {
  dto: {
    CreateCourseDto,
    UpdateCourseDto,
  },
  entities: {
    Course,
  },
};
