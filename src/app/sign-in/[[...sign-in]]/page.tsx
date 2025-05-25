import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm',
            card: 'shadow-lg',
          },
        }}
        redirectUrl="/dashboard"
      />
    </div>
  );
}