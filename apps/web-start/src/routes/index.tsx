import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Welcome to my simple Learning Management System.
      <Link to="/courses">Courses</Link> |{' '}
      <Link to="/assignments">Assignments</Link>
    </div>
  );
}
