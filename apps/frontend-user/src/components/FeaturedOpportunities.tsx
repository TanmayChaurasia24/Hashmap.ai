import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeaturedOpportunities() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Opportunities</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Senior Full Stack Developer</CardTitle>
              <CardDescription>TechInnovate Inc. • Full-time • Remote</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Join our dynamic team and work on cutting-edge projects using the latest technologies.</p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "AWS", "GraphQL"].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

