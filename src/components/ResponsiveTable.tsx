import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveTableProps {
  children: ReactNode;
  className?: string;
  minWidth?: string;
}

interface ResponsiveTableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface ResponsiveTableCellProps {
  children: ReactNode;
  className?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  mobileLabel?: string;
}

export function ResponsiveTable({ 
  children, 
  className, 
  minWidth = "min-w-[700px]" 
}: ResponsiveTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full", minWidth, className)}>
        {children}
      </table>
    </div>
  );
}

export function ResponsiveTableHeader({ children, className }: ResponsiveTableHeaderProps) {
  return (
    <thead className={className}>
      {children}
    </thead>
  );
}

export function ResponsiveTableCell({ 
  children, 
  className, 
  hideOnMobile = false, 
  hideOnTablet = false,
  mobileLabel 
}: ResponsiveTableCellProps) {
  const baseClasses = "py-3 px-2 sm:py-4 sm:px-4";
  const hideClasses = cn({
    "hidden lg:table-cell": hideOnTablet,
    "hidden md:table-cell": hideOnMobile && !hideOnTablet,
  });
  
  return (
    <td className={cn(baseClasses, hideClasses, className)}>
      {mobileLabel && (
        <div className="flex flex-col space-y-1">
          <span className="text-xs text-muted-foreground font-medium lg:hidden">
            {mobileLabel}
          </span>
          <div>{children}</div>
        </div>
      )}
      {!mobileLabel && children}
    </td>
  );
}

export function ResponsiveTableHeaderCell({ 
  children, 
  className, 
  hideOnMobile = false, 
  hideOnTablet = false 
}: ResponsiveTableCellProps) {
  const baseClasses = "text-left font-medium text-muted-foreground py-3 px-2 sm:px-4";
  const hideClasses = cn({
    "hidden lg:table-cell": hideOnTablet,
    "hidden md:table-cell": hideOnMobile && !hideOnTablet,
  });
  
  return (
    <th className={cn(baseClasses, hideClasses, className)}>
      {children}
    </th>
  );
}