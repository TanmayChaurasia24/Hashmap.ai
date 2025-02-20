import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="mb-12 bg-muted p-8 rounded-lg">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated with Remote Opportunities</h2>
        <p className="mb-6">Subscribe to our newsletter and receive the latest remote jobs and projects directly in your inbox.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <Input type="email" placeholder="Enter your email" className="max-w-xs w-full" />
          <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

