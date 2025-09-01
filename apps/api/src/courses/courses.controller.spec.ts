import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return public courses', () => {
    const publicCourses = controller.findAllPublic();
    expect(Array.isArray(publicCourses)).toBe(true);
  });

  it('should return private courses', () => {
    const privateCourses = controller.findAllPrivate();
    expect(Array.isArray(privateCourses)).toBe(true);
  });
});