import { Course } from '@repo/api/courses/entities/course.entity';

async function getPublicCourses(): Promise<Course[]> {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:3000';
    const response = await fetch(`${API_URL}/courses/public`, {
      cache: 'no-store', // This ensures we always get fresh data for this demo
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch public courses');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching public courses:', error);
    // Return mock data as fallback during build or when API is not available
    return [
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
    ];
  }
}

export default async function PublicCoursesPage() {
  const courses = await getPublicCourses();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Public Courses</h1>
      <p className="text-gray-600 mb-4">
        These courses are displayed using a server component and are available to all users.
      </p>
      
      {courses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No public courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-800">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-3">{course.description}</p>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                <p><span className="font-medium">Credits:</span> {course.credits}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className="ml-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Public
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">ℹ️ Technical Note</h3>
        <p className="text-blue-700 text-sm">
          This page is rendered as a <strong>server component</strong>. The data is fetched 
          on the server during the initial page load, providing better SEO and faster initial rendering.
        </p>
      </div>
    </div>
  );
}