/**
 * Seed script to create the admin user
 * Run with: npx tsx lib/db/seed.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file BEFORE importing db
config({ path: resolve(process.cwd(), ".env.local") });

// Now import database modules
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

// Create database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

    // Check if admin user with id "admin" already exists
    const existingAdminById = await db
      .select()
      .from(users)
      .where(eq(users.id, "admin"))
      .limit(1);

    if (existingAdminById.length > 0) {
      console.log("✅ Admin user with ID 'admin' already exists");
      return;
    }

    // Check if user with admin email exists
    const existingUserByEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, adminEmail))
      .limit(1);

    if (existingUserByEmail.length > 0) {
      // Update the existing user's ID to "admin"
      await db
        .update(users)
        .set({ id: "admin" })
        .where(eq(users.email, adminEmail));
      
      console.log(`✅ Updated existing user (${adminEmail}) ID to 'admin'`);
    } else {
      // Create new admin user
      await db.insert(users).values({
        id: "admin",
        email: adminEmail,
        name: "Admin",
        emailVerified: new Date(),
      });

      console.log("✅ Admin user created successfully");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("🎉 Database seeded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  });
