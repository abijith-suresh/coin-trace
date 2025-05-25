export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground">
        Last Updated: May 25, 2025
      </p>
      <p className="text-muted-foreground">
        Coin Trace is a personal, non-commercial project and respects your privacy. Here's what you need to know:
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. No Tracking or Analytics</h2>
      <p className="text-muted-foreground">
        Coin Trace does not use cookies, trackers, or analytics tools. No personally identifiable information is collected.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Authentication</h2>
      <p className="text-muted-foreground">
        Authentication is handled via <a href="https://clerk.dev/" className="text-blue-500 hover:underline">Clerk</a>. All user-related data (if any) is managed securely by Clerk. Coin Trace does not store passwords or user data directly.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. API Usage</h2>
      <p className="text-muted-foreground">
        Market data is retrieved from <a href="https://www.coingecko.com/" className="text-blue-500 hover:underline">CoinGecko</a>. No user data is sent to or stored by CoinGecko during this process.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to This Policy</h2>
      <p className="text-muted-foreground">
        As this is a hobby project, changes to this policy are rare, but any updates will be reflected on this page.
      </p>
      <p className="text-muted-foreground mt-6">
        If you have questions about privacy or data handling, please reach out through the <a href="/contact" className="text-blue-500 hover:underline">Contact</a> page.
      </p>
    </section>
  );
}
