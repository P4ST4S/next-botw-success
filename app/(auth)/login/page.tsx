import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sheikah-dark p-4">
      <div className="w-full max-w-md p-8 bg-sheikah-card border border-sheikah-blue/30 rounded-lg shadow-glow">
        <h1 className="text-3xl font-bold text-sheikah-blue mb-6 text-center">
          Sheikah Slate Access
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
