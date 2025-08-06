import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface SettingsSectionProps {
  siteData: {
    nom: string;
    sousDomaine: string;
    statut: 'published' | 'draft' | 'offline';
    url: string;
    [key: string]: any;
  };
  onSettingsChange: (field: string, value: any) => void;
}

export function SettingsSection({ siteData, onSettingsChange }: SettingsSectionProps) {

  return (
    <div className="space-y-6">
      {/* Informations générales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Informations du site
          </CardTitle>
          <CardDescription>
            Configuration générale de votre site vitrine
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="site-name">Nom du site</Label>
              <Input
                id="site-name"
                value={siteData.nom}
                onChange={(e) => onSettingsChange('nom', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subdomain">Sous-domaine</Label>
              <div className="flex">
                <Input
                  id="subdomain"
                  value={siteData.sousDomaine}
                  disabled
                  className="bg-muted"
                />
                <span className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r bg-muted text-muted-foreground">
                  .mondomaine.com
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Statut de publication</Label>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant={siteData.statut === 'published' ? 'default' : 'secondary'}>
                {siteData.statut === 'published' ? 'En ligne' : 
                 siteData.statut === 'draft' ? 'Brouillon' : 'Hors ligne'}
              </Badge>
              {siteData.statut === 'published' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(siteData.url, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir le site
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}