import {
  getSuccessesWithProgress,
  getProgressStats,
  getSuccesses,
} from "@/lib/successes/data";
import { ProgressGauge } from "./ui/progress-gauge";
import { SuccessList } from "./success-list";

interface Props {
  userId: string;
}

export async function SuccessTracker({ userId }: Props) {
  const [successesWithProgress, stats, staticData] = await Promise.all([
    getSuccessesWithProgress(userId),
    getProgressStats(userId),
    getSuccesses(),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-sheikah-blue mb-4">
          Sheikah Succès-Dex
        </h1>
        <ProgressGauge
          completed={stats.completed}
          total={stats.total}
          percentage={stats.percentage}
        />
      </header>

      <SuccessList
        successes={successesWithProgress}
        categories={staticData.categories}
      />
    </div>
  );
}
