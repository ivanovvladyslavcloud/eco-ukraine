export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">About EcoMonitor</h1>
      <p className="mb-4 text-gray-700">
        EcoMonitor is a project to track and visualize air quality data
        from different monitoring stations.
      </p>
      <p className="mb-2 text-gray-700">
        The project uses Next.js, TypeScript, and Recharts to build an interactive dashboard.
      </p>
      <p className="text-gray-700">
        Data is currently simulated with mock measurements to demonstrate real-time charts.
      </p>
    </div>
  );
}