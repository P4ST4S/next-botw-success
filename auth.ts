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
        if (process.env.NODE_ENV === "development") {
          console.log("\n🔐 Magic Link for:", email);
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
          subject: "Sign in to Sheikah Succès-Dex",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #00FDFF;">Sheikah Slate Access</h1>
              <p>Click the link below to sign in:</p>
              <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #00FDFF; color: #0a0a0a; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Access Slate
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
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
