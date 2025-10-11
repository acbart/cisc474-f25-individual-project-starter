import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { backendFetcher } from '../../integrations/fetcher';
import type { CourseOut } from '@repo/api';

const coursesQueryOptions = {
  queryKey: ['courses'],
  queryFn: backendFetcher<Array<CourseOut>>('/courses'),
  initialData: [],
};

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(coursesQueryOptions),
});

function RouteComponent() {
  const { data, refetch, error, isFetching } = useQuery(coursesQueryOptions);

  if (isFetching) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/courses/create">Create a New Course</Link>
          </li>
          <li>
            <Link to="/"> Home</Link>
          </li>
        </ul>
      </nav>
      Courses:
      <article>
        {data.map((course) => (
          <header key={course.id}>
            <Link to="/courses/$courseId" params={{ courseId: course.id }}>
              {course.name}
            </Link>
          </header>
        ))}
      </article>
      <hr></hr>
      <div>
        <button onClick={() => refetch()}>Refetch</button>
      </div>
      <hr></hr>
    </div>
  );
}
