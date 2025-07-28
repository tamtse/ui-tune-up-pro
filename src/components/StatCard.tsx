import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
  icon: ReactNode;
  trend?: "up" | "down" | "stable";
}

export function StatCard({ title, value, change, changeType, icon, trend }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
            <p className={cn(
              "text-sm mt-2 font-medium",
              changeType === "positive" ? "text-success" : "text-destructive"
            )}>
              {change}
            </p>
          </div>
          <div className={cn(
            "p-3 rounded-lg",
            changeType === "positive" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}