import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesService],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all courses', () => {
    const courses = service.findAll();
    expect(courses.length).toBeGreaterThan(0);
  });

  it('should return only public courses', () => {
    const publicCourses = service.findAllPublic();
    expect(publicCourses.every(course => course.isPublic)).toBe(true);
  });

  it('should return only private courses', () => {
    const privateCourses = service.findAllPrivate();
    expect(privateCourses.every(course => !course.isPublic)).toBe(true);
  });

  it('should find a course by id', () => {
    const course = service.findOne(1);
    expect(course).toBeDefined();
    expect(course?.id).toBe(1);
  });
});