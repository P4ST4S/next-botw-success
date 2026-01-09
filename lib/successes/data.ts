import { unstable_cache as cache } from "next/cache";
import successesData from "@/data/successes.json";
import { getUserSuccesses } from "@/lib/db/queries";
import type { SuccessWithProgress } from "./types";

// Cache successes.json (static data)
export const getSuccesses = cache(
  async () => successesData,
  ["successes-data"],
  {
    revalidate: false, // Never revalidate (static)
    tags: ["successes"],
  }
);

// Merge static successes with user progress
export async function getSuccessesWithProgress(
  userId: string
): Promise<SuccessWithProgress[]> {
  const [successesData, userProgress] = await Promise.all([
    getSuccesses(),
    getUserSuccesses(userId),
  ]);

  const completedMap = new Map(
    userProgress.map((up) => [up.successId, up.completedAt])
  );

  return successesData.successes.map((success) => ({
    ...success,
    isCompleted: completedMap.has(success.id),
    completedAt: completedMap.get(success.id),
  }));
}

// Calculate progress statistics
export async function getProgressStats(userId: string) {
  const successes = await getSuccessesWithProgress(userId);
  const total = successes.length;
  const completed = successes.filter((s) => s.isCompleted).length;
  const percentage = Math.round((completed / total) * 100);

  return { total, completed, percentage };
}
