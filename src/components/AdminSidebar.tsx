import { useState, useEffect } from "react";
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
  X,
  UserCheck,
  FileImage,
  FileText,
  Camera,
  Calendar,
  DollarSign,
  Globe,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminMenuItems = [
  { title: "Tableau de bord", url: "/dashboard", icon: BarChart3 },
  { title: "Utilisateurs", url: "/users", icon: Users },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Gestion des abo", url: "/subscriptions", icon: CreditCard },
];

const userMenuItems = [
  { title: "Tableau de bord", url: "/user-dashboard", icon: BarChart3 },
  { title: "Prestations", url: "/prestations", icon: Camera },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Questionnaires", url: "/questionnaires", icon: ClipboardList },
  { title: "Calendrier", url: "/calendar", icon: Calendar },
  { title: "Finances", url: "/finances", icon: DollarSign },
  { title: "Site Web", url: "/site-web", icon: Globe },
];

const clientMenuItems = [
  { title: "Dashboard Client", url: "/client/1?token=CmCdX3FjB1WHZ6kqFowkyuQU", icon: BarChart3 },
];

const preferenceItems = [
  { title: "Documentation API", url: "/documentation", icon: BookOpen },
  { title: "Guide Utilisateur", url: "/user-guide", icon: UserCheck },
  { title: "Guide Client", url: "/client-guide", icon: FileText },
  { title: "Paramètres", url: "/settings", icon: Settings },
  { title: "Centre d'aide", url: "/help", icon: HelpCircle },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

export function AdminSidebar({ isOpen, setIsOpen, isMobile }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const [isUserOpen, setIsUserOpen] = useState(true);
  const [isClientOpen, setIsClientOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, setIsOpen]);

  if (isMobile) {
    return (
      <>
        {/* Mobile overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setIsOpen(false)}
          />
        )}
        
        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-transform duration-300 w-64",
            "lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-foreground">CRM Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu content */}
          <div className="flex-1 px-3 py-4">
            <MobileMenuContent 
              adminMenuItems={adminMenuItems}
              userMenuItems={userMenuItems}
              clientMenuItems={clientMenuItems}
              preferenceItems={preferenceItems}
              isActive={isActive}
              isAdminOpen={isAdminOpen}
              setIsAdminOpen={setIsAdminOpen}
              isUserOpen={isUserOpen}
              setIsUserOpen={setIsUserOpen}
              isClientOpen={isClientOpen}
              setIsClientOpen={setIsClientOpen}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Desktop Header */}
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

      {/* Desktop Menu Content */}
      <div className="flex-1 px-3 py-4">
        <DesktopMenuContent 
          adminMenuItems={adminMenuItems}
          userMenuItems={userMenuItems}
          clientMenuItems={clientMenuItems}
          preferenceItems={preferenceItems}
          isActive={isActive}
          isAdminOpen={isAdminOpen}
          setIsAdminOpen={setIsAdminOpen}
          isUserOpen={isUserOpen}
          setIsUserOpen={setIsUserOpen}
          isClientOpen={isClientOpen}
          setIsClientOpen={setIsClientOpen}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}

// Desktop menu component
function DesktopMenuContent({ 
  adminMenuItems, 
  userMenuItems,
  clientMenuItems,
  preferenceItems, 
  isActive, 
  isAdminOpen, 
  setIsAdminOpen,
  isUserOpen,
  setIsUserOpen,
  isClientOpen,
  setIsClientOpen, 
  collapsed 
}: any) {
  return (
    <>
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
            {adminMenuItems.map((item: any) => (
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

      {/* Groupe Utilisateur */}
      <div className="mb-4">
        {!collapsed && (
          <button
            onClick={() => setIsUserOpen(!isUserOpen)}
            className="w-full flex items-center justify-between p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
          >
            <span>Utilisateur</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isUserOpen ? "rotate-180" : ""
              )}
            />
          </button>
        )}
        
        {(isUserOpen || collapsed) && (
          <div className={cn("space-y-1", !collapsed && "mt-2")}>
            {userMenuItems.map((item: any) => (
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

      {/* Groupe Client */}
      <div className="mb-4">
        {!collapsed && (
          <button
            onClick={() => setIsClientOpen(!isClientOpen)}
            className="w-full flex items-center justify-between p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
          >
            <span>Client</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isClientOpen ? "rotate-180" : ""
              )}
            />
          </button>
        )}
        
        {(isClientOpen || collapsed) && (
          <div className={cn("space-y-1", !collapsed && "mt-2")}>
            {clientMenuItems.map((item: any) => (
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
          {preferenceItems.map((item: any) => (
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
    </>
  );
}

// Mobile menu component
function MobileMenuContent({ 
  adminMenuItems, 
  userMenuItems,
  clientMenuItems,
  preferenceItems, 
  isActive, 
  isAdminOpen, 
  setIsAdminOpen,
  isUserOpen,
  setIsUserOpen,
  isClientOpen,
  setIsClientOpen 
}: any) {
  return (
    <>
      {/* Mobile Administrateur Group */}
      <div className="mb-4">
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
        
        {isAdminOpen && (
          <div className="space-y-1 mt-2">
            {adminMenuItems.map((item: any) => (
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
                <item.icon className="h-4 w-4 mr-3" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Utilisateur Group */}
      <div className="mb-4">
        <button
          onClick={() => setIsUserOpen(!isUserOpen)}
          className="w-full flex items-center justify-between p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
        >
          <span>Utilisateur</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isUserOpen ? "rotate-180" : ""
            )}
          />
        </button>
        
        {isUserOpen && (
          <div className="space-y-1 mt-2">
            {userMenuItems.map((item: any) => (
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
                <item.icon className="h-4 w-4 mr-3" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Client Group */}
      <div className="mb-4">
        <button
          onClick={() => setIsClientOpen(!isClientOpen)}
          className="w-full flex items-center justify-between p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
        >
          <span>Client</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isClientOpen ? "rotate-180" : ""
            )}
          />
        </button>
        
        {isClientOpen && (
          <div className="space-y-1 mt-2">
            {clientMenuItems.map((item: any) => (
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
                <item.icon className="h-4 w-4 mr-3" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Preferences */}
      <div className="mt-8">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
          Préférences
        </div>
        <div className="space-y-1">
          {preferenceItems.map((item: any) => (
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
              <item.icon className="h-4 w-4 mr-3" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}