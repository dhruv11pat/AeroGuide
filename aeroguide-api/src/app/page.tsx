export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AeroGuide API
        </h1>
        <p className="text-gray-600 mb-8">
          Backend API for AeroGuide Flight School Platform
        </p>
        <div className="space-y-2 text-left max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-4">Available Endpoints:</h2>
          <div className="space-y-1 text-sm">
            <p><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/google</code> - Google OAuth</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">GET /api/auth/me</code> - Current user</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">GET /api/schools</code> - List schools</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">GET /api/schools/:id</code> - School details</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">POST /api/schools</code> - Create school (admin)</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">POST /api/schools/:id/reviews</code> - Submit review</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">POST /api/schools/:id/inquiries</code> - Submit inquiry</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">POST /api/contact</code> - Contact form</p>
            <p><code className="bg-gray-100 px-2 py-1 rounded">GET /api/admin/stats</code> - Dashboard stats (admin)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
