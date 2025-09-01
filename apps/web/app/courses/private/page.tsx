'use client';

import { useState, useEffect } from 'react';
import { Course } from '@repo/api/courses/entities/course.entity';

export default function PrivateCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivateCourses = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${API_URL}/courses/private`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch private courses');
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching private courses:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Private Courses</h1>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading private courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Private Courses</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error loading courses: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Private Courses</h1>
      <p className="text-gray-600 mb-4">
        These courses are displayed using a client component and require special permissions.
      </p>
      
      {courses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No private courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2 text-purple-800">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-3">{course.description}</p>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                <p><span className="font-medium">Credits:</span> {course.credits}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className="ml-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    Private
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">ℹ️ Technical Note</h3>
        <p className="text-purple-700 text-sm">
          This page is rendered as a <strong>client component</strong>. The data is fetched 
          on the client side using useEffect, providing interactive loading states and error handling.
        </p>
      </div>
    </div>
  );
}