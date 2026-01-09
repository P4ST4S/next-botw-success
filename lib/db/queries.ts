import { db } from "./index";
import { userSuccesses } from "./schema";
import { eq, and } from "drizzle-orm";

export async function getUserSuccesses(userId: string) {
  return db
    .select({
      successId: userSuccesses.successId,
      completedAt: userSuccesses.completedAt,
    })
    .from(userSuccesses)
    .where(eq(userSuccesses.userId, userId));
}

export async function toggleSuccess(userId: string, successId: string) {
  const existing = await db
    .select()
    .from(userSuccesses)
    .where(
      and(
        eq(userSuccesses.userId, userId),
        eq(userSuccesses.successId, successId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    // Uncheck: delete the record
    await db
      .delete(userSuccesses)
      .where(
        and(
          eq(userSuccesses.userId, userId),
          eq(userSuccesses.successId, successId)
        )
      );
    return { action: "unchecked" as const };
  } else {
    // Check: insert the record
    await db.insert(userSuccesses).values({
      userId,
      successId,
    });
    return { action: "checked" as const };
  }
}
