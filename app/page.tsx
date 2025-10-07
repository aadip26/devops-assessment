export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🚀 DevOps Assessment
            </h1>
            <p className="text-xl text-gray-600">
              Containerized Next.js Application
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-blue-900 mb-3">
                🐳 Docker
              </h2>
              <p className="text-gray-700">
                Multi-stage Dockerfile with optimized layers and minimal image size
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-purple-900 mb-3">
                ⚙️ GitHub Actions
              </h2>
              <p className="text-gray-700">
                Automated CI/CD pipeline with GHCR integration
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-900 mb-3">
                ☸️ Kubernetes
              </h2>
              <p className="text-gray-700">
                Deployment manifests with health checks and service configuration
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-orange-900 mb-3">
                📚 Documentation
              </h2>
              <p className="text-gray-700">
                Complete setup and deployment instructions
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              System Information
            </h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Status:</strong> <span className="text-green-600">✓ Running</span></p>
              <p><strong>Environment:</strong> {process.env.NODE_ENV || 'development'}</p>
              <p><strong>Next.js Version:</strong> 15.x</p>
              <p><strong>Build Time:</strong> {new Date().toISOString()}</p>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              Built with ❤️ for DevOps Assessment
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

