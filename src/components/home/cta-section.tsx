import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Explore the World of Crypto Easily
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Coin Trace is a personal project built for learning, curiosity, and
          clean data presentation. Give it a spin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-3 dark:bg-gray-200 dark:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            asChild
          >
            <Link href="/demo">
              View Live Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white dark:text-white dark:border-white dark:hover:bg-gray-200 dark:hover:text-blue-800"
            asChild
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
