import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { backendFetcher } from '../integrations/fetcher';
import type { CourseOut } from '@repo/api';

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, refetch, error, isFetching } = useQuery({
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<CourseOut>>('/courses'),
    initialData: [],
  });

  if (isFetching) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      Courses:{' '}
      {data.map((course) => (
        <div key={course.id}>{course.name}</div>
      ))}
    </div>
  );
}
