"use server";

import { auth } from "@/auth";
import { toggleSuccess } from "@/lib/db/queries";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleSuccessAction(successId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    const result = await toggleSuccess(session.user.id, successId);

    // Invalidate user progress cache using revalidateTag
    revalidateTag(`user-progress-${session.user.id}`);

    return { success: true, action: result.action };
  } catch (error) {
    console.error("Failed to toggle success:", error);
    return { success: false, error: "Failed to update success" };
  }
}
