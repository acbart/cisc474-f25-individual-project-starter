import { createFileRoute, Link } from '@tanstack/react-router';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Welcome to my simple Learning Management System.
      <LoginButton />
      <hr></hr>
      <Link to="/courses">Courses</Link> |{' '}
      <Link to="/assignments">Assignments</Link>
    </div>
  );
}
