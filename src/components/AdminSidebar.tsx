import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Receipt,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminMenuItems = [
  { title: "Tableau de bord", url: "/", icon: BarChart3 },
  { title: "Utilisateurs", url: "/users", icon: Users },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Gestion des abo", url: "/subscriptions", icon: CreditCard },
];

const preferenceItems = [
  { title: "Documentation", url: "/documentation", icon: BookOpen },
  { title: "Paramètres", url: "/settings", icon: Settings },
  { title: "Centre d'aide", url: "/help", icon: HelpCircle },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-foreground">CRM Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-3 py-4">
        {/* Groupe Administrateur */}
        <div className="mb-4">
          {!collapsed && (
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="w-full flex items-center justify-between p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              <span>Administrateur</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isAdminOpen ? "rotate-180" : ""
                )}
              />
            </button>
          )}
          
          {(isAdminOpen || collapsed) && (
            <div className={cn("space-y-1", !collapsed && "mt-2")}>
              {adminMenuItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.url)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className="mt-8">
          {!collapsed && (
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Préférences
            </div>
          )}
          <div className="space-y-1">
            {preferenceItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.url)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}