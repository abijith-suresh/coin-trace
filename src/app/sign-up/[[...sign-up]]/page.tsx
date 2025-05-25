import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Start Your Crypto Journey</h1>
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800',
            card: 'shadow-lg border dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm',
            headerTitle: 'text-xl font-semibold',
            headerSubtitle: 'text-muted-foreground',
            socialButtonsBlockButton: 'border dark:border-gray-800 hover:bg-accent transition-colors',
            socialButtonsBlockButtonText: 'text-foreground font-medium',
            formFieldLabel: 'text-foreground font-medium',
            formFieldInput: 'border dark:border-gray-800 bg-background dark:bg-input/30 focus:ring-blue-500/20 dark:focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-600 transition-colors',
            footerActionText: 'text-muted-foreground',
            footerActionLink: 'text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400',
            dividerLine: 'bg-border dark:bg-gray-800',
            dividerText: 'text-muted-foreground bg-background dark:bg-gray-900/50 px-2',
          },
          layout: {
            socialButtonsPlacement: 'top',
            showOptionalFields: false,
          },
        }}
        redirectUrl="/dashboard"
      />
    </div>
  );
}