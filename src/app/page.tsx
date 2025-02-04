import { ArrowRight, Calendar, CheckSquare, Bell, List } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">TaskEase</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-blue-50 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Boost Your Productivity with TaskEase</h1>
            <p className="text-xl text-gray-600 mb-8">Manage tasks, events, and priorities - all within WhatsApp</p>
            <div className="inline-block bg-yellow-400 text-yellow-800 px-4 py-2 rounded-full font-semibold mb-8">
              Coming Soon
            </div>
            <div className="mt-8">
              <a
                href="#features"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<CheckSquare className="h-8 w-8 text-blue-600" />}
                title="Easy Task Management"
                description="Quickly add tasks to your to-do list directly from WhatsApp"
              />
              <FeatureCard
                icon={<Calendar className="h-8 w-8 text-blue-600" />}
                title="Seamless Calendar Integration"
                description="Add events to your calendar without leaving WhatsApp"
              />
              <FeatureCard
                icon={<Bell className="h-8 w-8 text-blue-600" />}
                title="Smart Reminders"
                description="Get timely reminders for your tasks and events"
              />
              <FeatureCard
                icon={<List className="h-8 w-8 text-blue-600" />}
                title="Priority Overview"
                description="Easily view and manage your top priorities"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} TaskEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

