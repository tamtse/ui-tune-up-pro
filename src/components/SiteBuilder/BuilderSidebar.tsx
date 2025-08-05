import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Settings, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Layout,
  Phone,
  Share2,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BuilderSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarSections = [
  {
    id: 'design',
    label: 'Design',
    icon: Palette,
    description: 'Personnalisez l\'apparence'
  },
  {
    id: 'content',
    label: 'Contenu',
    icon: Type,
    description: 'Textes et informations'
  },
  {
    id: 'media',
    label: 'Médias',
    icon: ImageIcon,
    description: 'Images et galeries'
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: Layout,
    description: 'Gestion des pages'
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: Settings,
    description: 'Configuration générale'
  }
];

export function BuilderSidebar({ activeSection, onSectionChange }: BuilderSidebarProps) {
  return (
    <div className="w-64 border-r bg-muted/30">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Éditeur de site</h2>
          
          <div className="space-y-2">
            {sidebarSections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-3",
                    activeSection === section.id && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => onSectionChange(section.id)}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="text-left">
                      <div className="font-medium">{section.label}</div>
                      <div className="text-xs opacity-70">{section.description}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}