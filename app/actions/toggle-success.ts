"use server";

import { auth } from "@/auth";
import { toggleSuccess } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

// Fixed admin user ID (same as in success-tracker)
const ADMIN_USER_ID = "admin";

export async function toggleSuccessAction(successId: string) {
  const session = await auth();

  // Check if user is admin
  const isAdmin = session?.user?.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin only" };
  }

  try {
    const result = await toggleSuccess(ADMIN_USER_ID, successId);

    // Revalidate the dashboard to update the UI
    revalidatePath("/dashboard");

    return { success: true, action: result.action };
  } catch (error) {
    console.error("Failed to toggle success:", error);
    return { success: false, error: "Failed to update success" };
  }
}
