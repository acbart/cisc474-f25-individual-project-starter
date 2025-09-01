import { Injectable } from '@nestjs/common';

import { Course } from '@repo/api/courses/entities/course.entity';
import { CreateCourseDto } from '@repo/api/courses/dto/create-course.dto';
import { UpdateCourseDto } from '@repo/api/courses/dto/update-course.dto';

@Injectable()
export class CoursesService {
  private readonly _courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Computer Science',
      description: 'A comprehensive introduction to computer science fundamentals including programming, data structures, and algorithms.',
      instructor: 'Dr. Alice Johnson',
      credits: 3,
      isPublic: true,
    },
    {
      id: 2,
      title: 'Web Development Basics',
      description: 'Learn HTML, CSS, and JavaScript to build modern web applications.',
      instructor: 'Prof. Bob Smith',
      credits: 4,
      isPublic: true,
    },
    {
      id: 3,
      title: 'Database Systems',
      description: 'Study relational databases, SQL, and database design principles.',
      instructor: 'Dr. Carol Davis',
      credits: 3,
      isPublic: true,
    },
    {
      id: 4,
      title: 'Advanced Machine Learning',
      description: 'Deep dive into neural networks, deep learning, and AI applications.',
      instructor: 'Dr. David Wilson',
      credits: 4,
      isPublic: false,
    },
    {
      id: 5,
      title: 'Senior Capstone Project',
      description: 'Independent research and development project for graduating seniors.',
      instructor: 'Prof. Emma Brown',
      credits: 6,
      isPublic: false,
    },
    {
      id: 6,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn about network security, cryptography, and ethical hacking.',
      instructor: 'Dr. Frank Miller',
      credits: 3,
      isPublic: false,
    },
  ];

  create(createCourseDto: CreateCourseDto) {
    const newId = Math.max(...this._courses.map(c => c.id)) + 1;
    const newCourse: Course = {
      id: newId,
      ...createCourseDto,
    };
    this._courses.push(newCourse);
    return newCourse;
  }

  findAll() {
    return this._courses;
  }

  findAllPublic() {
    return this._courses.filter(course => course.isPublic);
  }

  findAllPrivate() {
    return this._courses.filter(course => !course.isPublic);
  }

  findOne(id: number) {
    return this._courses.find(course => course.id === id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const courseIndex = this._courses.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      this._courses[courseIndex] = { ...this._courses[courseIndex], ...updateCourseDto };
      return this._courses[courseIndex];
    }
    return null;
  }

  remove(id: number) {
    const courseIndex = this._courses.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      return this._courses.splice(courseIndex, 1)[0];
    }
    return null;
  }
}