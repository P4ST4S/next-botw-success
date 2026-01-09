export default function LoadingDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="h-12 bg-sheikah-card rounded w-96 mx-auto mb-4 animate-pulse" />
        <div className="h-12 bg-sheikah-card rounded w-full max-w-2xl mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 bg-sheikah-card rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
