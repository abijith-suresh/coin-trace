import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Shield,
  Bell,
  BarChart3,
  Smartphone,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    title: "Real-Time Tracking",
    description: "Monitor cryptocurrency prices and market movements with live data updates every second."
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Secure Portfolio",
    description: "Your portfolio data is encrypted and secured with enterprise-grade security protocols."
  },
  {
    icon: <Bell className="h-8 w-8 text-orange-500" />,
    title: "Smart Alerts",
    description: "Get instant notifications when your favorite coins hit target prices or show significant movements."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
    title: "Advanced Analytics",
    description: "Deep dive into market trends with professional-grade charts and technical indicators."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-pink-500" />,
    title: "Mobile Ready",
    description: "Access your portfolio and market data seamlessly across all your devices."
  },
  {
    icon: <Globe className="h-8 w-8 text-cyan-500" />,
    title: "Global Markets",
    description: "Track over 10,000+ cryptocurrencies from exchanges worldwide in real-time."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From beginners to professional traders, our platform provides the tools and insights you need.
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