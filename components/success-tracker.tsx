import { auth } from "@/auth";
import {
  getSuccessesWithProgress,
  getProgressStats,
  getSuccesses,
} from "@/lib/successes/data";
import { ProgressGauge } from "./ui/progress-gauge";
import { SuccessList } from "./success-list";
import { DashboardHeader } from "./dashboard-header";

// Fixed admin user ID for tracking progress
const ADMIN_USER_ID = "admin";

export async function SuccessTracker() {
  const session = await auth();
  const isAdmin = session?.user?.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

  const [successesWithProgress, stats, staticData] = await Promise.all([
    getSuccessesWithProgress(ADMIN_USER_ID),
    getProgressStats(ADMIN_USER_ID),
    getSuccesses(),
  ]);

  return (
    <div className="min-h-screen">
      <DashboardHeader isAdmin={isAdmin} userEmail={session?.user?.email} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-sheikah-blue mb-4">
            Sheikah Succes-Dex
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
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
}
