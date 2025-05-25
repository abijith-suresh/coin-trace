import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground">Last Updated: May 25, 2025</p>
      <p className="mb-4">
        Welcome to <strong>Coin Trace</strong>. By accessing or using this site, you agree to the following terms:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. General</h2>
      <p className="mb-4">
        Coin Trace is a personal project created for educational and demonstration purposes. It is not a commercial service or investment platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. No Financial Advice</h2>
      <p className="mb-4">
        Information presented on Coin Trace is for informational use only and should not be considered financial or investment advice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sources</h2>
      <p className="mb-4">
        All cryptocurrency data is fetched from the <a href="https://www.coingecko.com/" className="text-blue-500 hover:underline">CoinGecko API</a>. Coin Trace does not guarantee the accuracy, completeness, or timeliness of this data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        You use this site at your own risk. The developer of Coin Trace is not liable for any losses, damages, or errors resulting from your use of the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes</h2>
      <p className="mb-4">
        These terms may be updated occasionally to reflect new features or policies. Changes will be reflected on this page.
      </p>

      <Separator className="my-6" />

      <p className="text-muted-foreground">
        If you have any questions, reach out via the <a href="/contact" className="text-blue-500 hover:underline">Contact</a> page.
      </p>
    </section>
  );
}
