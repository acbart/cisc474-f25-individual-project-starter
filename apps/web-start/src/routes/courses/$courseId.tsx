import { Link, createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { backendFetcher } from '../../integrations/fetcher';
import type { CourseOut } from '@repo/api';

const coursesQueryOptions = (courseId: string) =>
  queryOptions({
    queryKey: ['courses', courseId],
    queryFn: backendFetcher<CourseOut>(`/courses/${courseId}`),
  });

export const Route = createFileRoute('/courses/$courseId')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { courseId } }) => {
    return queryClient.ensureQueryData(coursesQueryOptions(courseId));
  },
});

function RouteComponent() {
  const courseId = Route.useParams().courseId;
  const { data: course } = useSuspenseQuery(coursesQueryOptions(courseId));
  return (
    <div>
      <header>
        <h1>{course.name}</h1>
      </header>
      Welcome to the course page for {course.name}!<br></br>
      <Link to="/courses"> Back to Courses</Link>
      <hr></hr>
      <div>Description: {course.description}</div>
      <div>Owner ID: {course.ownerId}</div>
      <div>Course ID: {course.id}</div>
    </div>
  );
}
