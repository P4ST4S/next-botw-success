import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Resend from "next-auth/providers/resend";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM!,
      // Custom email handler for development - logs to console
      async sendVerificationRequest({ identifier: email, url }) {
        // Only allow admin email
        if (email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
          throw new Error("Unauthorized: Only admin can sign in");
        }

        if (process.env.NODE_ENV === "development") {
          console.log("\n🔐 Admin Magic Link");
          console.log("🔗 Click here to login:", url);
          console.log("\n");
          return;
        }

        // In production, use Resend API
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: email,
          subject: "Admin Sign in - Sheikah Succès-Dex",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #00FDFF;">Sheikah Slate Admin Access</h1>
              <p>Click the link below to sign in as admin:</p>
              <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #00FDFF; color: #0a0a0a; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Admin Access
              </a>
              <p style="color: #666; font-size: 14px; margin-top: 20px;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </div>
          `,
        });
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      // Additional check: only allow admin email
      return user.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // Mark session as admin
        session.user.isAdmin = session.user.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
      }
      return session;
    },
  },
});
