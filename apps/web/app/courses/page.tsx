import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Course Catalog</h1>
      <p className="text-gray-600 mb-8">
        Browse our course offerings. Choose from public courses available to all users 
        or private courses for enrolled students.
      </p>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        <Link 
          href="/courses/public"
          className="group block bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200 hover:border-blue-300 transition-all hover:shadow-lg"
        >
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-blue-800 ml-4 group-hover:text-blue-900">
              Public Courses
            </h2>
          </div>
          <p className="text-blue-700 mb-4">
            Open courses available to all users. These are displayed using server-side rendering 
            for optimal performance and SEO.
          </p>
          <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800">
            View Public Courses
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link 
          href="/courses/private"
          className="group block bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border border-purple-200 hover:border-purple-300 transition-all hover:shadow-lg"
        >
          <div className="flex items-center mb-4">
            <div className="bg-purple-500 text-white p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-purple-800 ml-4 group-hover:text-purple-900">
              Private Courses
            </h2>
          </div>
          <p className="text-purple-700 mb-4">
            Restricted courses for enrolled students. These use client-side rendering 
            with interactive loading states and real-time data fetching.
          </p>
          <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-800">
            View Private Courses
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Technical Implementation</h3>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-700">
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Public Courses</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Server-side rendering (SSR)</li>
                <li>Better SEO and initial load performance</li>
                <li>Data fetched at build/request time</li>
                <li>Static content delivery</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 mb-1">Private Courses</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Client-side rendering (CSR)</li>
                <li>Interactive loading states</li>
                <li>Dynamic data fetching with useEffect</li>
                <li>Error handling and retry functionality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}