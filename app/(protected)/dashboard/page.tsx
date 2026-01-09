import { Suspense } from "react";
import { SuccessTracker } from "@/components/success-tracker";
import LoadingDashboard from "./loading";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-sheikah-dark">
      <Suspense fallback={<LoadingDashboard />}>
        <SuccessTracker />
      </Suspense>
    </main>
  );
}
