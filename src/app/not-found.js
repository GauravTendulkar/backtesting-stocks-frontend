import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-background px-4">
      <Card className="max-w-md text-center py-10 px-6">
        <CardContent className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-bold text-destructive">404</h1>
          <p className="text-lg text-muted-foreground">
            Oops! The page you’re looking for doesn’t exist.
          </p>
          <Link href="/">
            <Button variant="outline">Go to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
