import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="h-10 bg-muted animate-pulse rounded" />
          <CardContent className="h-8 mt-4 bg-muted animate-pulse rounded" />
        </Card>
      ))}
    </div>
  );
}
