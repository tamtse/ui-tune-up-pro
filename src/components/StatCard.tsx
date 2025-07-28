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
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mt-1 sm:mt-2">{value}</p>
            <p className={cn(
              "text-xs sm:text-sm mt-1 sm:mt-2 font-medium truncate",
              changeType === "positive" ? "text-success" : "text-destructive"
            )}>
              {change}
            </p>
          </div>
          <div className={cn(
            "p-2 sm:p-3 rounded-lg flex-shrink-0",
            changeType === "positive" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}