export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sheikah-dark p-4">
      <div className="w-full max-w-md p-8 bg-sheikah-card border border-sheikah-blue/30 rounded-lg shadow-glow text-center">
        <h1 className="text-3xl font-bold text-sheikah-blue mb-4">
          Check Your Email
        </h1>
        <p className="text-sheikah-blue/70">
          A sign-in link has been sent to your email address.
        </p>
      </div>
    </div>
  );
}
