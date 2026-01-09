import { Suspense } from "react";
import { SuccessTracker } from "@/components/success-tracker";
import LoadingDashboard from "./loading";
import { DashboardContent } from "./dashboard-content";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-sheikah-dark p-6">
      <Suspense fallback={<LoadingDashboard />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
