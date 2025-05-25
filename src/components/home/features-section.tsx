import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  Shield,
  Bell,
  BarChart3,
  Smartphone,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    title: "Live Market Data",
    description:
      "Fetches real-time cryptocurrency data using the CoinGecko API — no delays, no noise.",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Built-in Watchlist",
    description:
      "Keep track of your favorite coins in a simple, fast, and local-first watchlist interface.",
  },
  {
    icon: <Bell className="h-8 w-8 text-orange-500" />,
    title: "Smart Alerts (Coming Soon)",
    description:
      "Get notified when selected cryptocurrencies hit your custom price thresholds.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
    title: "Minimalist Interface",
    description:
      "Clean, distraction-free design that puts the data front and center — perfect for developers and curious minds.",
  },
  {
    icon: <Smartphone className="h-8 w-8 text-pink-500" />,
    title: "Fully Responsive",
    description:
      "Works beautifully on all screen sizes with mobile-first responsive design via Tailwind CSS.",
  },
  {
    icon: <Globe className="h-8 w-8 text-cyan-500" />,
    title: "Global Coverage",
    description:
      "Track over 10,000 cryptocurrencies from around the world — straight from CoinGecko.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            A Simple Crypto Tracker, Built for Fun
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Coin Trace was created as a personal project to explore crypto data
            and web development. Here’s what it currently offers — and what’s
            coming next.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
