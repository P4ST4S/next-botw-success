import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SuccessTracker } from "@/components/success-tracker";

export async function DashboardContent() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <SuccessTracker userId={session.user.id} />;
}
