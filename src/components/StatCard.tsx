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
    <Card className="relative overflow-hidden h-full">
      <CardContent className="p-3 sm:p-4 lg:p-6 h-full flex flex-col">
        <div className="flex items-start justify-between flex-1">
          <div className="min-w-0 flex-1 mr-2 sm:mr-3">
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mt-2 leading-tight">{value}</p>
            <p className={cn(
              "text-sm mt-2 font-medium truncate leading-tight",
              changeType === "positive" ? "text-success" : "text-destructive"
            )}>
              {change}
            </p>
          </div>
          <div className={cn(
            "p-1.5 sm:p-2 lg:p-3 rounded-lg flex-shrink-0 flex items-center justify-center",
            changeType === "positive" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}