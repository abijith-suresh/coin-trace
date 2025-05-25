import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Take Control?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of successful crypto traders who trust Coin Trace with their investments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
            <Link href="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            asChild
          >
            <Link href="/demo">
              Schedule Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}