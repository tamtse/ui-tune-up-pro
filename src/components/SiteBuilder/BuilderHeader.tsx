import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Globe, 
  Power,
  PowerOff,
  ExternalLink,
  Settings
} from "lucide-react";

interface BuilderHeaderProps {
  siteName: string;
  subdomain: string;
  status: 'published' | 'draft' | 'offline';
  isModified: boolean;
  onBack: () => void;
  onPreview: () => void;
  onSave: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  onViewLive?: () => void;
}

export function BuilderHeader({
  siteName,
  subdomain,
  status,
  isModified,
  onBack,
  onPreview,
  onSave,
  onPublish,
  onUnpublish,
  onViewLive
}: BuilderHeaderProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500 hover:bg-green-600">En ligne</Badge>;
      case 'draft':
        return <Badge variant="secondary">Brouillon</Badge>;
      case 'offline':
        return <Badge variant="outline">Hors ligne</Badge>;
    }
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">{siteName}</h1>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-muted-foreground">
                {subdomain}.mondomaine.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
          
          {status === 'published' && onViewLive && (
            <Button variant="outline" size="sm" onClick={onViewLive}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Voir en ligne
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={!isModified}
          >
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
          
          {status === 'published' ? (
            <Button variant="outline" size="sm" onClick={onUnpublish}>
              <PowerOff className="h-4 w-4 mr-2" />
              Mettre hors ligne
            </Button>
          ) : (
            <Button size="sm" onClick={onPublish}>
              <Power className="h-4 w-4 mr-2" />
              Publier
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}