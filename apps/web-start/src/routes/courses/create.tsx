import { createFileRoute } from '@tanstack/react-router';
import { backendFetcher, mutateBackend } from '../../integrations/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseCreateIn, CourseOut } from '@repo/api';
import { useState } from 'react';

export const Route = createFileRoute('/courses/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newOwnerId, setNewOwnerId] = useState(
    '7db121b9-90e4-458f-9baa-c14a41ad4e03',
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newCourse: CourseCreateIn) => {
      return mutateBackend<CourseCreateIn, CourseOut>(
        '/courses',
        'POST',
        newCourse,
      );
    },
    onSuccess: (data: CourseOut) => {
      queryClient.setQueryData(['courses', data.id], data);
    },
  });

  return (
    <div>
      <header>
        <h1>Create a New Course</h1>
      </header>
      {mutation.isPending ? (
        <div>Creating course...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>Error creating course: {mutation.error.message}</div>
          ) : null}
          {mutation.isSuccess ? (
            <div>Course created successfully! ID: {mutation.data.id}</div>
          ) : null}
          <hr></hr>
          <div>
            <input
              type="text"
              placeholder="Course Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Course Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Owner ID"
              value={newOwnerId}
              onChange={(e) => setNewOwnerId(e.target.value)}
            />
          </div>
          <div></div>
          <div>
            <button
              onClick={() => {
                mutation.mutate({
                  name: newName,
                  description: newDescription,
                  ownerId: newOwnerId,
                });
              }}
            >
              Create Course
            </button>
          </div>
          <hr></hr>
          <div>
            <a href="/courses">Back to Courses</a>
          </div>
        </>
      )}
    </div>
  );
}
